"use client";

import { useEffect, useRef } from "react";

const EXAMPLE_URL = "https://pubthis.co/a/01KG7T2B374YN0CGA588R5GRM8";

export function CodeBlock() {
  const chatRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-6 pb-20">
      <style>{`
        .chat-scroll::-webkit-scrollbar { width: 6px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.35); border-radius: 3px; }
        .chat-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.5); }
        .chat-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.35) transparent; }
      `}</style>
      <div className="overflow-hidden rounded-lg border border-border bg-[#0A0A0A]">
        {/* Title bar */}
        <div className="flex items-center border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
          </div>
          <span className="ml-4 font-mono text-xs text-white/40">
            claude code
          </span>
        </div>

        {/* Scrollable chat */}
        <div ref={chatRef} className="chat-scroll h-[420px] overflow-y-auto p-6 font-mono text-sm leading-relaxed">
          {/* User prompt 1 */}
          <div className="mb-6">
            <span className="text-white/40">&gt; </span>
            <span className="text-white">
              Write a quick project status update for the team. Cover what we shipped this week, what&apos;s in progress, and blockers.
            </span>
          </div>

          {/* Claude response 1 — a real work output */}
          <div className="mb-6 space-y-4 text-white/70">
            <p className="text-white/90 font-semibold">
              # Weekly Status — Jan 27–31
            </p>

            <div>
              <p className="text-white/80 font-semibold">Shipped</p>
              <div className="space-y-0.5 mt-1">
                <p>
                  <span className="text-white/50">•</span> User auth flow
                  redesign — login, signup, and password reset all use the new
                  layout. 40% faster load time on mobile.
                </p>
                <p>
                  <span className="text-white/50">•</span> Webhook retry logic
                  — failed deliveries now retry 3x with exponential backoff.
                  Cut dropped events from ~12% to &lt;0.5%.
                </p>
                <p>
                  <span className="text-white/50">•</span> Dashboard CSV export
                  — users can export filtered data from any dashboard view.
                </p>
              </div>
            </div>

            <div>
              <p className="text-white/80 font-semibold">In Progress</p>
              <div className="space-y-0.5 mt-1">
                <p>
                  <span className="text-white/50">•</span> API rate limiting
                  (v2) — new sliding window implementation. On track for
                  Wednesday.
                </p>
                <p>
                  <span className="text-white/50">•</span> Billing migration
                  — Stripe integration tests passing, need QA on edge cases
                  (prorations, plan downgrades).
                </p>
              </div>
            </div>

            <div>
              <p className="text-white/80 font-semibold">Blockers</p>
              <div className="space-y-0.5 mt-1">
                <p>
                  <span className="text-white/50">•</span> Waiting on
                  design sign-off for the settings page rework. Pinged Sarah —
                  should have mocks by Monday.
                </p>
              </div>
            </div>
          </div>

          {/* User prompt 2 */}
          <div className="mb-6">
            <span className="text-white/40">&gt; </span>
            <span className="text-white">
              /pub
            </span>
          </div>

          {/* Claude response 2 — the publish result */}
          <div className="space-y-2 text-white/70">
            <p>
              Published your status update. Here&apos;s the link:
            </p>
            <p>
              <a
                href={EXAMPLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 underline underline-offset-2 hover:text-green-300 transition-colors"
              >
                {EXAMPLE_URL}
              </a>
            </p>
            <p>
              Expires in 7 days. Anyone with the link can view it.
            </p>
          </div>

          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  );
}
