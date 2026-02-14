import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Riverr360 Consulting',
  description: 'Meet the revenue leakage experts behind Riverr360 Consulting.',
};

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                About Riverr360
              </h1>
              <p className="text-xl text-gray-600">
                Revenue recovery experts with a proven track record
              </p>
            </div>
          </div>
        </section>

        {/* Profile Content */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Photo placeholder - replace with actual image */}
              <div className="mb-8 text-center">
                <div className="w-48 h-48 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-6xl">
                  👤
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Bijeesh Kuttikrishnan, Founder & Principal Consultant
                </h2>
                
                <p className="text-xl text-gray-600 mb-6">
                  With over 15 years of experience in digital marketing and optimization, 
                  I've helped dozens of companies recover millions in lost revenue.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                  Expertise
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Digital Marketing Operations</h4>
                    <p className="text-gray-600">
                      Streamlining billing, pricing, and contract management processes
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Marketing Analysis</h4>
                    <p className="text-gray-600">
                      Deep-dive audits to identify and quantify revenue leakage
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Process Optimization</h4>
                    <p className="text-gray-600">
                      Designing efficient workflows that prevent future leakage
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Technology Integration</h4>
                    <p className="text-gray-600">
                      Implementing systems that automate revenue protection
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                  Background
                </h3>
                <p className="text-gray-600 mb-4">
                  Prior to founding Riverr360, I led revenue operations teams at multiple 
                  high-growth SaaS companies, where I developed the methodologies and frameworks 
                  that I now bring to my clients.
                </p>
                <p className="text-gray-600 mb-4">
                  I hold an Bachelors Degree in Economics and am a certified Digital Marketing Professional. 
                  I've attended many industry conferences on topics including marketing strategy, 
                  revenue management, and budget optimization.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                  Certifications
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Certified Google Analytics & Ads Professional</li>
                  <li>• BA, Economics - [University of Calicut]</li>
                  <li>• Hubspot Certified Professional</li>
                  <li>• Six Sigma White Belt</li>
                </ul>

                <div className="mt-12 p-8 bg-primary-50 rounded-lg text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Let's Work Together
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Ready to stop your revenue leaks and maximize profitability?
                  </p>
                  <CTAButton text="Schedule a Consultation" variant="primary" href="https://calendar.app.google/JMgapqTEJMGsDCzu7"/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
