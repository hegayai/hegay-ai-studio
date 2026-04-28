"use client";

import type { ReactNode } from "react";

/* ---------------------------------------------------------
   MOTION AI SUBSCRIBE BUTTON
   --------------------------------------------------------- */
function MotionAISubscribeButton({ plan, label }: { plan: string; label: string }) {
  const handleSubscribe = async () => {
    const res = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Unable to start checkout.");
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      className="
        px-4 py-2 rounded-xl
        bg-[var(--cosmic-blue)] text-black font-medium
        hover:bg-[var(--cosmic-blue)]/80 transition
      "
    >
      {label}
    </button>
  );
}

/* ---------------------------------------------------------
   DASHBOARD SHELL
   --------------------------------------------------------- */
function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col gap-8 px-8 pt-8 pb-10 lg:px-12 lg:pt-10">
      {children}
    </div>
  );
}

/* ---------------------------------------------------------
   HYBRID CINEMATIC HERO
   --------------------------------------------------------- */
function HybridHero() {
  return (
    <section className="
      relative overflow-hidden rounded-3xl
      glass-panel shadow-[0_40px_140px_rgba(0,0,0,0.9)]
    ">
      <div className="absolute inset-0">
        <div className="
          h-full w-full
          bg-[url('/dashboard-hero.jpg')] bg-cover bg-center
          opacity-70
        " />
      </div>

      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-60">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/dashboard-overlay.webm" type="video/webm" />
          <source src="/dashboard-overlay.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="
        absolute inset-0
        bg-gradient-to-r
        from-black/85 via-black/55 to-[var(--deep-purple)]/40
      " />

      <div className="relative z-10 flex flex-col gap-6 px-8 py-10 lg:px-12 lg:py-12">
        <div className="text-xs uppercase tracking-[0.35em] text-[var(--cosmic-blue)]/80">
          Hegay OS · Supreme Dashboard
        </div>

        <div className="max-w-2xl space-y-3">
          <h1 className="text-3xl lg:text-4xl font-semibold text-[var(--platinum)]">
            Orchestrate your entire creative civilization from one living surface.
          </h1>
          <p className="text-sm lg:text-[15px] text-[var(--diamond-white)]/80">
            Realms, studios, rituals, and timelines converge into a single command space—tuned to your Pantheon and World‑Soul.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button className="btn-primary">Open Studio</button>
          <button className="btn-secondary">View Realms</button>
          <button className="
            rounded-full border border-[var(--cosmic-blue)]/40
            bg-black/40 text-[11px] px-3 py-1.5
            text-[var(--platinum)]
            hover:bg-[var(--cosmic-blue)]/10 transition
          ">
            Last session · Restored
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   QUICK ACTIONS
   --------------------------------------------------------- */
function QuickActions() {
  const actions = [
    { label: "New Studio Session", desc: "Start a fresh creative ritual" },
    { label: "Summon Pantheon", desc: "Consult archetypal guidance" },
    { label: "Open Timeline Engine", desc: "Review active storylines" },
    { label: "Universe Builder", desc: "Design new creative worlds" },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {actions.map((a) => (
        <button
          key={a.label}
          className="
            group relative overflow-hidden rounded-2xl
            glass-panel px-4 py-4 text-left
            diamond-hover transition
          "
        >
          <div className="relative z-10 space-y-1.5">
            <div className="text-[13px] font-medium text-[var(--platinum)]">
              {a.label}
            </div>
            <div className="text-[11px] text-[var(--diamond-white)]/70">
              {a.desc}
            </div>
          </div>
        </button>
      ))}
    </section>
  );
}

/* ---------------------------------------------------------
   TOOL GRID
   --------------------------------------------------------- */
function ToolGrid() {
  const tools = [
    { name: "Culture Realm", desc: "Curate, archive, and broadcast cultural signals." },
    { name: "Studio Engine", desc: "Record, mix, and orchestrate creator sessions." },
    { name: "Timeline Engine", desc: "Track arcs, launches, and narrative beats." },
    { name: "Archive Vault", desc: "Preserve masterworks and origin artifacts." },
    { name: "Signal Radio", desc: "Program live and scheduled transmissions." },
    { name: "Creator Atlas", desc: "Map your global creative network." },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tools.map((t) => (
        <div
          key={t.name}
          className="
            group relative overflow-hidden rounded-2xl
            glass-panel px-4 py-4
            hover:border-[var(--cosmic-blue)]/40 transition
          "
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100
            bg-[radial-gradient(circle_at_top,var(--glow-blue),transparent_60%)]
            transition-opacity
          " />
          <div className="relative z-10 space-y-1.5">
            <div className="text-[13px] font-medium text-[var(--platinum)]">
              {t.name}
            </div>
            <div className="text-[11px] text-[var(--diamond-white)]/70">
              {t.desc}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ---------------------------------------------------------
   ACTIVITY FEED
   --------------------------------------------------------- */
function ActivityFeed() {
  const items = [
    { label: "New studio session completed", meta: "NaijaMix Radio · 14 min ago" },
    { label: "Pantheon influence updated", meta: "Aruwa · Memory field tuned" },
    { label: "World‑Soul resonance shift", meta: "Level moved from 1 → 2" },
    { label: "Universe blueprint saved", meta: "Diaspora Storyworld v3" },
  ];

  return (
    <section className="glass-panel px-4 py-4 rounded-2xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[13px] font-medium text-[var(--platinum)]">
          Live Activity
        </div>
        <div className="text-[11px] text-[var(--cosmic-blue)]">
          Synced with rituals & timelines
        </div>
      </div>

      <div className="space-y-2">
        {items.map((i) => (
          <div
            key={i.label}
            className="
              flex flex-col gap-0.5 rounded-xl px-2 py-1.5
              hover:bg-[rgba(255,255,255,0.06)] transition
            "
          >
            <div className="text-[12px] text-[var(--platinum)]">
              {i.label}
            </div>
            <div className="text-[11px] text-[var(--diamond-white)]/70">
              {i.meta}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   PAGE EXPORT
   --------------------------------------------------------- */
export default function Page() {
  return (
    <DashboardShell>
      <HybridHero />
      <QuickActions />

      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <ToolGrid />
        <ActivityFeed />
      </div>

      {/* MOTION AI SUBSCRIPTION SECTION */}
      <section className="glass-panel rounded-2xl px-6 py-6 mt-6 space-y-4">
        <h2 className="text-[15px] font-semibold text-[var(--platinum)]">
          Motion AI Plans
        </h2>

        <div className="flex flex-col gap-3">
          <MotionAISubscribeButton
            plan="motion_basic"
            label="Subscribe to Motion AI Basic (£15/mo)"
          />
          <MotionAISubscribeButton
            plan="motion_pro"
            label="Subscribe to Motion AI Pro (£29/mo)"
          />
          <MotionAISubscribeButton
            plan="motion_creator"
            label="Subscribe to Motion AI Creator (£49/mo)"
          />
          <MotionAISubscribeButton
            plan="motion_studio"
            label="Subscribe to Motion AI Studio (£99/mo)"
          />
        </div>
      </section>
    </DashboardShell>
  );
}
