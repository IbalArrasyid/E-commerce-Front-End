export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import { createWooClientRead } from "@/lib/woocommerce";

export async function GET(_request, { params }) {
	try {
		const api = createWooClientRead();
		const { data } = await api.get(`products/${params.id}`);
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
