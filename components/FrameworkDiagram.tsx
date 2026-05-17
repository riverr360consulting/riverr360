import Link from 'next/link';

const layers = [
  { number: '01', name: 'Acquisition', outcome: 'Improve traffic efficiency', color: 'bg-red-50 border-red-400', badge: 'bg-red-100 text-red-700' },
  { number: '02', name: 'Attribution', outcome: 'Restore revenue visibility', color: 'bg-orange-50 border-orange-400', badge: 'bg-orange-100 text-orange-700' },
  { number: '03', name: 'Conversion', outcome: 'Increase customer action', color: 'bg-yellow-50 border-yellow-400', badge: 'bg-yellow-100 text-yellow-700' },
  { number: '04', name: 'Retention', outcome: 'Strengthen lifetime value', color: 'bg-green-50 border-green-400', badge: 'bg-green-100 text-green-700' },
  { number: '05', name: 'Scaling', outcome: 'Build profitable growth systems', color: 'bg-blue-50 border-blue-400', badge: 'bg-blue-100 text-blue-700' },
];

export default function FrameworkDiagram() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
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

        {/* Diagram */}
        <div className="max-w-4xl mx-auto">

          {/* Top — Acquisition */}
          <div className="flex justify-center mb-4">
            <Link href="/framework" className={`border-l-4 rounded-xl px-6 py-4 w-72 text-center hover:shadow-md transition-all ${layers[0].color}`}>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${layers[0].badge}`}>Layer {layers[0].number}</span>
              <div className="font-bold text-gray-900 mt-2 text-lg">{layers[0].name}</div>
              <div className="text-sm text-gray-600 mt-1">{layers[0].outcome}</div>
            </Link>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center mb-2">
            <div className="w-px h-6 bg-gray-200"></div>
          </div>

          {/* Middle row — Scaling | Logo | Attribution */}
          <div className="flex items-center justify-center gap-4 mb-2">

            {/* Scaling */}
            <Link href="/framework" className={`border-l-4 rounded-xl px-5 py-4 w-52 text-center hover:shadow-md transition-all ${layers[4].color}`}>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${layers[4].badge}`}>Layer {layers[4].number}</span>
              <div className="font-bold text-gray-900 mt-2">{layers[4].name}</div>
              <div className="text-sm text-gray-600 mt-1">{layers[4].outcome}</div>
            </Link>

            <div className="text-gray-300 text-xl flex-shrink-0">—</div>

            {/* R360 Logo Center */}
            <div className="flex-shrink-0 w-52 h-52 flex items-center justify-center">
              <img
                src="/images/r360-framework-logo.png"
                alt="R360 Revenue Leakage Framework"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>

            <div className="text-gray-300 text-xl flex-shrink-0">—</div>

            {/* Attribution */}
            <Link href="/framework" className={`border-l-4 rounded-xl px-5 py-4 w-52 text-center hover:shadow-md transition-all ${layers[1].color}`}>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${layers[1].badge}`}>Layer {layers[1].number}</span>
              <div className="font-bold text-gray-900 mt-2">{layers[1].name}</div>
              <div className="text-sm text-gray-600 mt-1">{layers[1].outcome}</div>
            </Link>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center mb-2">
            <div className="w-px h-6 bg-gray-200"></div>
          </div>

          {/* Bottom row — Retention | Conversion */}
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/framework" className={`border-l-4 rounded-xl px-6 py-4 w-64 text-center hover:shadow-md transition-all ${layers[3].color}`}>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${layers[3].badge}`}>Layer {layers[3].number}</span>
              <div className="font-bold text-gray-900 mt-2 text-lg">{layers[3].name}</div>
              <div className="text-sm text-gray-600 mt-1">{layers[3].outcome}</div>
            </Link>

            <Link href="/framework" className={`border-l-4 rounded-xl px-6 py-4 w-64 text-center hover:shadow-md transition-all ${layers[2].color}`}>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${layers[2].badge}`}>Layer {layers[2].number}</span>
              <div className="font-bold text-gray-900 mt-2 text-lg">{layers[2].name}</div>
              <div className="text-sm text-gray-600 mt-1">{layers[2].outcome}</div>
            </Link>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center mb-6">
            <div className="w-px h-6 bg-gray-200"></div>
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
      </div>
    </section>
  );
}
