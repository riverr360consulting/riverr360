import CTAButton from './CTAButton';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Is Your Marketing <span className="text-primary-600">Leaking Money?</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Every day, businesses waste thousands on ineffective digital marketing. 
            Stop the leaks and maximize your ROI with data-driven solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton text="Plug Now" variant="primary" />
            <CTAButton text="Learn More" variant="secondary" href="#leakage-explained" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary-600 mb-2">40-60%</div>
              <div className="text-gray-600">Wasted Ad Spend</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary-600 mb-2">3X ROI</div>
              <div className="text-gray-600">Average Improvement</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary-600 mb-2">60 Days</div>
              <div className="text-gray-600">To See Results</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
