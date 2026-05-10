import CTAButton from './CTAButton';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
            Introducing the R360 Revenue Leakage Framework
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Business Is <span className="text-primary-600">Leaking Revenue.</span> We Find It.
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Riverr360 helps businesses uncover hidden revenue leakage and build scalable growth systems driven by intelligence, efficiency, and measurable profitability.
          </p>

          <p className="text-base text-gray-500 mb-8 max-w-2xl mx-auto">
            Using our proprietary <strong>R360 Revenue Leakage Framework</strong> — a 5-layer diagnostic system covering Acquisition, Attribution, Conversion, Retention, and Scaling.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton text="Diagnose My Revenue Leakage" variant="primary" href="/get-started" />
            <CTAButton text="Explore the Framework" variant="secondary" href="/framework" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary-600 mb-2">5 Layers</div>
              <div className="text-gray-600">of Revenue Leakage Diagnosed</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary-600 mb-2">3X ROI</div>
              <div className="text-gray-600">Average Client Improvement</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary-600 mb-2">60 Days</div>
              <div className="text-gray-600">To Measurable Results</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
