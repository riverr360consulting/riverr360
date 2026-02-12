import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | Riverr360 Digital Marketing',
  description: 'Digital marketing insights, tips, and strategies to stop wasting your marketing budget and maximize ROI.',
};

// Category colors
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

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const regularPosts = allPosts.filter(post => !post.featured);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Marketing Insights Blog
              </h1>
              <p className="text-xl text-gray-600">
                Practical strategies to plug your marketing leaks and maximize ROI. 
                Learn from real-world examples and data-driven insights.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Posts</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-white border-2 border-primary-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {post.coverImage && (
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <img 
                          src={post.coverImage} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category]}`}>
                          {post.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(post.publishedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">By {post.author}</span>
                        <span className="text-primary-600 font-semibold group-hover:translate-x-2 transition-transform">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {featuredPosts.length > 0 ? 'Latest Posts' : 'All Posts'}
            </h2>
            
            {allPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-6">
                  No blog posts yet. Check back soon for marketing insights!
                </p>
                <p className="text-gray-500">
                  To add posts, copy the template from <code className="bg-gray-200 px-2 py-1 rounded">content/blog/TEMPLATE-blog-post.md</code>
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {post.coverImage && (
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <img 
                          src={post.coverImage} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category]}`}>
                          {post.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(post.publishedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="text-primary-600 font-semibold text-sm group-hover:translate-x-2 transition-transform inline-block">
                        Read More →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="bg-primary-600 text-white p-8 rounded-lg text-center">
              <h3 className="text-3xl font-bold mb-4">
                Stop Learning, Start Doing
              </h3>
              <p className="text-xl mb-6 text-primary-100">
                Ready to apply these insights to your business? Let's plug your marketing leaks.
              </p>
              <Link href="/contact" className="btn-secondary">
                Plug Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
