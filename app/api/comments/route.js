import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { postId, content, author, email } = await request.json();


    // Ambil token dari cookie HTTP-only
    const token = request.cookies.get('homedecor_session')?.value;

    const body = token
    ? { post: postId, content }
    : {
        post: postId,
        content,
        author_name: author,
        author_email: email,
        };


    // Forward request ke WordPress REST API
    const wpRes = await fetch(
    `${process.env.NEXT_PUBLIC_WC_STORE_URL}/wp-json/wp/v2/comments`,
    {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(body),
    }
    );


    const data = await wpRes.json();

    if (!wpRes.ok) {
      return NextResponse.json({ error: data.message || 'Failed to submit comment' }, { status: wpRes.status });
    }

    return NextResponse.json({ success: true, comment: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
