'use client';

import { useState, useEffect } from 'react';

type ConsentState = {
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = 'riverr360_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    } else {
      applyConsent(JSON.parse(stored));
    }
  }, []);

  function applyConsent(state: ConsentState & { necessary: boolean }) {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'cookie_consent_update',
        analytics_storage: state.analytics ? 'granted' : 'denied',
        ad_storage: state.marketing ? 'granted' : 'denied',
      });
    }
  }

  function saveAndClose(state: ConsentState) {
    const full = { necessary: true, ...state };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(full));
    applyConsent(full);
    setVisible(false);
  }

  function acceptAll() { saveAndClose({ analytics: true, marketing: true }); }
  function rejectAll() { saveAndClose({ analytics: false, marketing: false }); }
  function saveCustom() { saveAndClose(consent); }

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes cc-slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
        .cc-banner { animation: cc-slideUp 0.35s cubic-bezier(0.22,1,0.36,1) both; }
        .cc-toggle input:checked + .cc-track { background: #1d4ed8; }
        .cc-toggle input:checked + .cc-track .cc-thumb { transform: translateX(20px); }
        .cc-track {
          width: 44px; height: 24px; border-radius: 12px;
          background: #cbd5e1; position: relative;
          transition: background 0.2s; cursor: pointer; flex-shrink: 0;
        }
        .cc-thumb {
          position: absolute; top: 3px; left: 3px;
          width: 18px; height: 18px; border-radius: 50%;
          background: #fff; transition: transform 0.2s;
        }
        .cc-toggle input { position: absolute; opacity: 0; width: 0; height: 0; }
        .cc-btn-primary {
          background: #1d4ed8; color: #fff; border: none;
          padding: 10px 22px; border-radius: 6px; font-size: 14px;
          font-weight: 600; cursor: pointer; transition: background 0.15s;
          white-space: nowrap;
        }
        .cc-btn-primary:hover { background: #1e40af; }
        .cc-btn-ghost {
          background: transparent; color: #64748b;
          border: 1px solid #e2e8f0; padding: 10px 22px;
          border-radius: 6px; font-size: 14px; font-weight: 500;
          cursor: pointer; transition: border-color 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .cc-btn-ghost:hover { border-color: #94a3b8; color: #334155; }
        .cc-btn-link {
          background: none; border: none; padding: 0;
          color: #1d4ed8; font-size: 13px; cursor: pointer;
          text-decoration: underline; text-underline-offset: 3px;
        }
        .cc-btn-link:hover { color: #1e40af; }
        .cc-row {
          display: flex; align-items: flex-start; gap: 12px;
          justify-content: space-between; padding: 10px 0;
          border-top: 1px solid #f1f5f9;
        }
        .cc-pill {
          font-size: 11px; font-weight: 600; background: #eff6ff;
          color: #1d4ed8; padding: 2px 8px; border-radius: 99px;
          flex-shrink: 0; margin-top: 2px;
        }
      `}</style>

      <div
        className="cc-banner"
        role="dialog"
        aria-modal="true"
        aria-label="Cookie consent"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
          background: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.07)',
          fontFamily: 'Inter, system-ui, sans-serif',
          color: '#1e293b',
          padding: '20px 24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="#1d4ed8" strokeWidth="1.5"/>
              <circle cx="12" cy="8" r="1" fill="#1d4ed8"/>
              <path d="M12 11v5" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>
              We use cookies
            </span>
          </div>
          <button
            onClick={rejectAll}
            aria-label="Close and reject optional cookies"
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '2px 4px' }}
          >
            ✕
          </button>
        </div>

        <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: '0 0 14px', maxWidth: 680 }}>
          Riverr360 uses cookies to analyse site traffic (Google Analytics / GTM) and deliver relevant ads
          (Meta Pixel). You can choose which cookies to allow. Strictly necessary cookies are always active.{' '}
          <a href="/privacy-policy" style={{ color: '#1d4ed8', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Privacy Policy
          </a>
        </p>

        {showDetails && (
          <div style={{ marginBottom: 14, borderRadius: 8, border: '1px solid #e2e8f0', padding: '4px 12px', background: '#fafafa' }}>
            <div className="cc-row">
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#0f172a' }}>Strictly necessary</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>Required for the site to function. Cannot be disabled.</p>
              </div>
              <span className="cc-pill">Always on</span>
            </div>
            <div className="cc-row">
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#0f172a' }}>Analytics</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>Google Analytics & GTM — helps us understand how visitors use the site.</p>
              </div>
              <label className="cc-toggle" style={{ position: 'relative', display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <input type="checkbox" checked={consent.analytics} onChange={e => setConsent(c => ({ ...c, analytics: e.target.checked }))} aria-label="Analytics cookies" />
                <div className="cc-track"><div className="cc-thumb" /></div>
              </label>
            </div>
            <div className="cc-row">
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#0f172a' }}>Marketing</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>Meta Pixel — used to show relevant ads and measure ad performance.</p>
              </div>
              <label className="cc-toggle" style={{ position: 'relative', display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <input type="checkbox" checked={consent.marketing} onChange={e => setConsent(c => ({ ...c, marketing: e.target.checked }))} aria-label="Marketing cookies" />
                <div className="cc-track"><div className="cc-thumb" /></div>
              </label>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
          <button className="cc-btn-primary" onClick={acceptAll}>Accept all</button>
          <button className="cc-btn-ghost" onClick={rejectAll}>Reject optional</button>
          {showDetails && <button className="cc-btn-ghost" onClick={saveCustom}>Save my choices</button>}
          <button className="cc-btn-link" onClick={() => setShowDetails(v => !v)}>
            {showDetails ? 'Hide options ↑' : 'Manage cookies ↓'}
          </button>
        </div>
      </div>
    </>
  );
}
