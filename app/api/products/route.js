export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import { createWooClientRead } from "@/lib/woocommerce";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const page = searchParams.get("page") || "1";
	const perPage = searchParams.get("per_page") || "12";
	const category = searchParams.get("category");
	const search = searchParams.get("search");

	try {
		const api = createWooClientRead();
		const params = {
			page: String(page),
			per_page: String(perPage),
			status: "publish",
		};
		if (category) params.category = String(category);
		if (search) params.search = String(search);

		
		// Ambil data produk dari WooCommerce
		const { data, headers } = await api.get("products", { params });

		// Filter manual di server-side
		let filtered = data;
		if (search?.trim()) {
		const keyword = search.trim().toLowerCase();
		filtered = data.filter((p) =>
			p.name.toLowerCase().includes(keyword) ||
			p.slug.toLowerCase().includes(keyword) ||
			p.description.toLowerCase().includes(keyword) ||
			p.short_description.toLowerCase().includes(keyword)
		);
		}

		return NextResponse.json({
			products: filtered,
			pagination: {
				page: Number(page),
				perPage: Number(perPage),
				total: Number(headers["x-wp-total"]) || data.length,
				totalPages: Number(headers["x-wp-totalpages"]) || 1,
			},
		});
	} catch (error) {
		return NextResponse.json({ error: error?.response?.data || error.message }, { status: 500 });
	}
}
