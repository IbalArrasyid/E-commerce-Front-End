import { NextResponse } from 'next/server';
import { createWooClientRead, createWooClientWrite} from '@/lib/woocommerce';
import { checkDokuPaymentStatus } from '@/lib/doku';

export const runtime = 'nodejs';

/**
 * Fetch order status from WooCommerce API
 * This polls WooCommerce to get the actual payment status
 * after the DOKU plugin has processed the callback
 */
export async function POST(request) {
    try {
        const { orderId } = await request.json();

        if (!orderId) {
            return NextResponse.json(
                { error: 'Order ID is required' },
                { status: 400 }
            );
        }

        console.log(`🔍 Fetching order status from WooCommerce for order #${orderId}`);

        const api = createWooClientRead();
        if (!api) {
            throw new Error('WooCommerce API not configured');
        }

        // Fetch order from WooCommerce
        const response = await api.get(`orders/${orderId}`);
        const order = response.data;

        console.log(`✅ Order #${orderId} status: ${order.status}, payment_method: ${order.payment_method}`);

        // Map WooCommerce order status to payment status
        // WooCommerce statuses: pending, processing, completed, on-hold, cancelled, failed, refunded
        const paymentStatusMap = {
            'pending': 'PENDING',
            'processing': 'SUCCESS',
            'completed': 'SUCCESS',
            'on-hold': 'PENDING',
            'cancelled': 'FAILED',
            'failed': 'FAILED',
            'refunded': 'REFUNDED'
        };

        const paymentStatus = paymentStatusMap[order.status] || 'PENDING';

        if (order.status === 'pending') {
        const invoice = Array.isArray(order.meta_data)
            ? order.meta_data.find(m => m.key === 'doku_invoice')?.value
            : null;

        if (invoice) {
           let dokuStatus = null;
            try {
                dokuStatus = await checkDokuPaymentStatus(invoice);
            } catch (err) {
                console.warn('⚠️ DOKU status check failed:', err.message);
                dokuStatus = 'PENDING'; // fallback supaya tidak crash
            }

            try { 
                await createWooClientWrite().put(`orders/${order.id}`, { status: 'processing' }); 
                console.log('✅ WooCommerce updated'); 
            } catch(e) 
                { console.error('❌ Failed to update WooCommerce', e.response?.data || e.message); }

            if (dokuStatus === 'EXPIRED') {
                await api.put(`orders/${order.id}`, { status: 'cancelled' });
            }

            if (dokuStatus === 'SUCCESS') {
                await api.put(`orders/${order.id}`, { status: 'processing' });
            }

        }
    }


        return NextResponse.json({
            success: true,
            status: paymentStatus,
            order: {
                id: order.id,
                status: order.status,
                paymentMethod: order.payment_method,
                paymentMethodTitle: order.payment_method_title,
                total: order.total,
                currency: order.currency,
                dateCreated: order.date_created,
                transactionId: order.transaction_id,
                meta_data: order.meta_data
            }
        });

    } catch (error) {
        console.error('❌ Error fetching order status:', error);

        // Handle specific WooCommerce errors
        if (error.response?.status === 404) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
