import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/* The frame every route shares: ground color, grid overlay, skip link, nav,
   footer. Pages supply only what goes inside <main>. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{ backgroundColor: "#141619", color: "white" }}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded focus:bg-white focus:text-[#141619]"
        >
          Skip to content
        </a>

        {/* Global subtle grid overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10">
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
}
