"use client";

import React from "react";
import { WindowProvider } from "./components/window-system/WindowProvider";

type StudioLayoutProps = {
  children: React.ReactNode;
};

export default function StudioLayout({ children }: StudioLayoutProps) {
  return (
    <WindowProvider>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 glass-panel p-6 border-r border-white/10">
          {/* Add your sidebar content here */}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10">
          {children}
        </main>
      </div>
    </WindowProvider>
  );
}
