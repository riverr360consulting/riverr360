'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GetStartedPage() {
  // Smooth scroll for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <img 
                src="/images/logo.png" 
                alt="Riverr360" 
                className="h-10 md:h-12 w-auto"
              />
            </Link>
            <a href="#lead-form" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors">
              Get Started Free
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
              Proven Framework • 90-Day Results • 3X Average ROI
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Stop Wasting Your<br />
              Marketing Budget
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Our 7-step framework transforms chaotic marketing into a revenue-generating machine. See results in 90 days.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#lead-form" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block">
                Get Free $500 Audit
              </a>
              <a href="#process" className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-200 transition-colors inline-block">
                See How It Works
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 pt-12 border-t border-gray-200">
              <div>
                <div className="text-4xl font-bold text-primary-600">240%</div>
                <div className="text-sm text-gray-600 mt-1">Avg. ROI Increase</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600">60%</div>
                <div className="text-sm text-gray-600 mt-1">Cost Reduction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600">90 Days</div>
                <div className="text-sm text-gray-600 mt-1">To See Results</div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Horizontal Flow Section */}
        <section id="process" className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Proven 7-Step Framework
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From chaos to clarity to conversion in 90 days
              </p>
            </div>

            {/* Desktop: Horizontal Flow */}
            <div className="hidden lg:block">
              {/* Top Row - Steps 1, 2, 3, 4 */}
              <div className="flex items-start justify-center gap-4 mb-32">
                {/* Step 1 */}
                <div className="flex flex-col items-center w-44 animate-fade-in">
                  <div className="relative mb-4">
                    <div className="w-36 h-36 rounded-full bg-white shadow-lg border-4 border-blue-500 flex flex-col items-center justify-center transition-all hover:scale-110 hover:shadow-xl">
                      <div className="text-5xl mb-2">🔍</div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                      1
                    </div>
                  </div>
                  <h3 className="font-bold text-base text-gray-900 text-center mb-2">
                    Discovery &<br />Leak Audit
                  </h3>
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    Identify where your marketing dollars leak
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center pt-16">
                  <svg width="60" height="40" viewBox="0 0 60 40" className="text-gray-300">
                    <defs>
                      <marker id="arrowhead1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
                      </marker>
                    </defs>
                    <path d="M 5 20 L 55 20" stroke="currentColor" strokeWidth="3" fill="none" markerEnd="url(#arrowhead1)" />
                  </svg>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center w-44 animate-fade-in" style={{animationDelay: '0.1s'}}>
                  <div className="relative mb-4">
                    <div className="w-36 h-36 rounded-full bg-white shadow-lg border-4 border-cyan-500 flex flex-col items-center justify-center transition-all hover:scale-110 hover:shadow-xl">
                      <div className="text-5xl mb-2">📋</div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                      2
                    </div>
                  </div>
                  <h3 className="font-bold text-base text-gray-900 text-center mb-2">
                    Strategy<br />Blueprint
                  </h3>
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    Custom 90-day roadmap for your goals
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center pt-16">
                  <svg width="60" height="40" viewBox="0 0 60 40" className="text-gray-300">
                    <path d="M 5 20 L 55 20" stroke="currentColor" strokeWidth="3" fill="none" markerEnd="url(#arrowhead1)" />
                  </svg>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center w-44 animate-fade-in" style={{animationDelay: '0.2s'}}>
                  <div className="relative mb-4">
                    <div className="w-36 h-36 rounded-full bg-white shadow-lg border-4 border-purple-500 flex flex-col items-center justify-center transition-all hover:scale-110 hover:shadow-xl">
                      <div className="text-5xl mb-2">🎯</div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                      3
                    </div>
                  </div>
                  <h3 className="font-bold text-base text-gray-900 text-center mb-2">
                    Funnel<br />Optimization
                  </h3>
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    Build high-converting journeys
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center pt-16">
                  <svg width="60" height="40" viewBox="0 0 60 40" className="text-gray-300">
                    <path d="M 5 20 L 55 20" stroke="currentColor" strokeWidth="3" fill="none" markerEnd="url(#arrowhead1)" />
                  </svg>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center w-44 animate-fade-in" style={{animationDelay: '0.3s'}}>
                  <div className="relative mb-4">
                    <div className="w-36 h-36 rounded-full bg-white shadow-lg border-4 border-pink-500 flex flex-col items-center justify-center transition-all hover:scale-110 hover:shadow-xl">
                      <div className="text-5xl mb-2">🚀</div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                      4
                    </div>
                  </div>
                  <h3 className="font-bold text-base text-gray-900 text-center mb-2">
                    Traffic & Lead<br />Generation
                  </h3>
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    Scale qualified traffic
                  </p>
                </div>
              </div>

              {/* Curved Arrow Down (AFTER Step 4) */}
              <div className="relative -mt-24 mb-8">
                <div className="absolute right-32" style={{top: '-60px'}}>
                  <svg width="140" height="120" viewBox="0 0 140 120" className="text-orange-500">
                    <defs>
                      <marker id="arrowdown" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
                      </marker>
                    </defs>
                    <path d="M 70 10 Q 110 60 70 110" stroke="currentColor" strokeWidth="4" fill="none" markerEnd="url(#arrowdown)" />
                  </svg>
                </div>
              </div>

              {/* Bottom Row - Steps 7, 6, 5 (RIGHT TO LEFT: 7, 6, 5) */}
