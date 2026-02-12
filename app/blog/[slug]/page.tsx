import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs, getPostsByCategory } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';

const categoryColors: { [key: string]: string } = {
  'SEO': 'bg-green-100 text-green-800',
  'PPC': 'bg-blue-100 text-blue-800',
  'Content Marketing': 'bg-purple-100 text-purple-800',
  'Email Marketing': 'bg-pink-100 text-pink-800',
  'Social Media': 'bg-indigo-100 text-indigo-800',
  'Analytics': 'bg-yellow-100 text-yellow-800',
  'Conversion': 'bg-orange-100 text-orange-800',
  'General': 'bg-gray-100 text-gray-800',
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Riverr360 Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, exclude current)
  const relatedPosts = getPostsByCategory(post.category)
    .filter(p => p.slug !== params.slug)
    .slice(0, 3);

  // Calculate reading time (rough estimate)
  const wordsPerMinute = 200;
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <>
      <Header />
      <main>
        {/* Article Header */}
        <article>
          <section className="bg-gradient-to-br from-primary-50 to-white py-16">
            <div className="container-custom max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <ol className="flex items-center gap-2 text-sm text-gray-600">
                  <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
                  <li>/</li>
                  <li><Link href="/blog" className="hover:text-primary-600">Blog</Link></li>
                  <li>/</li>
                  <li className="text-gray-900">{post.title}</li>
                </ol>
              </nav>

              {/* Category & Date */}
              <div className="flex items-center gap-4 mb-6">
                <span className={`text-sm font-semibold px-4 py-2 rounded-full ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
                <span className="text-gray-600">
                  {new Date(post.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 mb-6">
                {post.excerpt}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{post.author}</div>
                  <div className="text-sm text-gray-600">
                    {readingTime} min read
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              {post.coverImage && (
                <div className="rounded-lg overflow-hidden mb-8">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Article Content */}
          <section className="section-padding bg-white">
            <div className="container-custom max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
                    p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-6" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-6 space-y-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-6 space-y-2" {...props} />,
                    li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
                    a: ({node, ...props}) => <a className="text-primary-600 hover:text-primary-700 underline" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary-600 pl-6 italic my-6" {...props} />,
                    code: ({node, ...props}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm" {...props} />,
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Author Bio */}
          <section className="section-padding bg-gray-50">
            <div className="container-custom max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About the Author</h3>
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">{post.author}</h4>
                    <p className="text-gray-600">
                      Digital marketing expert specializing in helping businesses stop wasting their 
                      marketing budget and maximize ROI through data-driven strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="section-padding bg-white">
              <div className="container-custom max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Posts</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="group bg-gray-50 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      {relatedPost.coverImage && (
                        <div className="aspect-video bg-gray-200 overflow-hidden">
                          <img 
                            src={relatedPost.coverImage} 
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[relatedPost.category]}`}>
                          {relatedPost.category}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2 group-hover:text-primary-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="section-padding bg-gray-50">
            <div className="container-custom max-w-4xl mx-auto">
              <div className="bg-primary-600 text-white p-8 rounded-lg text-center">
                <h3 className="text-3xl font-bold mb-4">
                  Ready to Implement These Strategies?
                </h3>
                <p className="text-xl mb-6 text-primary-100">
                  Let's work together to plug your marketing leaks and maximize ROI.
                </p>
                <Link href="/contact" className="btn-secondary">
                  Plug Now
                </Link>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
