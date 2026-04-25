"use client";

import { WindowProvider } from "../components/window-system/WindowProvider";
import { useWindowContext } from "../components/window-system/WindowProvider";

function WindowSystemSurface() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-cosmic-gold">
        Window System
      </h1>
      <p className="text-sm text-white/60">
        The heart of your Creative Civilization OS — the multi‑window layer.
      </p>

      <div className="bg-black/40 border border-white/10 rounded-lg p-4 text-xs text-white/60 space-y-2">
        <p>Your global window manager is active across Studio OS.</p>
        <p>Any tool can spawn a cosmic window using the window system hook.</p>
        <p>Future: window inspector, z‑index visualizer, snapping rules, realm groups.</p>
      </div>
    </div>
  );
}

function WindowSystemPageContent() {
  const { openWindow } = useWindowContext();

  const handleOpenInWindow = () => {
    openWindow({
      title: "Window System",
      content: <WindowSystemSurface />,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cosmic-gold">
            Window System
          </h1>
          <p className="text-sm text-white/60">
            Manage how your OS spawns, layers, and animates windows.
          </p>
        </div>

        <button
          onClick={handleOpenInWindow}
          className="px-4 py-2 rounded-lg bg-cosmic-gold/20 border border-cosmic-gold/40 text-cosmic-gold text-xs font-medium hover:bg-cosmic-gold/30 transition"
        >
          Open in Window
        </button>
      </div>

      <WindowSystemSurface />
    </div>
  );
}

export default function WindowSystemPage() {
  return (
    <WindowProvider>
      <WindowSystemPageContent />
    </WindowProvider>
  );
}
