import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

    // 1️⃣ Get WordPress User
    const wpRes = await fetch(`${wpUrl}/wp-json/wp/v2/users/me`, {
      headers: { Authorization: authHeader },
      cache: 'no-store'
    });

    if (!wpRes.ok) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const wpUser = await wpRes.json();

    // 2️⃣ Get WooCommerce Customer
    const ck = process.env.WC_FULL_KEY;
    const cs = process.env.WC_FULL_SECRET;

    const wcRes = await fetch(
      `${wpUrl}/wp-json/wc/v3/customers/${wpUser.id}`,
      {
        headers: {
          Authorization:
            'Basic ' + Buffer.from(`${ck}:${cs}`).toString('base64'),
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      }
    );

    const customer = wcRes.ok ? await wcRes.json() : null;

    // 3️⃣ FINAL USER OBJECT (MERGED)
    const user = {
      id: wpUser.id,
      email: wpUser.email || customer?.email,
      firstName: wpUser.first_name || customer?.first_name || '',
      lastName: wpUser.last_name || customer?.last_name || '',
      username: wpUser.slug,
      displayName:
        wpUser.first_name || wpUser.last_name
          ? `${wpUser.first_name} ${wpUser.last_name}`.trim()
          : wpUser.name,
      role: wpUser.roles?.[0] || 'customer',

      billing: customer?.billing || null,
      shipping: customer?.shipping || null
    };

    return NextResponse.json({ success: true, user });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: 'Internal error' },
      { status: 500 }
    );
  }
}
