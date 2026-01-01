import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    // 1️⃣ DECODE JWT (TIDAK VERIFY, HANYA BACA)
    const decoded = jwt.decode(token);

    const userId = decoded?.data?.user?.id;
    if (!userId) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    const ck = process.env.WC_FULL_KEY;
    const cs = process.env.WC_FULL_SECRET;

    // 2️⃣ AMBIL CUSTOMER LANGSUNG BY ID
    const wcRes = await fetch(
      `${wpUrl}/wp-json/wc/v3/customers/${userId}`,
      {
        headers: {
          Authorization:
            'Basic ' + Buffer.from(`${ck}:${cs}`).toString('base64'),
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!wcRes.ok) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const customer = await wcRes.json();

    // 3️⃣ FINAL USER OBJECT
    const user = {
      id: customer.id,
      email: customer.email,
      firstName: customer.first_name,
      lastName: customer.last_name,
      username: customer.username || customer.email.split('@')[0],
      displayName:
        `${customer.first_name} ${customer.last_name}`.trim() ||
        customer.email,
      role: 'customer',

      billing: customer.billing || null,
      shipping: customer.shipping || null,
    };

    return NextResponse.json({ success: true, user });

  } catch (err) {
    console.error('JWT-only user details error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal error' },
      { status: 500 }
    );
  }
}
