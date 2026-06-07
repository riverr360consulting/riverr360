'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';

const areas = [
  {
    id: 'lead_generation', title: 'Lead Generation', icon: '🎯', layer: 'Acquisition Layer',
    items: [
      'We know our exact cost per lead by channel',
      'We have at least 2 consistent lead sources running',
      'Our target audience is clearly defined and documented',
      'We track which channels bring the highest quality leads',
      'We A/B test our lead generation campaigns regularly',
      'We have a content or organic strategy alongside paid',
      'We review lead quality monthly with sales or conversion data',
    ],
    solutions: [
      'Run a channel attribution audit to identify your lowest CPL source',
      'Build a second lead channel — if you rely on paid, add organic (SEO/content)',
      'Create an Ideal Customer Profile (ICP) document and share with the whole team',
      'Set up UTM parameters and connect ad data to CRM for lead quality tracking',
      'Start A/B testing ad creatives monthly — even small tests compound over time',
    ],
  },
  {
    id: 'lead_response', title: 'Lead Response', icon: '⚡', layer: 'Acquisition Layer',
    items: [
      'We respond to inbound leads within 1 hour',
      'We have an automated first-response system in place',
      'Every lead is assigned to a specific person immediately',
      'We have a defined script or framework for first contact',
      'We track response time as a metric',
      'Leads do not fall through the cracks on weekends or holidays',
      'We follow up with leads who do not reply to first contact',
    ],
    solutions: [
      'Set up an instant automated reply via CRM or email tool — within 5 minutes of enquiry',
      'Create a lead assignment rule so every lead has an owner within 15 minutes',
      'Build a first-contact script covering: intro, qualification, next step',
      'Add a weekend/holiday lead notification to ensure no lead goes cold',
      'Set up a 3-touch follow-up sequence for non-responders at Day 1, 3, and 7',
    ],
  },
  {
    id: 'sales_conversion', title: 'Sales Conversion', icon: '💼', layer: 'Conversion Layer',
    items: [
      'We know our lead-to-customer conversion rate',
      'Our sales process is documented and followed consistently',
      'We have a clear proposal or offer structure',
      'We address objections proactively during the sales process',
      'We track why deals are lost',
      'We have a follow-up sequence for prospects who go cold',
      'We know our average sales cycle length',
    ],
    solutions: [
      'Calculate your lead-to-sale conversion rate from last 90 days — this is your baseline',
      'Document your sales process in a simple SOP — even 5 steps is enough to start',
      'Create a proposal template with clear scope, outcomes, and pricing tiers',
      'Build an objection handling guide based on the top 5 reasons deals are lost',
      'Implement a lost-deal tracking field in CRM to spot patterns monthly',
    ],
  },
  {
    id: 'follow_up', title: 'Follow-up & Nurture', icon: '🔄', layer: 'Conversion Layer',
    items: [
      'We have a structured email follow-up sequence after first contact',
      'We use a CRM to track all prospect touchpoints',
      'We send value-based content between sales touchpoints',
      'Prospects are not left without contact for more than 7 days',
      'We have a re-engagement campaign for cold leads',
      'Our follow-up is personalised, not generic',
      'We know the average number of touchpoints before a sale',
    ],
    solutions: [
      'Build a 5-email nurture sequence triggered immediately after first contact',
      'Implement a CRM with pipeline stages — even a free tool like HubSpot CRM works',
      'Create 2-3 value assets (guides, checklists) to send between sales touchpoints',
      'Set a 7-day max rule — no prospect should go silent without a follow-up',
      'Build a re-engagement campaign for leads 30+ days cold with a new angle or offer',
    ],
  },
  {
    id: 'retention', title: 'Customer Retention', icon: '💎', layer: 'Retention Layer',
    items: [
      'We track customer churn rate monthly',
      'We have an onboarding process for new customers',
      'We collect regular feedback from existing customers',
      'We have upsell or cross-sell offers for existing customers',
      'We identify and proactively contact at-risk customers',
      'We measure customer lifetime value (LTV)',
      'We have a referral or loyalty programme',
    ],
    solutions: [
      'Calculate monthly churn rate — churned customers ÷ total customers at start of month',
      'Create a 30-day onboarding checklist for new customers to ensure early success',
      'Set up a quarterly NPS or CSAT survey to identify at-risk customers early',
      'Create at least one upsell or cross-sell offer and present it at the 60-day mark',
      'Build a simple referral programme — even a thank-you incentive increases referrals significantly',
    ],
  },
  {
    id: 'pricing', title: 'Pricing & Profitability', icon: '💰', layer: 'Scaling Layer',
    items: [
      'We review pricing at least once per year',
      'We know our gross and net margin per product or service',
      'We do not discount without a clear reason or policy',
      'Our pricing is positioned relative to market and value delivered',
      'We have tiered or packaged pricing options',
      'We know which offers generate the most profit — not just revenue',
      'We have removed or paused unprofitable offers',
    ],
    solutions: [
      'Schedule a quarterly pricing review — include margin analysis per offer',
      'Calculate gross margin for every product or service in your portfolio',
      'Create a discount policy — define who can approve discounts and under what conditions',
      'Introduce tiered pricing (Good / Better / Best) to capture more value across segments',
      'Identify your single most profitable offer and make it the primary focus of your marketing',
    ],
  },
  {
    id: 'data_attribution', title: 'Data & Attribution', icon: '📊', layer: 'Attribution Layer',
    items: [
      'We know which marketing activity drives the most revenue',
      'Our analytics and tracking are correctly set up',
      'We review revenue attribution data monthly',
      'We make budget decisions based on data, not opinion',
      'We track the full customer journey from ad to sale',
      'We have clean, reliable CRM data',
      'We can identify our single biggest growth lever right now',
    ],
    solutions: [
      'Audit your current tracking setup — check GA4, Meta Pixel, and CRM connections',
      'Implement UTM parameters consistently across all campaigns',
      'Set up a monthly attribution review — at minimum, map spend to revenue by channel',
      'Connect your ad platforms to your CRM to track the full journey from ad to closed deal',
      'Clean your CRM data — remove duplicates, fill missing fields, standardise deal stages',
    ],
  },
];

