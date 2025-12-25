import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Take data from request body
    // Frontend sends: { email, password }
    const { email, password } = body;
    
    // (Backend Validation)
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Logic Smart Username/Name
    // If firstName is missing, split from email
    let firstName = body.firstName;
    if (!firstName) {
        firstName = email.split('@')[0];
    }
    
    const lastName = body.lastName || '';
    const phone = body.phone || '';

    // Check Server Configuration
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    const ck = process.env.WC_FULL_KEY;
    const cs = process.env.WC_FULL_SECRET;

    if (!wpUrl || !ck || !cs) {
      console.error('❌ Server Misconfiguration: Missing WooCommerce Secrets');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Request to WooCommerce (Create Customer)
    // Dokumentasi: https://woocommerce.github.io/woocommerce-rest-api-docs/#create-a-customer
    const wcResponse = await fetch(`${wpUrl}/wp-json/wc/v3/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${ck}:${cs}`).toString('base64'),
      },
      body: JSON.stringify({
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        billing: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone
        },
        shipping: {
            first_name: firstName,
            last_name: lastName
        }
      }),
    });

    const wcData = await wcResponse.json();

    // Handle Error from WooCommerce
    if (!wcResponse.ok) {
      console.error('WooCommerce Register Error:', wcData);
      
      // Handle email if already exists
      if (wcData.code === 'registration-error-email-exists') {
        return NextResponse.json(
          { error: 'An account is already registered with your email address. Please log in.' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: wcData.message || 'Registration failed. Please try again.' },
        { status: wcResponse.status }
      );
    }

    // AUTO-LOGIN: Get JWT Token immediately after registration (so user doesn't need to login again)
    let token = null;
    try {
        const jwtResponse = await fetch(`${wpUrl}/wp-json/jwt-auth/v1/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              username: email, // Plugin JWT support login pakai email
              password: password 
          }),
        });

        const jwtData = await jwtResponse.json();
        if (jwtResponse.ok) {
            token = jwtData.token;
        }
    } catch (jwtError) {
        console.warn('Auto-login failed, but registration success:', jwtError);
    }

    // Success Response to Frontend
    const response = NextResponse.json({
      success: true,
      message: 'Registration successful',
      user: {
        id: wcData.id,
        email: wcData.email,
        firstName: wcData.first_name,
      },
      token
    });


    // Opsional: Set Cookie HTTPOnly to enhance security
    if (token) {
        response.cookies.set('homedecor_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 1 Week
            path: '/',
        });
    }

    return response;

  } catch (error) {
    console.error('Registration API Critical Error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}