import { NextResponse } from "next/server";
import { createWooClientRead } from "@/lib/woocommerce";
import { getUserFromRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const woo = createWooClientRead();

    const { data: orders } = await woo.get("orders", {
      customer: user.id,
      per_page: 50,
      orderby: "date",
      order: "desc",
    });

    const ordersWithInvoice = orders.map(order => {
    const invoiceMeta = order.meta_data.find(md => md.key === "doku_invoice");
    const paymentUrlMeta = order.meta_data.find(md => md.key === "doku_payment_url");

    return {
        id: order.id,
        number: order.number,
        total: order.total,
        status: order.status,
        payment_method: order.payment_method_title,
        line_items: order.line_items,
        invoice: invoiceMeta?.value || order.number,
        payment_url: paymentUrlMeta?.value || null, 
        date_created: order.date_created
    };
    });



    return NextResponse.json({ orders: ordersWithInvoice });
  } catch (error) {
    console.error(
      "Fetch user orders error:",
      error.response?.data || error.message || error
    );
    return NextResponse.json(
      { error: "Failed to fetch orders", details: error.message },
      { status: 500 }
    );
  }
}
