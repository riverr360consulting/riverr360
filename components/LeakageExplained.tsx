import CTAButton from './CTAButton';

export default function LeakageExplained() {
  return (
    <section id="leakage-explained" className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            What is Marketing Revenue Leakage?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl mb-6">
              Marketing revenue leakage occurs when your digital marketing efforts fail to 
              convert potential customers, wasting your ad spend and losing sales opportunities. 
              It's the silent profit killer that most businesses don't even track.
            </p>
            
            <div className="bg-gray-50 p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                The Hidden Cost
              </h3>
              <p className="mb-4">
                Studies show that businesses waste 40-60% of their marketing budget on 
                ineffective campaigns, poor targeting, and broken conversion funnels. 
                For a company spending $10K/month on marketing, that's up to $6K wasted monthly.
              </p>
              <p>
                The worst part? Most of this is completely preventable with proper tracking, 
                optimization, and strategic digital marketing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border-l-4 border-primary-600 pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Where Marketing Dollars Leak
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Poorly optimized ad campaigns</li>
                  <li>• Low website conversion rates</li>
                  <li>• Weak email marketing funnels</li>
                  <li>• Invisible SEO presence</li>
                </ul>
              </div>
              <div className="border-l-4 border-primary-600 pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  The Impact
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Wasted advertising budget</li>
                  <li>• Lost leads and customers</li>
                  <li>• Poor ROI on marketing spend</li>
                  <li>• Competitors capturing your market</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <CTAButton text="See How We Help" href="/case-studies" variant="primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
