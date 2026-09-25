import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const stats = [
  { value: "9", label: "Tech Roles" },
  { value: "8K+", label: "Blood Buddy Users" },
  { value: "4", label: "2026 Internships" },
  { value: "UT '29", label: "Austin, TX" },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-28 px-8 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(102,93,205,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[820px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-8 mb-6">
            {/* Headshot, with the same gradient the rest of the page uses as a ring */}
            <div
              className="shrink-0 mx-auto sm:mx-0 rounded-2xl p-[2px]"
              style={{
                background:
                  "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
              }}
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet="/headshot-400.webp 400w, /headshot.webp 800w"
                  sizes="(max-width: 640px) 160px, 200px"
                />
                <img
                  src="/headshot.jpg"
                  srcSet="/headshot-400.jpg 400w, /headshot.jpg 800w"
                  sizes="(max-width: 640px) 160px, 200px"
                  width={200}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  alt="Nikhil Kadiyala"
                  className="block rounded-2xl w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] object-cover"
                />
              </picture>
            </div>

            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 border border-white/10 text-[13px]"
                style={{
                  background: "rgba(102,93,205,0.1)",
                  color: "#9D96E8",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                About Me
              </div>
              <h2
                className="text-white mb-0"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Cybersecurity student, building{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              real things.
            </span>
              </h2>
            </div>
          </div>
          <p
            className="text-[#b0b3b8] mb-5"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", lineHeight: "28px" }}
          >
            Informatics student at UT Austin, majoring in Human-Centered Data Science & Cybersecurity.
            National Cyber Scholar. Ranked in PicoCTF, TryHackMe, and HolidayHack. CyberPatriot State
            Semi-Finalist team captain.
          </p>
          <p
            className="text-[#b0b3b8] mb-10"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", lineHeight: "28px" }}
          >
            Most recently a software engineering intern at BizFirst AI, where I built their self-hosted object storage on MinIO and three MCP tools driving a multi-agent orchestrator. I lead the technical side of a drone computer-vision research team at UT Austin, founded Perspect (an AI that shows every side of a question, top 20 at Claude Hackathon 2026), and am incoming Tech Director for the Sustainable Building Initiative. I work across the full stack and lean hard on my security background.</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="p-4 rounded-xl border border-white/8"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "28px",
                    backgroundImage:
                      "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[#b0b3b8] text-[13px]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
