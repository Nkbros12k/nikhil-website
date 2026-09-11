import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects as allProjects } from "../data/projects";

const gradientText = {
  backgroundImage: "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

export function CaseStudies({ slugs }: { slugs?: string[] }) {
  const projects = slugs ? allProjects.filter((p) => slugs.includes(p.slug)) : allProjects;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="case-studies" className="relative py-28 px-8 overflow-hidden scroll-mt-16">
      {/* Glow */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[420px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(95,164,230,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* #9D96E8, not the brand #665DCD: small text on this ground needs 4.5:1. */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 border border-white/10 text-[13px]"
            style={{
              background: "rgba(102,93,205,0.1)",
              color: "#9D96E8",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Case Studies
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
            The Thinking <span style={gradientText}>Behind the Work</span>
          </h2>
          <p
            className="text-[#b0b3b8] max-w-[580px] mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", lineHeight: "28px" }}
          >
            Projects written up the long way: who it was for, what constrained it, and the
            decisions I made and why.
          </p>
        </motion.div>

        {/* Case study grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                to={`/work/${project.slug}`}
                className="group flex flex-col h-full rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5FA4E6]"
                style={{ background: "rgba(255,255,255,0.025)" }}
              >
                {/* Cover: a real screenshot when there is one, never a stock photo. */}
                <div className="relative h-[230px] overflow-hidden" style={{ background: "#191b1f" }}>
                  {project.cover ? (
                    // No fade over real UI: on a light screenshot it reads as a grey smear.
                    <img
                      src={project.cover.src}
                      alt={project.cover.alt}
                      loading="lazy"
                      className="w-full h-full object-cover object-top border-b border-white/8 group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-end p-7">
                      <div className="absolute inset-0 opacity-30" style={{ background: project.accent }} />
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                          `,
                          backgroundSize: "28px 28px",
                        }}
                      />
                      <p
                        className="relative text-white"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 600,
                          fontSize: "22px",
                          lineHeight: 1.3,
                          letterSpacing: "-0.01em",
                          maxWidth: "24ch",
                        }}
                      >
                        {project.line}
                      </p>
                    </div>
                  )}
                  <span
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] text-white border border-white/15"
                    style={{ background: "rgba(0,0,0,0.5)", fontFamily: "Inter, sans-serif" }}
                  >
                    {project.domain}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[project.role, project.year, project.scale].map((chip) => (
                      <span
                        key={chip}
                        className="px-3 py-1 rounded-full text-[12px] text-[#b0b3b8]"
                        style={{ background: "rgba(255,255,255,0.06)", fontFamily: "Inter, sans-serif" }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="text-white mb-2"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "20px" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-[#b0b3b8] mb-6 text-[14px]"
                    style={{ fontFamily: "Inter, sans-serif", lineHeight: "22px" }}
                  >
                    {project.summary}
                  </p>
                  <span
                    className="mt-auto inline-flex items-center gap-1.5 text-[14px] text-[#7DC4F8] group-hover:text-white transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                  >
                    Read case study
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
