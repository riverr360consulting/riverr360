import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Riverr360 Digital Marketing',
  description: 'Get in touch to stop wasting your marketing budget. Free revenue leakage audit and consultation.',
};

const faqs = [
  { q: 'How long does a typical engagement last?', a: 'Most clients see results within 60–90 days. We offer both project-based work and ongoing monthly management depending on your goals and budget.' },
  { q: 'What industries do you work with?', a: 'We work across all industries, with particular expertise in B2B services, SaaS, e-commerce, professional services, and growth-stage startups.' },
  { q: "What's your pricing model?", a: "We offer flexible pricing including project-based fees, monthly retainers, and performance-based models. Everything starts with a free audit so you know exactly what you're investing in." },
  { q: 'What happens in the free Revenue Leakage Audit?', a: 'We spend 30 minutes reviewing your funnel across all 5 layers of the R360 framework — acquisition, conversion, retention, scaling, and systems — and identify your top revenue leaks. No pitch, no obligation.' },
  { q: 'Do I need to sign a long-term contract?', a: 'No. We believe in earning your trust through results. You can start with a short engagement and scale from there once you see the impact.' },
  { q: 'How quickly will I hear back after reaching out?', a: 'We respond to all enquiries within 24 business hours. For urgent matters, call us directly during office hours (Mon–Fri, 9 AM – 6 PM IST).' },
  { q: 'What makes Riverr360 different from other marketing agencies?', a: 'We start with a diagnosis, not a proposal. Most agencies pitch services before understanding your business. We audit first, identify your specific leaks, and only then recommend what will actually move the needle.' },
  { q: 'Do you work with early-stage businesses or only established companies?', a: 'Both. We work with growth-stage startups building revenue systems from scratch and with established businesses losing money in their funnel. The R360 framework applies at any stage.' },
  { q: 'Can you work with our in-house marketing team?', a: 'Absolutely. Many engagements are collaborative — we work alongside your internal team, upskilling them on the R360 framework and filling gaps where specialist expertise is needed.' },
  { q: 'What results can I realistically expect?', a: "Results vary by business, but across our client base we've seen an average 32% reduction in acquisition costs, 2.4x growth in qualified leads, and 41% improvement in conversion rates. The free audit gives you a realistic picture for your specific situation." },
];

export default function ContactPage() {
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-purple-50 py-20">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">Let's Talk</span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Let's Plug Your <span className="text-primary-600 inline-block">Revenue Leaks</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reach out for a free 30-minute Revenue Leakage Audit. No pitch, no obligation — just clarity on where your business is losing money.
          </p>
        </div>
      </section>

      {/* Contact Block */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Get In Touch</h2>
            <p className="text-gray-500">Multiple ways to reach us — pick what works best for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="mailto:riverr360consulting@gmail.com" className="group bg-white border-2 border-gray-100 hover:border-primary-300 rounded-2xl p-8 text-center transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-primary-50 group-hover:bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors">
                <svg className="w-7 h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
              <p className="text-sm text-gray-500 mb-3">We reply within 24 hours</p>
              <span className="text-primary-600 font-semibold text-sm break-all">riverr360consulting@gmail.com</span>
            </a>
            <a href="tel:+917411129188" className="group bg-white border-2 border-gray-100 hover:border-primary-300 rounded-2xl p-8 text-center transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-green-50 group-hover:bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
              <p className="text-sm text-gray-500 mb-3">Mon–Fri, 9 AM – 6 PM IST</p>
              <span className="text-green-600 font-semibold text-sm">(+91) 7411-129-188</span>
            </a>
            <a href="https://www.linkedin.com/company/riverr360" target="_blank" rel="noopener noreferrer" className="group bg-white border-2 border-gray-100 hover:border-primary-300 rounded-2xl p-8 text-center transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-blue-50 group-hover:bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors">
                <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">LinkedIn</h3>
              <p className="text-sm text-gray-500 mb-3">Connect & follow us</p>
              <span className="text-blue-600 font-semibold text-sm">@riverr360</span>
            </a>
          </div>
          <div className="mt-10 bg-primary-50 rounded-2xl p-8">
            <h3 className="font-bold text-gray-900 mb-5 text-center text-lg">What Happens After You Reach Out</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { step: '01', title: 'We respond', sub: 'Within 24 business hours' },
                { step: '02', title: 'Free audit call', sub: '30-min deep dive into your funnel' },
                { step: '03', title: 'Leakage report', sub: 'We identify your top revenue leaks' },
                { step: '04', title: 'Your choice', sub: 'No obligation, no pressure' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-primary-200 leading-none">{item.step}</span>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Address Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Location</h2>
            <p className="text-gray-500">Based in Bengaluru, serving clients globally.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Riverr360 Consulting</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Bengaluru, Karnataka<br />India — 560001</p>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Mon–Fri: 9:00 AM – 6:00 PM IST
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Saturday–Sunday: Closed
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
                Remote-first — serving clients globally
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Appointment */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">Free — No Obligation</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Book a Free Revenue Leakage Audit</h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">30 minutes. We'll walk through your funnel, identify your top leaks, and hand you a clear action plan — completely free.</p>
          <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-10 border border-primary-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {[
                { icon: '⏱', label: '30 minutes', sub: 'Focused deep-dive' },
                { icon: '🎯', label: 'Actionable plan', sub: 'Not just a diagnosis' },
                { icon: '💸', label: 'Completely free', sub: 'No credit card needed' },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-bold text-gray-900 text-sm">{item.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>
            <Link href="/book" className="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Schedule Your Free Audit
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500">Everything you need to know before reaching out.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-3">
                  <span className="text-primary-400 font-bold text-lg leading-none mt-0.5">Q</span>
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-primary-600">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-primary-100 mb-8">Email us directly and we'll get back to you within 24 hours.</p>
          <a href="mailto:riverr360consulting@gmail.com" className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-8 py-4 rounded-xl hover:bg-primary-50 transition-all shadow-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            riverr360consulting@gmail.com
          </a>
        </div>
      </section>

    </main>
  );
}
