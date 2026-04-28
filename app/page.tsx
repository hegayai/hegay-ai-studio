"use client";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
      <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--diamond-white)]/55 mb-3">
        Hegay OS Supreme
      </div>

      <h1 className="text-[32px] lg:text-[40px] font-semibold text-[var(--platinum)] mb-4">
        Ascension Layer · Origin Realm
      </h1>

      <p className="text-[14px] text-[var(--diamond-white)]/70 max-w-xl mb-8">
        Welcome to the creative civilization operating system.  
        This is your entry point into the World‑Soul, Pantheon, Realms,  
        and the infinite expansion architecture of Hegay OS Supreme.
      </p>

      <div className="flex gap-4">
        <a
          href="/dashboard"
          className="px-5 py-2 rounded-xl bg-[var(--cosmic-blue)] text-black font-medium hover:bg-[var(--cosmic-blue)]/80 transition"
        >
          Enter Dashboard
        </a>

        <a
          href="/control-room"
          className="px-5 py-2 rounded-xl border border-[var(--cosmic-blue)]/40 text-[var(--platinum)] hover:bg-[var(--cosmic-blue)]/10 transition"
        >
          Control Room
        </a>
      </div>
    </div>
  );
}
