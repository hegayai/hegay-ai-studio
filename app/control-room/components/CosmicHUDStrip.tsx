"use client";

export default function CosmicHUDStrip({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9997] pointer-events-none">
      <div
        className="w-full py-3 text-center text-purple-300 font-semibold tracking-[0.3em] text-sm bg-gradient-to-r from-purple-900/60 via-fuchsia-700/40 to-purple-900/60 backdrop-blur-md border-b border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.4)] animate-hudGlow"
      >
        CONTAINMENT MODE ACTIVE
      </div>

      <style jsx>{`
        @keyframes hudGlow {
          0% {
            opacity: 0.7;
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 40px rgba(168, 85, 247, 0.6);
          }
          100% {
            opacity: 0.7;
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
          }
        }
        .animate-hudGlow {
          animation: hudGlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
