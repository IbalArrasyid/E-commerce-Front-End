import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Take input from request body
    const body = await request.json();
    
    // Make API compatible if frontend sends { email: '...' } or { username: '...' }
    const loginInput = body.username || body.email; 
    const password = body.password;

    // Input validation
    if (!loginInput || !password) {
      return NextResponse.json(
        { error: 'Username/Email and password are required' },
        { status: 400 }
      );
    }

    // Setup WordPress URL
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    if (!wpUrl) {
      console.error('❌ NEXT_PUBLIC_WORDPRESS_URL is not defined');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Hit Endpoint JWT Authentication in WordPress
    const wpResponse = await fetch(`${wpUrl}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: loginInput, // PENTING: Plugin WP mengharapkan key 'username', tapi valuenya boleh email
        password: password,
      }),
    });

    const data = await wpResponse.json();

    // Handle Error from WordPress
    if (!wpResponse.ok) {
      // Clean error message from HTML tags if any
      const errorMessage = data.message ? 
        data.message.replace(/(<([^>]+)>)/gi, "") : 
        'Invalid username/email or password';

      return NextResponse.json(
        { error: errorMessage },
        { status: 401 }
      );
    }

    // Login successful, set user data
    const userData = {
      email: data.user_email,
      name: data.user_display_name,
      username: data.user_nicename,
      role: 'customer'
    };

    // Success Response 
    const response = NextResponse.json({
      success: true,
      email: userData.email, 
      token: data.token,
      message: 'Login successful'
    });

    // Set HTTPOnly Cookie
    response.cookies.set('homedecor_session', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 Week
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}