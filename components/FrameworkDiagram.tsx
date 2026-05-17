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
              viewBox="0 0 640 640"
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Orbit ring */}
              <circle cx="320" cy="320" r="210" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 6"/>

              {/* Connector lines */}
              <line x1="320" y1="200" x2="320" y2="152" stroke="#e5e7eb" strokeWidth="1"/>
              <line x1="388" y1="253" x2="467" y2="227" stroke="#e5e7eb" strokeWidth="1"/>
              <line x1="368" y1="387" x2="398" y2="428" stroke="#e5e7eb" strokeWidth="1"/>
              <line x1="272" y1="387" x2="242" y2="428" stroke="#e5e7eb" strokeWidth="1"/>
              <line x1="252" y1="253" x2="173" y2="227" stroke="#e5e7eb" strokeWidth="1"/>

              {/* Layer 01 — Acquisition — top */}
              <circle cx="320" cy="110" r="70" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1"/>
              <text x="320" y="100" textAnchor="middle" fontSize="13" fontWeight="600" fill="#991b1b">Acquisition</text>
              <text x="320" y="116" textAnchor="middle" fontSize="11" fill="#b91c1c">Improve traffic</text>
              <text x="320" y="130" textAnchor="middle" fontSize="11" fill="#b91c1c">efficiency</text>
              <circle cx="373" cy="62" r="12" fill="#fee2e2" stroke="#fca5a5" strokeWidth="0.5"/>
              <text x="373" y="62" textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="600" fill="#991b1b">01</text>

              {/* Layer 02 — Attribution — top right */}
              <circle cx="509" cy="215" r="70" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1"/>
              <text x="509" y="205" textAnchor="middle" fontSize="13" fontWeight="600" fill="#78350f">Attribution</text>
              <text x="509" y="221" textAnchor="middle" fontSize="11" fill="#92400e">Restore revenue</text>
              <text x="509" y="235" textAnchor="middle" fontSize="11" fill="#92400e">visibility</text>
              <circle cx="562" cy="168" r="12" fill="#fef3c7" stroke="#fcd34d" strokeWidth="0.5"/>
              <text x="562" y="168" textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="600" fill="#78350f">02</text>

              {/* Layer 03 — Conversion — bottom right */}
              <circle cx="430" cy="470" r="70" fill="#f0fdf4" stroke="#6ee7b7" strokeWidth="1"/>
              <text x="430" y="460" textAnchor="middle" fontSize="13" fontWeight="600" fill="#064e3b">Conversion</text>
              <text x="430" y="476" textAnchor="middle" fontSize="11" fill="#065f46">Increase customer</text>
              <text x="430" y="490" textAnchor="middle" fontSize="11" fill="#065f46">action</text>
              <circle cx="483" cy="522" r="12" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.5"/>
              <text x="483" y="522" textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="600" fill="#064e3b">03</text>

              {/* Layer 04 — Retention — bottom left */}
              <circle cx="210" cy="470" r="70" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1"/>
              <text x="210" y="460" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e3a8a">Retention</text>
              <text x="210" y="476" textAnchor="middle" fontSize="11" fill="#1d4ed8">Strengthen</text>
              <text x="210" y="490" textAnchor="middle" fontSize="11" fill="#1d4ed8">lifetime value</text>
              <circle cx="157" cy="522" r="12" fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.5"/>
              <text x="157" y="522" textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="600" fill="#1e3a8a">04</text>

              {/* Layer 05 — Scaling — top left */}
              <circle cx="131" cy="215" r="70" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1"/>
              <text x="131" y="205" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3730a3">Scaling</text>
              <text x="131" y="221" textAnchor="middle" fontSize="11" fill="#4338ca">Build profitable</text>
              <text x="131" y="235" textAnchor="middle" fontSize="11" fill="#4338ca">growth systems</text>
              <circle cx="78" cy="168" r="12" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="0.5"/>
              <text x="78" y="168" textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="600" fill="#3730a3">05</text>

              {/* Center logo */}
              <circle cx="320" cy="320" r="112" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
              <image
                href="/images/r360-framework-logo.png"
                x="208" y="208"
                width="224" height="224"
                preserveAspectRatio="xMidYMid meet"
              />
            </svg>
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">Each layer connects to a precise diagnostic and recovery roadmap</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/framework" className="inline-block bg-primary-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg mr-4">
            Explore Full Framework →
          </Link>
          <Link href="/get-started" className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-xl border-2 border-primary-600 hover:bg-primary-50 transition-all">
            Get Free Diagnosis
          </Link>
        </div>

      </div>
    </section>
  );
}