<div className="flex items-start justify-center gap-4">

  {/* Step 7 - RIGHTMOST */}
  <div className="flex flex-col items-center w-44 animate-fade-in" style={{animationDelay: '0.4s'}}>
    <div className="relative mb-4">
      <div className="w-36 h-36 rounded-full bg-white shadow-lg border-4 border-blue-500 flex flex-col items-center justify-center transition-all hover:scale-110 hover:shadow-xl">
        <div className="text-5xl mb-2">📊</div>
      </div>
      <div className="absolute -top-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">
        7
      </div>
    </div>
    <h3 className="font-bold text-base text-gray-900 text-center mb-2">
      Continuous<br />Optimization
    </h3>
    <p className="text-xs text-gray-500 text-center leading-relaxed">
      Data-driven improvements
    </p>
  </div>

  {/* Arrow Left (7 to 6) */}
  <div className="flex items-center pt-16">
    <svg width="60" height="40" viewBox="0 0 60 40" className="text-gray-300 transform rotate-180">
      <path d="M 5 20 L 55 20" stroke="currentColor" strokeWidth="3" fill="none" markerEnd="url(#arrowhead1)" />
    </svg>
  </div>

  {/* Step 6 - MIDDLE */}
  <div className="flex flex-col items-center w-44 animate-fade-in" style={{animationDelay: '0.5s'}}>
    <div className="relative mb-4">
      <div className="w-36 h-36 rounded-full bg-white shadow-lg border-4 border-green-500 flex flex-col items-center justify-center transition-all hover:scale-110 hover:shadow-xl">
        <div className="text-5xl mb-2">🔄</div>
      </div>
      <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">
        6
      </div>
    </div>
    <h3 className="font-bold text-base text-gray-900 text-center mb-2">
      Retention &<br />LTV Growth
    </h3>
    <p className="text-xs text-gray-500 text-center leading-relaxed">
      Maximize customer value
    </p>
  </div>

  {/* Arrow Left (6 to 5) */}
  <div className="flex items-center pt-16">
    <svg width="60" height="40" viewBox="0 0 60 40" className="text-gray-300 transform rotate-180">
      <path d="M 5 20 L 55 20" stroke="currentColor" strokeWidth="3" fill="none" markerEnd="url(#arrowhead1)" />
    </svg>
  </div>

  {/* Step 5 - LEFTMOST */}
  <div className="flex flex-col items-center w-44 animate-fade-in" style={{animationDelay: '0.6s'}}>
    <div className="relative mb-4">
      <div className="w-36 h-36 rounded-full bg-white shadow-lg border-4 border-orange-500 flex flex-col items-center justify-center transition-all hover:scale-110 hover:shadow-xl">
        <div className="text-5xl mb-2">💰</div>
      </div>
      <div className="absolute -top-2 -right-2 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">
        5
      </div>
    </div>
    <h3 className="font-bold text-base text-gray-900 text-center mb-2">
      Conversion<br />Optimization
    </h3>
    <p className="text-xs text-gray-500 text-center leading-relaxed">
      Turn visitors into customers
    </p>
  </div>

