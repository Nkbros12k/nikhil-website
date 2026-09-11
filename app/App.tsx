import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageShell } from "./components/PageShell";
import { Hero } from "./components/Hero";
import { TrackPicker } from "./components/TrackPicker";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";

/* The general landing page. Role-specific work lives on the track pages
   (/cs, /ux, /consulting, /business); the picker right under the hero is
   the way in. */
export default function App() {
  const { hash } = useLocation();

  // Arriving from another page at /#section: wait a frame for sections to mount.
  useEffect(() => {
    if (!hash) return;
    requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
  }, [hash]);

  return (
    <PageShell>
      <Hero />
      <TrackPicker />
      <About />
      <Experience />
      <Certifications />
      <Contact />
    </PageShell>
  );
}
