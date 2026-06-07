import Link from 'next/link';

export default function FrameworkDiagram() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Proprietary System
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How Revenue Leakage Gets Diagnosed and Fixed
          </h2>
          <p className="text-xl text-gray-600">
            The R360 Framework diagnoses 5 interconnected layers simultaneously — giving you a complete picture and a precise recovery roadmap.
          </p>
        </div>

        {/* Circular diagram */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative w-full" style={{ paddingBottom: '100%' }}>
            <svg
              viewBox="0 0 700 700"
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Orbit ring */}
              <circle cx="350" cy="350" r="240" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 6"/>

              {/* Connector lines */}
              <line x1="350" y1="230" x2="350" y2="185" stroke="#d1d5db" strokeWidth="1"/>
              <line x1="460" y1="295" x2="510" y2="268" stroke="#d1d5db" strokeWidth="1"/>
              <line x1="440" y1="447" x2="463" y2="472" stroke="#d1d5db" strokeWidth="1"/>
              <line x1="260" y1="447" x2="237" y2="472" stroke="#d1d5db" strokeWidth="1"/>
              <line x1="240" y1="295" x2="190" y2="268" stroke="#d1d5db" strokeWidth="1"/>

              {/* Layer 01 — Acquisition */}
              <circle cx="350" cy="110" r="75" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5"/>
              <text x="350" y="93" textAnchor="middle" fontSize="14" fontWeight="700" fill="#991b1b">Acquisition</text>
              <text x="350" y="111" textAnchor="middle" fontSize="12" fill="#b91c1c">Improve traffic</text>
              <text x="350" y="127" textAnchor="middle" fontSize="12" fill="#b91c1c">efficiency</text>
              <circle cx="409" cy="58" r="13" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1"/>
              <text x="409" y="58" textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="700" fill="#991b1b">01</text>

              {/* Layer 02 — Attribution */}
              <circle cx="578" cy="240" r="75" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5"/>
              <text x="578" y="223" textAnchor="middle" fontSize="14" fontWeight="700" fill="#78350f">Attribution</text>
              <text x="578" y="241" textAnchor="middle" fontSize="12" fill="#92400e">Restore revenue</text>
              <text x="578" y="257" textAnchor="middle" fontSize="12" fill="#92400e">visibility</text>
              <circle cx="636" cy="187" r="13" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1"/>
              <text x="636" y="187" textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="700" fill="#78350f">02</text>

              {/* Layer 03 — Conversion */}
              <circle cx="493" cy="537" r="75" fill="#f0fdf4" stroke="#6ee7b7" strokeWidth="1.5"/>
              <text x="493" y="520" textAnchor="middle" fontSize="14" fontWeight="700" fill="#064e3b">Conversion</text>
              <text x="493" y="538" textAnchor="middle" fontSize="12" fill="#065f46">Increase customer</text>
              <text x="493" y="554" textAnchor="middle" fontSize="12" fill="#065f46">action</text>
              <circle cx="551" cy="590" r="13" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1"/>
              <text x="551" y="590" textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="700" fill="#064e3b">03</text>

              {/* Layer 04 — Retention */}
              <circle cx="207" cy="537" r="75" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5"/>
              <text x="207" y="520" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e3a8a">Retention</text>
              <text x="207" y="538" textAnchor="middle" fontSize="12" fill="#1d4ed8">Strengthen</text>
              <text x="207" y="554" textAnchor="middle" fontSize="12" fill="#1d4ed8">lifetime value</text>
              <circle cx="149" cy="590" r="13" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1"/>
              <text x="149" y="590" textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="700" fill="#1e3a8a">04</text>

              {/* Layer 05 — Scaling */}
              <circle cx="122" cy="240" r="75" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1.5"/>
              <text x="122" y="223" textAnchor="middle" fontSize="14" fontWeight="700" fill="#3730a3">Scaling</text>
              <text x="122" y="241" textAnchor="middle" fontSize="12" fill="#4338ca">Build profitable</text>
              <text x="122" y="257" textAnchor="middle" fontSize="12" fill="#4338ca">growth systems</text>
              <circle cx="64" cy="187" r="13" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1"/>
              <text x="64" y="187" textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="700" fill="#3730a3">05</text>

              {/* Center */}
              <circle cx="350" cy="350" r="122" fill="white" stroke="#e5e7eb" strokeWidth="1.5"/>
              <image
                href="/images/r360-framework-logo.png"
                x="228" y="228"
                width="244" height="244"
                preserveAspectRatio="xMidYMid meet"
              />
            </svg>
          </div>
          <p className="text-center text-sm text-gray-400 mt-2">Each layer connects to a precise diagnostic and recovery roadmap</p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/framework" className="inline-block text-center bg-primary-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg">
              Explore Full Framework →
            </Link>
            <Link href="/score" className="inline-block text-center bg-white text-primary-600 font-bold px-8 py-4 rounded-xl border-2 border-primary-600 hover:bg-primary-50 transition-all">
              Get Your Revenue Leakage Score
            </Link>
          </div>
          {/* AI Audit CTA */}
          <div className="flex items-center gap-3">
            <div className="h-px w-16 bg-gray-200" />
            <Link
              href="/ai-audit"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary-600 transition-colors border border-gray-200 hover:border-primary-300 px-5 py-2.5 rounded-full hover:bg-primary-50"
            >
              🧠 Not sure? Try our free AI Marketing Audit
            </Link>
            <div className="h-px w-16 bg-gray-200" />
          </div>
        </div>

      </div>
    </section>
  );
}
