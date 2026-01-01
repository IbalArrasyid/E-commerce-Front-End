'use client';

import { useState } from 'react';

export default function CommentForm({ postId, isLoggedIn }) {
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitComment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const payload = isLoggedIn
        ? { postId, content }
        : { postId, content, author, email };

        const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok) {
        setSuccess(true);
        setContent('');
        if (!isLoggedIn) {
            setAuthor('');
            setEmail('');
        }
        } else {
        alert(data.error);
        }
    } catch (err) {
        console.error('Failed to submit comment', err);
    } finally {
        setLoading(false);
    }
    };

  return (
    <form onSubmit={submitComment} className="mt-10 space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">
            Leave a Comment
        </h4>

        {!isLoggedIn && (
            <>
            <input
                type="text"
                placeholder="Name"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
            />

            <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
            />
            </>
        )}

        {isLoggedIn && (
            <p className="text-sm text-gray-600">
            You are commenting as a logged-in user
            </p>
        )}

        <textarea
            placeholder="Your comment"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 h-28"
        />

        <button
            type="submit"
            disabled={loading}
            className="bg-amber-600 text-white px-5 py-2 rounded hover:bg-amber-700 transition disabled:opacity-60"
        >
            {loading ? 'Sending...' : 'Post Comment'}
        </button>

        {success && (
            <p className="text-green-600 text-sm">
            Comment submitted! Waiting for approval.
            </p>
        )}
        </form>

  );
}