function getBand(score: number) {
  if (score <= 30) return { label: 'Critical', emoji: '🔴', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-300', message: 'Your business has severe revenue leakage across multiple areas. Immediate action is needed to stop the financial drain before it compounds further.' };
  if (score <= 50) return { label: 'High Risk', emoji: '🟠', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-300', message: 'Significant revenue is leaking from your funnel. Several key systems are either missing or underperforming and costing you money every month.' };
  if (score <= 70) return { label: 'Moderate', emoji: '🟡', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-300', message: 'Some systems are working well, but clear gaps exist that are costing you revenue. Targeted fixes in your weakest areas will make a significant difference.' };
  if (score <= 85) return { label: 'Good', emoji: '🟢', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-300', message: 'You have a solid foundation. Optimising the weaker areas will significantly improve your revenue efficiency and growth trajectory.' };
  return { label: 'Excellent', emoji: '🏆', color: 'text-primary-600', bg: 'bg-primary-50', border: 'border-primary-300', message: 'Your systems are well-optimised. Focus on scaling what is working and testing new growth levers to compound your advantage.' };
}

function ReportContent() {
  const params = useSearchParams();
  const name = params.get('name') || 'there';
  const total = parseInt(params.get('total') || '0');
  const scoresRaw = params.get('scores') || '{}';
  const checkedRaw = params.get('checked') || '{}';
  const scores: Record<string, number> = JSON.parse(scoresRaw);
  const checkedData: Record<string, boolean[]> = JSON.parse(checkedRaw);
  const band = getBand(total);

  const [aiAnalysis, setAiAnalysis] = useState('');
  const [aiLoading, setAiLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);

  // Get weakest 3 areas
  const rankedAreas = areas
    .map(a => ({ ...a, score: scores[a.id] || 0 }))
    .sort((a, b) => a.score - b.score);
  const weakest3 = rankedAreas.slice(0, 3);

  async function downloadPDF() {
    setPdfLoading(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const W = 210;
      const margin = 16;
      const contentW = W - margin * 2;
      let y = 0;

      function addPage() {
        doc.addPage();
        y = 16;
      }

      function checkY(needed: number) {
        if (y + needed > 275) addPage();
      }

      // Header banner
      doc.setFillColor(37, 99, 235);
      doc.rect(0, 0, W, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('R360 Revenue Leakage Score Report', margin, 18);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`riverr360.com  |  ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, margin, 28);
      doc.text(`Prepared for: ${name}`, margin, 35);
      y = 50;

      // Score summary box
      const bandColors: Record<string, [number, number, number]> = {
        Critical: [254, 242, 242],
        'High Risk': [255, 247, 237],
        Moderate: [254, 252, 232],
        Good: [240, 253, 244],
        Excellent: [239, 246, 255],
      };
      const bgColor = bandColors[band.label] || [239, 246, 255];
      doc.setFillColor(...bgColor);
      doc.roundedRect(margin, y, contentW, 30, 4, 4, 'F');
      doc.setTextColor(17, 24, 39);
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text(`${total}/100`, margin + 8, y + 18);
      doc.setFontSize(14);
      doc.text(band.label, margin + 45, y + 14);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(75, 85, 99);
      const msgLines = doc.splitTextToSize(band.message, contentW - 55);
      doc.text(msgLines, margin + 45, y + 21);
      y += 38;

      // AI Analysis
      if (aiAnalysis) {
        checkY(20);
        doc.setFillColor(243, 244, 246);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(37, 99, 235);
        doc.text('AI-POWERED ANALYSIS', margin, y);
        y += 6;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(55, 65, 81);
        doc.setFontSize(9);
        const aiLines = doc.splitTextToSize(aiAnalysis, contentW);
        checkY(aiLines.length * 5 + 4);
        doc.setFillColor(249, 250, 251);
        doc.roundedRect(margin, y, contentW, aiLines.length * 5 + 6, 3, 3, 'F');
        doc.text(aiLines, margin + 3, y + 5);
        y += aiLines.length * 5 + 12;
      }

      // Score breakdown
      checkY(20);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(17, 24, 39);
      doc.text('Score Breakdown by Area', margin, y);
      y += 7;

      areas.forEach(area => {
        checkY(22);
        const score = scores[area.id] || 0;
        const areaChecked = checkedData[area.id] || [];
        const passed = areaChecked.filter(Boolean).length;
        const failed = 7 - passed;

        doc.setFillColor(249, 250, 251);
        doc.roundedRect(margin, y, contentW, 18, 3, 3, 'F');

        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(17, 24, 39);
        doc.text(`${area.title}`, margin + 4, y + 7);

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(107, 114, 128);
        doc.text(`${area.layer}  |  ${passed} passed · ${failed} failed`, margin + 4, y + 13);

        // Score text
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(37, 99, 235);
        doc.setFontSize(11);
        doc.text(`${score}/14`, W - margin - 16, y + 9);

        // Progress bar background
        const barX = margin + 4;
        const barY = y + 15.5;
        const barW = contentW - 25;
        doc.setFillColor(229, 231, 235);
        doc.roundedRect(barX, barY, barW, 2, 1, 1, 'F');

        // Progress bar fill
        const pct = score / 14;
        const fillColor: [number, number, number] = score <= 4 ? [239, 68, 68] : score <= 7 ? [249, 115, 22] : score <= 10 ? [234, 179, 8] : [34, 197, 94];
        doc.setFillColor(...fillColor);
        doc.roundedRect(barX, barY, barW * pct, 2, 1, 1, 'F');

        y += 22;
      });

      // Top 3 priority fixes
      y += 4;
      checkY(20);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(17, 24, 39);
      doc.text('Top 3 Priority Fixes & Solutions', margin, y);
      y += 7;

      weakest3.forEach((area, i) => {
        checkY(16);
        doc.setFillColor(239, 246, 255);
        doc.roundedRect(margin, y, contentW, 10, 3, 3, 'F');
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(37, 99, 235);
        doc.text(`${i + 1}. ${area.title}  —  Score: ${area.score}/14`, margin + 4, y + 7);
        y += 13;

        area.solutions.forEach((sol, j) => {
          const solLines = doc.splitTextToSize(`${j + 1}. ${sol}`, contentW - 6);
          checkY(solLines.length * 5 + 2);
          doc.setFontSize(8.5);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(55, 65, 81);
          doc.text(solLines, margin + 4, y);
          y += solLines.length * 5 + 2;
        });
        y += 5;
      });

      // Footer on all pages
      const pageCount = doc.getNumberOfPages();
      for (let p = 1; p <= pageCount; p++) {
        doc.setPage(p);
        doc.setFillColor(37, 99, 235);
        doc.rect(0, 285, W, 12, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text('Riverr360 Consulting  |  riverr360.com  |  R360 Revenue Leakage Framework', margin, 292);
        doc.text(`Page ${p} of ${pageCount}`, W - margin - 20, 292);
      }

      doc.save(`R360-Revenue-Leakage-Score-${name.replace(/\s+/g, '-')}.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
      alert('Could not generate PDF. Please try printing the page instead.');
    } finally {
      setPdfLoading(false);
    }
  }

  useEffect(() => {
    async function getAIAnalysis() {
      try {
        const scoreSummary = areas.map(a => `${a.title}: ${scores[a.id] || 0}/14`).join(', ');
        const failedItems = areas.flatMap(a =>
          a.items.filter((_, idx) => !checkedData[a.id]?.[idx]).map(item => `[${a.title}] ${item}`)
        ).slice(0, 15).join('\n');

        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [{
              role: 'user',
              content: `You are a revenue leakage consultant analysing a business's R360 Revenue Leakage Score results.

Business: ${name}
Total Score: ${total}/100 (${band.label})
Area Scores: ${scoreSummary}

Top Failed Checkpoints:
${failedItems}

Write a concise, personalised 3-paragraph analysis (150-200 words total):
1. What the score reveals about the business's current state
2. The single most critical leakage area and its likely business impact
3. The fastest path to recovery and what to prioritise first

Be specific, direct, and actionable. Do not use bullet points. Write in second person ("your business"). Do not mention being an AI.`
            }]
          })
        });
        const data = await res.json();
        const text = data.content?.[0]?.text || '';
        setAiAnalysis(text);
      } catch {
        setAiAnalysis('Based on your score, your business has identifiable revenue leakage across multiple areas. The combination of your lowest-scoring areas suggests systemic gaps that are compounding your costs. Addressing the top 2-3 areas identified below will have the most immediate impact on your revenue efficiency.');
      } finally {
        setAiLoading(false);
      }
    }
    getAIAnalysis();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Back to Home</Link>
            <div className="text-base font-bold text-primary-600">Revenue Leakage Score Report</div>
            <button
              onClick={downloadPDF}
              disabled={pdfLoading || aiLoading}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all"
            >
              {pdfLoading ? (
                <><span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Generating...</>
              ) : (
                <>⬇ Download PDF</>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-4xl py-10 space-y-6">

        {/* Score hero */}
        <div className={`rounded-2xl border-2 ${band.border} ${band.bg} p-8 text-center`}>
          <p className="text-gray-600 mb-2 text-sm">Hi {name}, your Revenue Leakage Score is</p>
          <div className={`text-7xl font-bold ${band.color} mb-2`}>{total}<span className="text-3xl text-gray-400">/100</span></div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg ${band.color} mb-4`}>
            {band.emoji} {band.label}
          </div>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm leading-relaxed">{band.message}</p>
          <button
            onClick={downloadPDF}
            disabled={pdfLoading || aiLoading}
            className="mt-5 inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md"
          >
            {pdfLoading ? (
              <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Generating PDF...</>
            ) : (
              <>⬇ Download Full Report as PDF</>
            )}
          </button>
          {aiLoading && <p className="text-xs text-gray-400 mt-2">PDF available after AI analysis completes</p>}
        </div>

        {/* AI Analysis */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">AI</div>
            <h2 className="font-bold text-gray-900">AI-Powered Analysis</h2>
            {aiLoading && <span className="text-xs text-gray-400 animate-pulse">Analysing your results...</span>}
          </div>
          {aiLoading ? (
            <div className="space-y-2">
              {[80, 95, 70].map((w, i) => (
                <div key={i} className={`h-4 bg-gray-100 rounded animate-pulse`} style={{ width: `${w}%` }}></div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 leading-relaxed text-sm">{aiAnalysis}</p>
          )}
        </div>

        {/* Area breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-5">Score Breakdown by Area</h2>
          <div className="space-y-5">
            {areas.map((area, i) => {
              const score = scores[area.id] || 0;
              const pct = (score / 14) * 100;
              const barColor = score <= 4 ? 'bg-red-500' : score <= 7 ? 'bg-orange-400' : score <= 10 ? 'bg-yellow-400' : 'bg-green-500';
              const areaChecked = checkedData[area.id] || [];
              const passed = area.items.filter((_, idx) => areaChecked[idx]).length;
              const failed = area.items.length - passed;

              return (
                <div key={i} className="border border-gray-100 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{area.icon}</span>
                      <div>
                        <div className="text-xs text-gray-400">{area.layer}</div>
                        <div className="font-semibold text-gray-900 text-sm">{area.title}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{score}/14</div>
                      <div className="text-xs text-gray-400">{passed} passed · {failed} failed</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                    <div className={`${barColor} h-2.5 rounded-full`} style={{ width: `${pct}%` }}></div>
                  </div>

                  {/* Passed / Failed checkpoints */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-2">✅ Passed</p>
                      <div className="space-y-1">
                        {area.items.map((item, idx) => areaChecked[idx] ? (
                          <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                            <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>
                            <span>{item}</span>
                          </div>
                        ) : null)}
                        {area.items.filter((_, idx) => areaChecked[idx]).length === 0 && (
                          <p className="text-xs text-gray-400 italic">None passed</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">❌ Not in Place</p>
                      <div className="space-y-1">
                        {area.items.map((item, idx) => !areaChecked[idx] ? (
                          <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                            <span className="text-red-400 flex-shrink-0 mt-0.5">✗</span>
                            <span>{item}</span>
                          </div>
                        ) : null)}
                        {area.items.filter((_, idx) => !areaChecked[idx]).length === 0 && (
                          <p className="text-xs text-green-500 italic font-medium">All checkpoints passed! 🎉</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 3 priority fixes with solutions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-2">Top 3 Priority Fixes</h2>
          <p className="text-gray-500 text-sm mb-5">Based on your lowest scoring areas — fix these first for the fastest revenue recovery.</p>
          <div className="space-y-5">
            {weakest3.map((area, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
                  <span className="text-xl">{area.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{area.title}</div>
                    <div className="text-xs text-red-500 font-bold">Score: {area.score}/14</div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-primary-600 uppercase tracking-wide mb-2">Recommended Solutions</p>
                  <div className="space-y-2">
                    {area.solutions.map((sol, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-gray-700 bg-primary-50 rounded-lg p-3">
                        <span className="text-primary-500 font-bold flex-shrink-0 mt-0.5">{j + 1}.</span>
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary-600 to-purple-700 text-white rounded-2xl p-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🎯 Next Step
          </div>
          <h2 className="text-3xl font-bold mb-3">Get Your Free 30-Min Preliminary Audit</h2>
          <p className="text-white/90 mb-2 max-w-2xl mx-auto">
            Your score reveals where the leaks are. A 30-minute call with our team will show you exactly how much revenue you are losing — and the fastest way to recover it.
          </p>
          <p className="text-white/70 text-sm mb-8">We will review your score together, diagnose root causes, and give you a prioritised action plan — completely free.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://calendar.app.google/JMgapqTEJMGsDCzu7" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-white text-primary-700 font-bold px-10 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg">
              Book Free 30-Min Audit →
            </a>
            <Link href="/framework"
              className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/20 transition-all">
              Learn About Full R360 Audit
            </Link>
          </div>
          <p className="text-white/60 text-xs mt-4">Limited slots available each week</p>
        </div>

        <div className="text-center">
          <Link href="/score" className="text-primary-600 text-sm font-semibold hover:text-primary-700">← Retake the Score Tool</Link>
        </div>
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Generating your AI-powered report...</p>
        </div>
      </div>
    }>
      <ReportContent />
    </Suspense>
  );
}
