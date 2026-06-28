'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// Metadata can't be exported from 'use client' — add this to a separate
// app/ai-audit/layout.tsx or use generateMetadata in a server wrapper.
// For now metadata is handled via the layout approach below.

type Message = { role: 'user' | 'assistant'; content: string };
type Phase = 'intro' | 'chat' | 'capture' | 'done';

const OPENING_MESSAGE = "Hi! I'm Intellect, Riverr360's AI marketing consultant. I'm here to help you identify where your business might be losing revenue. To get started — what does your business do, and what's your biggest marketing frustration right now?";

export default function AIAuditPage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [lead, setLead] = useState({ name: '', email: '', phone: '' });
  const [capturing, setCapturing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function startChat() {
    setMessages([{ role: 'assistant', content: OPENING_MESSAGE }]);
    setPhase('chat');
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    const count = messageCount + 1;
    setMessageCount(count);
    try {
      const res = await fetch('/api/intellect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })), messageCount: count }),
      });
      const data = await res.json();
      const reply = data.message || "I'm sorry, something went wrong. Could you try again?";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      if (count >= 5) setTimeout(() => setPhase('capture'), 800);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCapture(e: React.FormEvent) {
    e.preventDefault();
    if (!lead.name || !lead.email || !lead.phone) return;
    setCapturing(true);
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'bd8222f1-81ef-4ed7-9182-09c0c52ae333',
          subject: `New Intellect AI Chat Lead — ${lead.name}`,
          from_name: lead.name,
          Name: lead.name, Email: lead.email, Phone: lead.phone,
          Source: 'AI Audit — Talk to Intellect',
          Conversation: messages.map(m => `${m.role === 'user' ? 'Visitor' : 'Intellect'}: ${m.content}`).join('\n\n'),
        }),
      });
    } catch { /* silent */ }
    setSubmitted(true);
    setCapturing(false);
    setPhase('done');
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 60%, #f5f3ff 100%)' }}>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 flex-shrink-0">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/"><img src="/images/logo.png" alt="Riverr360" className="h-8 w-auto" width={120} height={32} /></Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-gray-700">Talk to Intellect</span>
            <span className="text-xs text-gray-400 hidden sm:inline">· AI Marketing Consultant</span>
          </div>
        </div>
      </header>

      {/* H1 visible to crawlers even on intro screen */}
      <h1 className="sr-only">Free AI Marketing Audit — Talk to Intellect by Riverr360</h1>

      <main className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 py-6">

        {phase === 'intro' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">🧠</div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
            </div>
            {/* Visible h2 so heading hierarchy is h1 (sr-only) → h2 */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Talk to Intellect</h2>
            <p className="text-gray-500 mb-2 max-w-md">Riverr360's AI marketing consultant. Tell me about your business and I'll identify where your revenue might be leaking.</p>
            <p className="text-xs text-gray-400 mb-8">Powered by R360 Revenue Leakage Framework</p>
            <div className="grid grid-cols-3 gap-3 mb-8 w-full max-w-sm">
              {[
                { icon: '💬', label: 'Natural chat', sub: 'Just talk freely' },
                { icon: '🧠', label: 'AI powered', sub: 'Instant insights' },
                { icon: '🎯', label: 'Personalised', sub: 'Your situation' },
              ].map(({ icon, label, sub }) => (
                <div key={label} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm text-center">
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-xs font-semibold text-gray-900">{label}</div>
                  <div className="text-xs text-gray-400">{sub}</div>
                </div>
              ))}
            </div>
            <button onClick={startChat} className="btn-primary px-10 py-4 text-base rounded-xl shadow-md">
              Start Chatting with Intellect →
            </button>
            <p className="text-xs text-gray-400 mt-3">Free · No sign-up · Instant response</p>
          </div>
        )}

        {(phase === 'chat' || phase === 'capture' || phase === 'done') && (
          <div className="flex-1 flex flex-col">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 p-4 flex items-center gap-3 flex-shrink-0">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center text-xl">🧠</div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Intellect</p>
                <p className="text-xs text-green-500 font-medium">Online · Riverr360 AI Consultant</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1" style={{ maxHeight: 'calc(100vh - 340px)', minHeight: 300 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.role === 'assistant' && <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center text-sm flex-shrink-0 mt-1">🧠</div>}
                  {msg.role === 'user' && <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-sm flex-shrink-0 mt-1">👤</div>}
                  <div className={`max-w-xs sm:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-tl-sm' : 'bg-primary-600 text-white rounded-tr-sm'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center text-sm flex-shrink-0">🧠</div>
                  <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1 items-center h-4">
                      {[0,1,2].map(i => <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {phase === 'capture' && !submitted && (
              <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5 mb-4 flex-shrink-0">
                <p className="text-sm font-semibold text-gray-900 mb-1">Based on our conversation, I've identified some key insights for you.</p>
                <p className="text-xs text-gray-500 mb-4">Share your details to save this conversation and get your personalised follow-up.</p>
                <form onSubmit={handleCapture} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { name: 'name', placeholder: 'Your name', type: 'text' },
                      { name: 'email', placeholder: 'Email address', type: 'email' },
                      { name: 'phone', placeholder: 'Phone number', type: 'tel' },
                    ].map(f => (
                      <input key={f.name} type={f.type} placeholder={f.placeholder} required
                        value={lead[f.name as keyof typeof lead]}
                        onChange={e => setLead(l => ({ ...l, [f.name]: e.target.value }))} />
                    ))}
                  </div>
                  <button type="submit" disabled={capturing} className="btn-primary w-full py-3 rounded-xl text-sm">
                    {capturing ? 'Saving...' : 'Save & Continue →'}
                  </button>
                </form>
              </div>
            )}

            {phase === 'done' && (
              <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 flex-shrink-0 shadow-sm">
                <p className="text-sm font-bold text-gray-900 mb-1">✅ Thanks, {lead.name.split(' ')[0]}! What's next?</p>
                <p className="text-xs text-gray-500 mb-4">Ready to go deeper? Choose your next step:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link href="/score" className="flex items-start gap-3 bg-primary-50 border border-primary-100 rounded-xl p-4 hover:bg-primary-100 transition-colors">
                    <span className="text-xl">📊</span>
                    <div>
                      <p className="text-sm font-bold text-primary-700">Get Full R360 Score</p>
                      <p className="text-xs text-gray-500">Detailed score + full report</p>
                    </div>
                  </Link>
                  <Link href="/book" className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                    <span className="text-xl">📅</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Book a Strategy Call</p>
                      <p className="text-xs text-gray-500">30 min · Free · Google Meet</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {phase === 'chat' && (
              <div className="flex gap-3 flex-shrink-0">
                <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Type your message..." disabled={loading}
                  className="flex-1" style={{ borderRadius: '0.75rem' }} />
                <button onClick={sendMessage} disabled={loading || !input.trim()}
                  className="flex-shrink-0 w-12 h-12 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-200 text-white rounded-xl flex items-center justify-center transition-colors"
                  style={{ border: 'none', cursor: loading || !input.trim() ? 'default' : 'pointer' }} aria-label="Send message">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            )}
            <p className="text-xs text-gray-400 text-center mt-3">Powered by Riverr360 · R360 Revenue Leakage Framework</p>
          </div>
        )}
      </main>
    </div>
  );
}