</div>

            
            </div>

            {/* Mobile: Simple Vertical Cards */}
            <div className="lg:hidden space-y-6">
              {[
                {num: 1, icon: '🔍', title: 'Discovery & Leak Audit', desc: 'Identify where your marketing dollars leak', color: 'border-blue-500'},
                {num: 2, icon: '📋', title: 'Strategy Blueprint', desc: 'Custom 90-day roadmap for your goals', color: 'border-cyan-500'},
                {num: 3, icon: '🎯', title: 'Funnel Optimization', desc: 'Build high-converting journeys', color: 'border-purple-500'},
                {num: 4, icon: '🚀', title: 'Traffic & Lead Generation', desc: 'Scale qualified traffic', color: 'border-pink-500'},
                {num: 5, icon: '💰', title: 'Conversion Optimization', desc: 'Turn visitors into customers', color: 'border-orange-500'},
                {num: 6, icon: '🔄', title: 'Retention & LTV Growth', desc: 'Maximize customer value', color: 'border-green-500'},
                {num: 7, icon: '📊', title: 'Continuous Optimization', desc: 'Data-driven improvements', color: 'border-blue-500'},
              ].map((step) => (
                <div key={step.num} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md border-l-4 ${step.color}">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-3xl border-2 ${step.color}">
                      {step.icon}
                    </div>
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mt-2">
                      {step.num}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-20">
              <a href="#lead-form" className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors inline-block shadow-lg hover:shadow-xl">
                Start Your Transformation Today
              </a>
            </div>
          </div>
        </section>

	{/* Detailed Steps Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="space-y-12">
              {/* Step 1 Detail */}
              <div className="flex flex-col md:flex-row gap-8 items-start bg-white p-8 rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-3xl">
                    🔍
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-sm text-primary-600 font-semibold mb-2">STEP 1</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Discovery & Leak Audit</h3>
                  <p className="text-gray-700 mb-4">
                    We dive deep into your current marketing to identify the leaks draining your budget. 
                    Through data analysis, competitor research, and conversion tracking, we pinpoint exactly 
                    where you're losing money.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Complete marketing audit (paid ads, SEO, content, email)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Conversion funnel analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Competitor gap analysis</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-shrink-0">
                  <a href="#lead-form" className="btn-secondary whitespace-nowrap">
                    Get Free Audit
                  </a>
                </div>
              </div>

              {/* Step 2 Detail */}
              <div className="flex flex-col md:flex-row gap-8 items-start bg-white p-8 rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-3xl">
                    📋
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-sm text-primary-600 font-semibold mb-2">STEP 2</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Strategy Blueprint</h3>
                  <p className="text-gray-700 mb-4">
                    Based on audit findings, we create a custom 90-day roadmap. No cookie-cutter solutions—
                    every strategy is tailored to your industry, budget, and goals.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Prioritized action plan with timeline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Budget allocation recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>KPI targets and success metrics</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 3 Detail */}
              <div className="flex flex-col md:flex-row gap-8 items-start bg-white p-8 rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-3xl">
                    🎯
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-sm text-primary-600 font-semibold mb-2">STEP 3</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Funnel Optimization & Implementation</h3>
                  <p className="text-gray-700 mb-4">
                    We rebuild your conversion funnels from the ground up. Landing pages, email sequences, 
                    and customer journeys designed to convert at industry-leading rates.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>High-converting landing pages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Automated email sequences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>CRO testing framework</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-shrink-0">
                  <a href="#lead-form" className="btn-secondary whitespace-nowrap">
                    Start Now
                  </a>
                </div>
              </div>

              {/* Step 4 Detail */}
              <div className="flex flex-col md:flex-row gap-8 items-start bg-white p-8 rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-3xl">
                    🚀
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-sm text-primary-600 font-semibold mb-2">STEP 4</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Traffic & Lead Generation Scaling</h3>
                  <p className="text-gray-700 mb-4">
                    With optimized funnels in place, we scale your traffic. Strategic PPC, SEO, and content 
                    marketing that brings qualified leads at the lowest possible cost.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Targeted PPC campaigns (Google, Meta, LinkedIn)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>SEO strategy and implementation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Content marketing and distribution</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 5 Detail */}
              <div className="flex flex-col md:flex-row gap-8 items-start bg-white p-8 rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-3xl">
                    💰
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-sm text-primary-600 font-semibold mb-2">STEP 5</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Conversion & Sales Optimization</h3>
                  <p className="text-gray-700 mb-4">
                    More traffic means nothing without conversions. We optimize every touchpoint to turn 
                    visitors into customers at rates your competitors can't match.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>A/B testing and experimentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Sales enablement and automation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Retargeting and nurture campaigns</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-shrink-0">
                  <a href="#lead-form" className="btn-secondary whitespace-nowrap">
                    Boost Conversions
                  </a>
                </div>
              </div>

              {/* Step 6 Detail */}
              <div className="flex flex-col md:flex-row gap-8 items-start bg-white p-8 rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-3xl">
                    🔄
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-sm text-primary-600 font-semibold mb-2">STEP 6</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Retention & Lifetime Value Growth</h3>
                  <p className="text-gray-700 mb-4">
                    Acquiring customers is just the start. We implement retention strategies that turn 
                    one-time buyers into repeat customers and brand advocates.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Customer success programs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Upsell and cross-sell automation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Referral and loyalty programs</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 7 Detail */}
              <div className="flex flex-col md:flex-row gap-8 items-start bg-white p-8 rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-3xl">
                    📊
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-sm text-primary-600 font-semibold mb-2">STEP 7</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Reporting & Continuous Optimization</h3>
                  <p className="text-gray-700 mb-4">
                    Marketing never stops improving. We track everything, report transparently, and 
                    continuously optimize for better results month after month.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Real-time dashboards and analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Monthly performance reviews</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span>Ongoing testing and improvements</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-shrink-0">
                  <a href="#lead-form" className="btn-secondary whitespace-nowrap">
                    See Results
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Social Proof */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Real Results from Real Businesses
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="text-5xl font-bold text-primary-600 mb-2">240%</div>
                <div className="text-gray-700 font-medium mb-1">Conversion Rate Increase</div>
                <div className="text-sm text-gray-500">E-commerce Brand</div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="text-5xl font-bold text-primary-600 mb-2">-60%</div>
                <div className="text-gray-700 font-medium mb-1">PPC Cost Reduction</div>
                <div className="text-sm text-gray-500">SaaS Company</div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="text-5xl font-bold text-primary-600 mb-2">1,900%</div>
                <div className="text-gray-700 font-medium mb-1">Organic Traffic Growth</div>
                <div className="text-sm text-gray-500">Local Business</div>
              </div>
            </div>

            <div className="text-center mt-12">
              <a href="#lead-form" className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors inline-block">
                Get These Results for Your Business
              </a>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section id="lead-form" className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Get Your Free Marketing Audit
                </h2>
                <p className="text-lg text-gray-600">
                  Discover exactly where your marketing is leaking money. 
                  <span className="font-semibold text-primary-600"> $500 value, completely free.</span>
                </p>
              </div>

              <form className="space-y-6" action="https://api.web3forms.com/submit" method="POST">
                <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
                <input type="hidden" name="subject" value="New Lead - Marketing Audit Request" />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    name="website"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Monthly Marketing Budget *
                  </label>
                  <select
                    name="budget"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select your budget range</option>
                    <option value="<$2,500">Less than $2,500/month</option>
                    <option value="$2,500-$5,000">$2,500 - $5,000/month</option>
                    <option value="$5,000-$10,000">$5,000 - $10,000/month</option>
                    <option value="$10,000-$25,000">$10,000 - $25,000/month</option>
                    <option value="$25,000+">$25,000+/month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    What's your biggest marketing challenge? *
                  </label>
                  <textarea
                    name="challenge"
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us what's keeping you up at night..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg py-4 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  Get My Free $500 Audit
                </button>

                <p className="text-sm text-gray-500 text-center">
                  ✓ No credit card required • ✓ Results in 48 hours • ✓ Zero obligation
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Stop Wasting Money and Start Growing?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join businesses that transformed their marketing from expense to profit center.
            </p>
            <a href="#lead-form" className="bg-white text-gray-900 hover:bg-gray-100 font-bold text-lg py-4 px-10 rounded-lg inline-block transition-colors">
              Claim Your Free Audit Now
            </a>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <img 
                src="/images/logo.png" 
                alt="Riverr360" 
                className="h-10 w-auto brightness-0 invert mb-2"
              />
              <p className="text-sm">End-to-End Digital Growth</p>
            </div>
            <div className="text-sm">
              <p>© {new Date().getFullYear()} Riverr360 Digital Marketing. All rights reserved.</p>
            </div>
            <div>
              <a href="mailto:info@riverr360.com" className="text-sm hover:text-white transition-colors">
                info@riverr360.com
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
