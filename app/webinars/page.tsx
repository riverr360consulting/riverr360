// FILE: app/webinars/page.tsx

import { currentWebinar, archivedWebinars } from '@/data/webinars';
import WebinarRegistrationForm from '@/components/WebinarRegistrationForm';
import SmoothScrollLink from '@/components/SmoothScrollLink';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Marketing Webinars | Riverr360',
  description: 'Join our free marketing webinars and learn proven strategies to grow your business.',
};

export default function WebinarsPage() {
  const hasUpcoming = currentWebinar !== null;

  return (
    <div className="min-h-screen">

      {hasUpcoming && currentWebinar ? (
        <>
          <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 text-white py-20">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  🔴 LIVE WEBINAR
                </div>
                <h1 className="text-5xl font-bold mb-6">{currentWebinar.title}</h1>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">{currentWebinar.description}</p>
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-lg">{currentWebinar.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-lg">{currentWebinar.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-lg">{currentWebinar.duration}</span>
                  </div>
                </div>
                <p className="text-sm text-white/70">✓ 100% Free • ✓ Live Q&A Session • ✓ Recording Available • ✓ Certificate</p>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {currentWebinar.topics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                    <div className="text-gray-700 font-medium">{topic}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="registration" className="py-16 bg-gray-50 scroll-mt-20">
            <div className="container mx-auto px-4 max-w-2xl">
              <WebinarRegistrationForm
                webinarTitle={currentWebinar.title}
                webinarDate={currentWebinar.date}
                webinarTime={currentWebinar.time}
              />
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Who Should Attend?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">👔</div>
                  <h3 className="font-bold text-gray-900 mb-2">Business Owners</h3>
                  <p className="text-gray-600 text-sm">Stop wasting money on marketing that doesn't work</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="font-bold text-gray-900 mb-2">Marketing Managers</h3>
                  <p className="text-gray-600 text-sm">Learn strategies to improve your team's ROI</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="font-bold text-gray-900 mb-2">Entrepreneurs</h3>
                  <p className="text-gray-600 text-sm">Scale your startup with proven marketing tactics</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gradient-to-br from-primary-600 to-purple-700 text-white">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Marketing?</h2>
              <p className="text-xl text-white/90 mb-8">Join hundreds of businesses who've already learned these strategies</p>
              <SmoothScrollLink href="#registration" className="inline-block bg-white text-primary-700 font-bold text-lg px-12 py-5 rounded-xl hover:bg-gray-50 transition-all shadow-xl">
                Register Now — It's Free
              </SmoothScrollLink>
              <p className="text-sm text-white/70 mt-4">Limited spots available • 100% Free • No credit card required</p>
            </div>
          </section>
        </>
      ) : (
        <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 text-white py-24">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-8">
              📅 NEXT WEBINAR
            </div>
            <h1 className="text-5xl font-bold mb-6">Coming Soon</h1>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              We're working on our next free webinar. Stay tuned — it's going to be packed with
              actionable marketing strategies to grow your business.
            </p>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-xl mx-auto mb-10">
              <h3 className="text-xl font-bold mb-2">Get Notified First</h3>
              <p className="text-white/80 text-sm mb-6">We'll reach out as soon as the next webinar is announced.</p>
              <a href="/contact" className="inline-block bg-white text-primary-700 font-bold px-10 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg">
                Notify Me →
              </a>
            </div>
            <p className="text-white/70 text-sm">✓ 100% Free • ✓ Live Q&A • ✓ Recording Available</p>
          </div>
        </section>
      )}

      {/* Past Webinars — Always visible */}
      {archivedWebinars.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Previous Webinars</h2>
              <p className="text-gray-600 text-lg">Catch up on webinars you missed</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {archivedWebinars.map((webinar) => (
                <div key={webinar.id} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary-500 hover:shadow-lg transition-all">
                  <div className="relative aspect-video bg-gray-900">
                    {webinar.youtubeVideoId ? (
                      <a href={`https://www.youtube.com/watch?v=${webinar.youtubeVideoId}`} target="_blank" rel="noopener noreferrer" className="block relative group">
                        <img src={`https://img.youtube.com/vi/${webinar.youtubeVideoId}/maxresdefault.jpg`} alt={webinar.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <span className="text-white text-sm">Recording Coming Soon</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-gray-500 mb-2">{webinar.date}</div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{webinar.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{webinar.description}</p>
                    {webinar.youtubeVideoId && (
                      <a href={`https://www.youtube.com/watch?v=${webinar.youtubeVideoId}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm">
                        Watch Recording
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
