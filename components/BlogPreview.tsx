import Link from 'next/link';

const posts = [
  {
    category: 'Google Ads',
    categoryColor: 'bg-red-100 text-red-700',
    title: '5 Ways to Cut Your PPC Costs in Half',
    excerpt: 'Most businesses waste 40-60% of their PPC budget on poorly optimised campaigns. Here are 5 proven strategies to cut your costs while improving performance.',
    readTime: '5 min read',
    date: 'Feb 10, 2026',
    slug: 'cut-ppc-costs-in-half',
    icon: '💸',
  },
  {
    category: 'SEO',
    categoryColor: 'bg-green-100 text-green-700',
    title: 'SEO Basics Every Business Owner Should Know',
    excerpt: 'Before spending on ads, make sure your organic foundation is solid. These SEO fundamentals will help you attract consistent, free traffic to your website.',
    readTime: '4 min read',
    date: 'Mar 3, 2026',
    slug: 'seo-basics-every-business-owner-should-know',
    icon: '🔍',
  },
  {
    category: 'Email Marketing',
    categoryColor: 'bg-purple-100 text-purple-700',
    title: 'Email Marketing That Actually Converts',
    excerpt: 'Your email list is one of the highest-ROI assets in your business — if you use it correctly. Learn the sequences and strategies that turn subscribers into customers.',
    readTime: '6 min read',
    date: 'Mar 3, 2026',
    slug: 'email-marketing-that-converts',
    icon: '📧',
  },
];

export default function BlogPreview() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Insights & Resources
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Latest from the Blog</h2>
            <p className="text-gray-600 mt-2">Practical strategies to stop revenue leakage and grow profitably.</p>
          </div>
          <Link href="/blog" className="text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors flex-shrink-0">
            View all articles →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link
              key={i}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              {/* Icon & category */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{post.icon}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${post.categoryColor}`}>
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors leading-snug">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
