'use client';

import { useState, useEffect } from 'react';

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [hasSubscribed, setHasSubscribed] = useState(false);

  useEffect(() => {
    // Check if user already dismissed or subscribed
    const dismissed = localStorage.getItem('newsletter-dismissed');
    const subscribed = localStorage.getItem('newsletter-subscribed');
    
    if (dismissed || subscribed) {
      return; // Don't show popup
    }

    // Timer: Show popup after 3 minutes (180000ms)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 180000); // 3 minutes

    // Exit intent: Show when mouse leaves viewport
    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse is leaving at the top (not bottom/sides)
      if (e.clientY <= 0) {
        setIsVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Send to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'bd8222f1-81ef-4ed7-9182-09c0c52ae333', // Replace with your key
          email: email,
          subject: 'New Newsletter Subscription - Riverr360',
          from_name: 'Newsletter Signup',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setHasSubscribed(true);
        localStorage.setItem('newsletter-subscribed', 'true');
        
        // Close popup after 3 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('newsletter-dismissed', 'true');
  };

  const handleDontShowAgain = () => {
    setIsVisible(false);
    localStorage.setItem('newsletter-dismissed', 'permanent');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full relative animate-fade-in">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          aria-label="Close"
        >
          ×
        </button>

        <div className="p-8">
          {!hasSubscribed ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">📧</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Don't Miss Out!
                </h2>
                <p className="text-gray-600">
                  Get weekly digital marketing tips delivered straight to your inbox.
                  Join 1,000+ marketers growing their ROI.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Subscribing...' : 'Get Free Tips'}
                </button>

                {status === 'error' && (
                  <p className="text-red-600 text-sm text-center">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>

              {/* Benefits */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-600">✓</span>
                  <span>Weekly actionable marketing tips</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-600">✓</span>
                  <span>Exclusive case studies & insights</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-600">✓</span>
                  <span>Unsubscribe anytime</span>
                </div>
              </div>

              {/* Don't show again */}
              <div className="mt-6 text-center">
                <button
                  onClick={handleDontShowAgain}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Don't show this again
                </button>
              </div>
            </>
          ) : (
            // Success message
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                You're In!
              </h2>
              <p className="text-gray-600">
                Check your inbox for a confirmation email.
                We'll send you awesome marketing tips every week!
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
