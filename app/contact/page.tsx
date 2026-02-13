import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Riverr360 Digital Marketing',
  description: 'Get in touch to stop wasting your marketing budget. Free marketing audit and consultation.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Let's Plug Your Marketing Leaks
              </h1>
              <p className="text-xl text-gray-600">
                Get a free marketing audit to discover where you're wasting budget 
                and how we can help you maximize ROI.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <a href="mailto:info@riverr360.com" className="text-primary-600 hover:text-primary-700">
                      info@riverr360.com
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                    <a href="tel:+7411129188" className="text-primary-600 hover:text-primary-700">
                      (+91)-7411-129-188
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="bg-primary-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    What to Expect
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Response within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Free marketing audit (30 minutes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Identify your biggest marketing leaks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>No-obligation ROI improvement plan</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How long does a typical engagement last?
                </h3>
                <p className="text-gray-600">
                  Most clients see results within 60-90 days. We offer both project-based work 
                  (audits, website optimization) and ongoing monthly management (SEO, PPC, content marketing).
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What industries do you work with?
                </h3>
                <p className="text-gray-600">
                  We work with businesses across all industries, with particular expertise in 
                  B2B services, SaaS, e-commerce, professional services, and local businesses.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What's your pricing model?
                </h3>
                <p className="text-gray-600">
                  We offer flexible pricing including project-based fees, monthly retainers, and 
                  performance-based models. Pricing depends on scope and your goals.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
