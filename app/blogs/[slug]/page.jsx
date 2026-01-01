import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import ShareButtons from './ShareButtons';
import CommentForm from "@/components/CommentForm";
import { cookies } from 'next/headers';

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const cookieStore = cookies();
  const token = cookieStore.get('homedecor_session')?.value;
  const isLoggedIn = !!token;

  // Fetch the single post
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WC_STORE_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    notFound();
  }

  const posts = await res.json();

  if (!posts || posts.length === 0) {
    notFound();
  }

  const post = posts[0];

  const commentsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WC_STORE_URL}/wp-json/wp/v2/comments?post=${post.id}&per_page=100`,
    {
      cache: 'no-store', 
    }
  );

  const comments = commentsRes.ok ? await commentsRes.json() : [];


  // Extract author and category data
  const author = post._embedded?.author?.[0];
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];

  // Format reading time (rough estimate: 200 words per minute)
  const wordCount = post.content?.rendered?.split(/\s+/).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/blogs"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Back to Blog</span>
          </Link>
        </div>
      </div>

      {/* Featured Image */}
      {featuredImage?.source_url && (
        <div className="relative w-full aspect-[21/9] md:aspect-[16/9] lg:aspect-[21/9]">
          <img
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || post.title.rendered}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4">
        {/* Article Header */}
        <header className="py-8 md:py-12">
          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blogs?category=${cat.slug}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-gray-500">
            {author && (
              <div className="flex items-center gap-2">
                {author.avatar_urls && (
                  <img
                    src={author.avatar_urls['24'] || author.avatar_urls['48']}
                    alt={author.name}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="font-medium text-gray-700">{author.name}</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time>
                {new Date(post.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </header>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Article Body */}
        <div className="py-8 md:py-12">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font prose-headings:font-bold prose-headings:text-gray-900
              prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-code:text-amber-600 prose-code:bg-amber-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
              prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
              prose-li:mb-1
              prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6
              prose-hr:border-gray-200 prose-hr:my-8
            "
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>

        {/* Comments Section */}
        <div className="py-10 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Comments ({comments.length})
          </h3>

          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet. Be the first!</p>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <img
                    src={comment.author_avatar_urls?.['48']}
                    alt={comment.author_name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-900">
                        {comment.author_name}
                      </span>
                      <span className="text-gray-400">
                        {new Date(comment.date).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <div
                      className="prose prose-sm max-w-none mt-1"
                      dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <CommentForm
          postId={post.id}
          isLoggedIn={isLoggedIn}
        />



        {/* Tags */}
        {post._embedded?.['wp:term']?.[1] && post._embedded['wp:term'][1].length > 0 && (
          <div className="py-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {post._embedded['wp:term'][1].map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blogs?tag=${tag.slug}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Share Section - Client Component */}
        <ShareButtons title={post.title.rendered} />

        {/* Author Bio */}
        {author && (
          <div className="py-8 border-t border-gray-200">
            <div className="flex items-start gap-4">
              {author.avatar_urls && (
                <img
                  src={author.avatar_urls['96'] || author.avatar_urls['48']}
                  alt={author.name}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <h3 className="font-semibold text-gray-900">About {author.name}</h3>
                {author.description && (
                  <p
                    className="mt-1 text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: author.description }}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="py-8 border-t border-gray-200">
          <Link
            href="/blogs"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all posts
          </Link>
        </div>
      </div>
    </article>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WC_STORE_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return {
      title: 'Blog Post',
    };
  }

  const posts = await res.json();
  const post = posts?.[0];

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];

  return {
    title: `${post.title.rendered.replace(/<[^>]*>/g, '')} - HomeDecor Blog`,
    description: post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || `Read ${post.title.rendered}`,
    openGraph: {
      title: post.title.rendered.replace(/<[^>]*>/g, ''),
      description: post.excerpt?.rendered?.replace(/<[^>]*>/g, ''),
      images: featuredImage?.source_url ? [featuredImage.source_url] : [],
      type: 'article',
      publishedTime: post.date,
      authors: [post._embedded?.author?.[0]?.name || 'HomeDecor'],
    },
  };
}
