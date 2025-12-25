import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) { 
  try {
    const { firstName, lastName, displayName } = await request.json();
    const cookieStore = await cookies();
    
    const token = cookieStore.get('homedecor_session')?.value; 

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

    const response = await fetch(`${wpUrl}/wp-json/wp/v2/users/me`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        name: displayName,
      }),
    });

    const data = await response.json();


    if (!response.ok) {
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    

    const filteredUser = { id: data.id, first_name: data.first_name, last_name: data.last_name, name: data.name, email: data.email}; 
    
    return NextResponse.json({ success: true, user: filteredUser });
  } catch (error) {
    console.error('Update Profile Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
