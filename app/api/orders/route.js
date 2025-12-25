export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import { createWooClientWrite } from "@/lib/woocommerce";
import { getProductById } from "@/services/server-helpers";
import { generateDokuPaymentUrl } from "@/lib/doku"; // helper Doku

export async function POST(request) {
    try {
        const body = await request.json();
        const { items, customer } = body;

        // VALIDATION AND SANITIZATION (Server Authority) 
        const line_items = await Promise.all(items.map(async (item) => {
            const product = await getProductById(item.product_id);

            if (!product) throw new Error(`Product ID ${item.product_id} invalid.`);

            // Stock check
            if (product.stock_status !== 'instock') {
                throw new Error(`Stok untuk ${product.name} habis.`);
            }

            return {
                product_id: product.product_id, // atau product.id
                quantity: item.quantity,
            };
        }));

        // PERSISTENSI ORDER KE WOOCOMMERCE 
        // set status 'pending'because payment not completed yet
        const orderPayload = {
            payment_method: "doku", 
            payment_method_title: "DOKU Payment Gateway",
            set_paid: false,
            status: "pending",
            billing: customer.billing,
            shipping: customer.shipping,
            line_items: line_items,
            // Save meta data for debugging
            meta_data: [
                { key: "checkout_source", value: "nextjs_headless" }
            ]
        };

        const wooClient = createWooClientWrite();
        const { data: orderData } = await wooClient.post("orders", orderPayload);

        if (!orderData || !orderData.id) {
            throw new Error("Gagal membuat order di WooCommerce.");
        }

        // PAYMENT PROCESSING WITH DOKU
        // Menggunakan data order yang baru dibuat (ID & Total)
        // untuk menjamin integritas nominal yang ditagihkan.

        const paymentResponse = await generateDokuPaymentUrl({
            orderId: orderData.id.toString(),
            amount: parseFloat(orderData.total), // Total final dari Woo (inc. tax/shipping)
            customerEmail: customer.billing.email,
            customerName: `${customer.billing.first_name} ${customer.billing.last_name}`,
            products: line_items 
        });

        // RESPONSE TO CLIENT 
        // Mengembalikan Order ID dan Payment URL agar front-end bisa redirect
        return NextResponse.json({
            success: true,
            order_id: orderData.id,
            invoice_number: paymentResponse.invoice_number,
            payment: {
                paymentUrl: paymentResponse.payment_url, // URL redirect DOKU
                orderId: orderData.id.toString(),
                invoiceNumber: paymentResponse.invoice_number
            }
        }, { status: 201 });

    } catch (error) {
        console.error("Checkout Logic Error:", error);
        const message = error?.response?.data?.message || error.message;
        return NextResponse.json({ error: message }, { status: 500 });
    }
}