// FILE: app/webinars/page.tsx
// Webinar landing page with registration and archives

import { currentWebinar, archivedWebinars } from '@/data/webinars';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Marketing Webinars | Riverr360',
  description: 'Join our free marketing webinars and learn proven strategies to grow your business. Expert insights on SEO, PPC, Social Media & more.',
};

export default function WebinarsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Current Webinar */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🔴 LIVE WEBINAR
              </div>
              
              <h1 className="text-5xl font-bold mb-6">
                {currentWebinar.title}
              </h1>
              
              <p className="text-xl text-white/90 mb-8">
                {currentWebinar.description}
              </p>

              {/* Webinar Details */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-lg">{currentWebinar.date} at {currentWebinar.time}</span>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-lg">{currentWebinar.duration}</span>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-lg">Hosted by {currentWebinar.speaker.name}</span>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={currentWebinar.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-primary-700 font-bold text-lg px-10 py-5 rounded-xl hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl"
              >
                Register for Free →
              </a>

              <p className="text-sm text-white/70 mt-4">
                ✓ 100% Free • ✓ Live Q&A Session • ✓ Recording Available
              </p>
            </div>

            {/* Right: Image/Thumbnail */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-primary-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What You'll Learn
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {currentWebinar.topics.map((topic, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="text-gray-700 font-medium">{topic}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href={currentWebinar.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-10 py-4 rounded-xl transition-colors"
            >
              Save My Spot - Register Free
            </a>
          </div>
        </div>
      </section>

      {/* Who Should Attend */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Who Should Attend?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">👔</div>
              <h3 className="font-bold text-gray-900 mb-2">Business Owners</h3>
              <p className="text-gray-600 text-sm">
                Stop wasting money on marketing that doesn't work
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-bold text-gray-900 mb-2">Marketing Managers</h3>
              <p className="text-gray-600 text-sm">
                Learn strategies to improve your team's ROI
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-bold text-gray-900 mb-2">Entrepreneurs</h3>
              <p className="text-gray-600 text-sm">
                Scale your startup with proven marketing tactics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Webinar Archives */}
      {archivedWebinars.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Previous Webinars
              </h2>
              <p className="text-gray-600 text-lg">
                Catch up on webinars you missed
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {archivedWebinars.map((webinar) => (
                <div key={webinar.id} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary-500 hover:shadow-lg transition-all">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gray-900">
                    {webinar.youtubeVideoId ? (
                      <a
                        href={`https://www.youtube.com/watch?v=${webinar.youtubeVideoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative group"
                      >
                        <img
                          src={`https://img.youtube.com/vi/${webinar.youtubeVideoId}/maxresdefault.jpg`}
                          alt={webinar.title}
                          className="w-full h-full object-cover"
                        />
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
                        <span className="text-white text-sm">Video Coming Soon</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="text-xs text-gray-500 mb-2">{webinar.date}</div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">
                      {webinar.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {webinar.description}
                    </p>

                    {webinar.youtubeVideoId && (
                      <a
                        href={`https://www.youtube.com/watch?v=${webinar.youtubeVideoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm"
                      >
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

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of businesses who've already learned these strategies
          </p>
          <a
            href={currentWebinar.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-primary-700 font-bold text-lg px-12 py-5 rounded-xl hover:bg-gray-50 transition-all shadow-xl"
          >
            Register for Free Webinar
          </a>
          <p className="text-sm text-white/70 mt-4">
            Limited spots available • 100% Free • No credit card required
          </p>
        </div>
      </section>
    </div>
  );
}
