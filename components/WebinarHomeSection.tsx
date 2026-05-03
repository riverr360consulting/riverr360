'use client';

import Link from 'next/link';
import { currentWebinar } from '@/data/webinars';

export default function WebinarHomeSection() {

  if (!currentWebinar) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            📅 FREE WEBINARS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Next Webinar Coming Soon</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We are planning our next free marketing webinar. Get notified as soon as it is announced and catch up on past sessions in the meantime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block text-center bg-white text-primary-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg">
              Notify Me
            </Link>
            <Link href="/webinars" className="inline-block text-center bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all">
              Watch Past Webinars
            </Link>
          </div>
          <p className="text-sm text-white/70 mt-6">100% Free | Live Q&A | Recordings Available</p>
        </div>
      </section>
    );
  }

  const webinar = currentWebinar;

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              UPCOMING FREE WEBINAR
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{webinar.title}</h2>
            <p className="text-xl text-white/90 mb-6">{webinar.description.substring(0, 150)}...</p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{webinar.date} | {webinar.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{webinar.duration} | 100% Free</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={webinar.registrationLink} target="_blank" rel="noopener noreferrer" className="inline-block text-center bg-white text-primary-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl">
                Register for Free
              </a>
              <Link href="/webinars" className="inline-block text-center bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all">
                Learn More
              </Link>
            </div>
            <p className="text-sm text-white/70 mt-4">Live Q&A | Recording Available | Certificate of Attendance</p>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-primary-400 to-purple-500 rounded-xl flex flex-col items-center justify-center">
                <svg className="w-20 h-20 text-white mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                <div className="text-white/80 text-sm">Live Webinar Session</div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="text-white/90 font-semibold text-sm mb-3">What You will Learn:</div>
                {webinar.topics.slice(0, 3).map((topic, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/80 text-sm">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{topic}</span>
                  </div>
                ))}
                <div className="text-white/60 text-xs pt-2">+ {webinar.topics.length - 3} more topics</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-lg shadow-lg transform rotate-6">FREE</div>
          </div>
        </div>
      </div>
    </section>
  );
}
