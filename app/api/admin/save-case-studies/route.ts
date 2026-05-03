import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authCookie = request.cookies.get('admin_auth');
  if (!authCookie || authCookie.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { studies } = await request.json();
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;

  if (!token || !repo) {
    return NextResponse.json({ error: 'GitHub not configured' }, { status: 500 });
  }

  const filePath = 'app/case-studies/page.tsx';

  const caseStudiesCode = `import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | Riverr360 Digital Marketing',
  description: "See how we've helped businesses stop wasting marketing budget and achieve real ROI.",
};

const caseStudies = ${JSON.stringify(studies.map((s: { slug: string; title: string; industry: string; challenge: string; result: string; excerpt: string; image: string; metrics: { label: string; before: string; after: string }[] }) => ({
    slug: s.slug,
    title: s.title,
    industry: s.industry,
    challenge: s.challenge,
    result: s.result,
    excerpt: s.excerpt,
    image: s.image,
    metrics: s.metrics,
  })), null, 2)};

export default function CaseStudiesPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Case Studies</h1>
            <p className="text-xl text-gray-600">
              Real results from real businesses. See how we have helped companies plug marketing leaks and maximize ROI.
            </p>
          </div>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <Link key={study.slug} href={\`/case-studies/\${study.slug}\`} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary-600 font-semibold mb-2">{study.industry}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{study.title}</h3>
                  <p className="text-gray-600 mb-4">{study.excerpt}</p>
                  <div className="border-t pt-4">
                    <div className="text-sm font-semibold text-gray-900 mb-2">Key Results:</div>
                    <div className="space-y-1">
                      {study.metrics.slice(0, 2).map((metric, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{metric.label}:</span>
                          <span className="font-semibold text-green-600">{metric.before} to {metric.after}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 text-primary-600 font-semibold text-sm group-hover:translate-x-2 transition-transform inline-block">View Full Case Study</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-16 bg-primary-600 text-white p-8 rounded-lg text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h3>
            <p className="text-xl mb-6 text-primary-100">Let us identify your marketing leaks and create an ROI improvement plan.</p>
            <Link href="/contact" className="btn-secondary">Plug Now</Link>
          </div>
        </div>
      </section>
    </main>
  );
}`;

  // Get SHA of existing file
  let sha: string | undefined;
  try {
    const checkRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' } }
    );
    if (checkRes.ok) {
      const data = await checkRes.json();
      sha = data.sha;
    }
  } catch {}

  const body: Record<string, string> = {
    message: 'update: case studies content',
    content: Buffer.from(caseStudiesCode).toString('base64'),
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: 'GitHub error', details: err }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
