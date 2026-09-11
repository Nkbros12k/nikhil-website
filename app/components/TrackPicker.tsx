import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Briefcase, Code2, PenTool, TrendingUp } from "lucide-react";
import { tracks, type Track, type TrackSlug } from "../data/tracks";

const gradientText = {
  backgroundImage: "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const icons: Record<TrackSlug, typeof Code2> = {
  cs: Code2,
  ux: PenTool,
  consulting: Briefcase,
  business: TrendingUp,
};

// What the page leads with, so the card says what you will find behind it.
function showcaseChip(track: Track) {
  if (track.showcase === "case-studies") return `${track.caseStudies?.length ?? 0} case studies`;
  if (track.showcase === "projects") return "Projects";
  return `${track.work?.length ?? 0} highlights`;
}

export function TrackPicker() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="explore" className="relative py-28 px-8 overflow-hidden scroll-mt-16">
      {/* Glow */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[420px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(95,164,230,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 border border-white/10 text-[13px]"
            style={{
              background: "rgba(102,93,205,0.1)",
              color: "#9D96E8",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Explore
          </div>
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Explore by <span style={gradientText}>Focus</span>
          </h2>
          <p
            className="text-[#b0b3b8] max-w-[560px] mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", lineHeight: "28px" }}
          >
            One page per kind of role, each with its own work, experience and one-page résumé.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track, i) => {
            const Icon = icons[track.slug];
            return (
              <motion.div
                key={track.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  to={`/${track.slug}`}
                  className="group relative flex flex-col h-full p-8 rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5FA4E6]"
                  style={{ background: "rgba(255,255,255,0.025)" }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ background: "linear-gradient(90deg, #665DCD, #5FA4E6, #D2AB67)" }}
                  />
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: "linear-gradient(135deg, rgba(102,93,205,0.3), rgba(95,164,230,0.3))",
                    }}
                  >
                    <Icon size={22} color="#9D96E8" aria-hidden="true" />
                  </div>
                  <h3
                    className="text-white"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: "24px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {track.title} <span style={gradientText}>{track.titleAccent}</span>
                  </h3>
                  <p
                    className="text-[#b0b3b8] mt-3 text-[15px]"
                    style={{ fontFamily: "Inter, sans-serif", lineHeight: "24px" }}
                  >
                    {track.blurb}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5 mb-6">
                    {[showcaseChip(track), `${track.experience.length} roles`, "Résumé (PDF)"].map((chip) => (
                      <span
                        key={chip}
                        className="px-3 py-1 rounded-full text-[12px] text-[#b0b3b8]"
                        style={{ background: "rgba(255,255,255,0.06)", fontFamily: "Inter, sans-serif" }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <span
                    className="mt-auto inline-flex items-center gap-1.5 text-[14px] text-[#7DC4F8] group-hover:text-white transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                  >
                    Explore {track.label}
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
