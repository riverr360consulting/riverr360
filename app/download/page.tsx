'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function DownloadContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const orderId = searchParams.get('order_id');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful! 🎉</h1>
        <p className="text-xl text-gray-600 mb-8">Your e-book is ready to download.</p>

        {paymentId && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Payment Details:</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Payment ID:</span>
                <span className="font-mono text-xs">{paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-semibold text-green-600">₹250</span>
              </div>
            </div>
          </div>
        )}

        <a
          href="/ebooks/flower-shop-seo-methods.pdf"
          download
          className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xl font-bold px-12 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all mb-6"
        >
          📥 Download Your E-book Now
        </a>

        <p className="text-sm text-gray-500 mb-8">A copy has also been sent to your email</p>

        <div className="bg-blue-50 rounded-lg p-6 text-left">
          <h3 className="font-bold text-gray-900 mb-4">What's Next?</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Download and save the PDF</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Start with Method 1 (Google Business Profile)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Implement one method per week</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 pt-8 border-t">
          <h3 className="font-semibold text-gray-900 mb-4">Need Help Implementing?</h3>
          <Link href="/contact" className="inline-block bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-600 font-semibold px-8 py-3 rounded-lg transition-colors">
            Get Professional Help
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <DownloadContent />
    </Suspense>
  );
}
