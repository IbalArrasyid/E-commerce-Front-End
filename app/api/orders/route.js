export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import { createWooClientWrite } from "@/lib/woocommerce";
import { getProductById } from "@/services/server-helpers";
import { generateDokuPaymentUrl } from "@/lib/doku"; // helper Doku
import { getUserFromRequest } from "@/lib/auth";

export async function POST(request) {
    try {
        // 1️⃣ Ambil user dari JWT
        const user = await getUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ error: "Login required" }, { status: 401 });
        }

        // 2️⃣ Ambil payload dari body
        const body = await request.json();
        const { items, customer } = body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new Error("No items in the order");
        }

        if (!customer || !customer.billing) {
            throw new Error("Customer billing info is required");
        }

        // 3️⃣ VALIDATION & SANITIZATION (Server Authority)
        const line_items = await Promise.all(items.map(async (item) => {
            const product = await getProductById(item.product_id);

            if (!product) throw new Error(`Product ID ${item.product_id} invalid.`);

            if (product.stock_status !== 'instock') {
                throw new Error(`Stok untuk ${product.name} habis.`);
            }

            return {
                product_id: product.id,
                quantity: item.quantity,
            };
        }));

        // 4️⃣ PERSISTENSI ORDER KE WOOCOMMERCE
        const orderPayload = {
            payment_method: "doku",
            payment_method_title: "DOKU Payment Gateway",
            set_paid: false,
            status: "pending",
            customer_id: user.id,
            billing: customer.billing,
            shipping: customer.shipping,
            line_items: line_items,
            meta_data: [
                { key: "checkout_source", value: "nextjs_headless" },
                { key: "created_by_user", value: user.id }
            ]
        };

        const wooClient = createWooClientWrite();
        const { data: orderData } = await wooClient.post("orders", orderPayload);

        if (!orderData || !orderData.id) {
            throw new Error("Gagal membuat order di WooCommerce.");
        }

        // 5️⃣ PAYMENT PROCESSING WITH DOKU
        const paymentResponse = await generateDokuPaymentUrl({
            orderId: orderData.id.toString(),
            amount: parseFloat(orderData.total),
            customerEmail: customer.billing.email,
            customerName: `${customer.billing.first_name} ${customer.billing.last_name}`,
            products: line_items
        });

        await wooClient.put(`orders/${orderData.id}`, {
            meta_data: [
                { key: "doku_invoice", value: paymentResponse.invoice_number },
                { key: "payment_status", value: "waiting_for_payment" },
                { key: "doku_payment_url", value: paymentResponse.payment_url }
        ]
        });


        // 6️⃣ RESPONSE TO CLIENT
        return NextResponse.json({
            success: true,
            order_id: orderData.id,
            redirect_url: paymentResponse.payment_url
        }, { status: 201 });

    } catch (error) {
        console.error("Checkout Logic Error:", error);
        const message = error?.response?.data?.message || error.message || "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
