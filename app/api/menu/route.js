import { NextResponse } from 'next/server';

const WP_USERNAME = 'iqbal';
const WP_PASSWORD = 'XzCK 4g0H EOLq UsdQ 7PK8 4CmA';

export async function GET() {
  try {
    const auth = Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString('base64');
    
    const res = await fetch('https://homedecorindonesia.com/wp-json/menus/v1/menus/main-menu', {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error('Failed to fetch menu');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu' },
      { status: 500 }
    );
  }
}