import Link from 'next/link';

export default async function BlogPage() {
  // Fetch blog posts from WordPress
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WC_STORE_URL}/wp-json/wp/v2/posts?_embed&per_page=12&orderby=date&order=desc`,
    { next: { revalidate: 3600 } }
  );
  const posts = await res.json();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Our Blog
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Interior design tips, trends, and inspiration for your home
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
            >
              <Link href={`/blogs/${post.slug}`} className="block relative">
                <div className="relative aspect-[16/9] overflow-hidden">
                  {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                    <img
                      src={post._embedded["wp:featuredmedia"][0].source_url}
                      alt={post.title.rendered}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  {/* Category Tags */}
                  {post._embedded?.["wp:term"]?.[0] && (
                    <div className="flex gap-2 mb-3">
                      {post._embedded["wp:term"][0].map((term) => (
                        <span
                          key={term.id}
                          className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary/10 text-primary"
                        >
                          {term.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Date */}
                  <time className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>

                  {/* Title */}
                  <h2
                    className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />

                  {/* Excerpt */}
                  <div
                    className="mt-3 text-gray-500 line-clamp-3 text-sm"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />

                  {/* Read More Link */}
                  <div className="mt-4 flex items-center text-primary font-medium">
                    <span className="text-sm">Read more</span>
                    <svg
                      className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Loading State */}
        {!posts.length && (
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
              <div className="space-y-3 mt-4">
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}