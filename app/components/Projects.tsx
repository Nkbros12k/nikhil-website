import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    title: "Perspect AI",
    desc: "Real-time AI debate engine where expert personas argue any topic, then generate a personalized study guide. Built at the Hooked on Claude Hackathon.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["React", "Express", "Gemini AI", "SSE Streaming"],
    gradient: "linear-gradient(135deg, #665DCD 0%, #5FA4E6 100%)",
    featured: true,
    github: "https://github.com/Nkbros12k/claudehackathon26",
    live: "https://claudehackathon26-six.vercel.app",
  },
  {
    title: "TradBot",
    desc: "Algorithmic trading bot with EMA crossover strategy, ATR-based dynamic exits, live Flask dashboard, Telegram alerts, and IV/volume scanning.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Python", "Flask", "Alpaca API", "Ollama"],
    gradient: "linear-gradient(135deg, #5FA4E6 0%, #D2AB67 100%)",
    featured: true,
    github: "",
    live: "",
  },
  {
    title: "Gravity-Zero",
    desc: "A fully local AI-powered IDE with autonomous 3-node agent pipeline (Planner, Coder, Reviewer) using LM Studio and Monaco Editor.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Python", "FastAPI", "React", "LM Studio"],
    gradient: "linear-gradient(135deg, #D2AB67 0%, #665DCD 100%)",
    featured: false,
    github: "",
    live: "",
  },
  {
    title: "Blood Buddy",
    desc: "Nonprofit platform connecting 8,000+ global blood donors and recipients, matching by location and blood type. Enabled 100+ successful transfers.",
    image:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Full-Stack", "Database", "Nonprofit"],
    gradient: "linear-gradient(135deg, #665DCD 0%, #D2AB67 100%)",
    featured: false,
    github: "",
    live: "",
  },
  {
    title: "DataHack 2026",
    desc: "UT Austin MLDS competition: predicted music streaming skip behavior and optimized customer lifetime value using UMAP clustering and ensemble ML models.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Python", "LightGBM", "CatBoost", "UMAP"],
    gradient: "linear-gradient(135deg, #5FA4E6 0%, #665DCD 100%)",
    featured: false,
    github: "https://github.com/MLDS-UT-Austin/mlds-datahack-2026-akhilkotturi",
    live: "",
  },
  {
    title: "Raspberry Pi Ecosystem",
    desc: "Automated ecosystem integrating a 3D printer, Pi-Hole ad-blocker, and remote access, all controlled via custom Python scripts on a Raspberry Pi.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Raspberry Pi", "Python", "3D Printing", "Networking"],
    gradient: "linear-gradient(135deg, #D2AB67 0%, #5FA4E6 100%)",
    featured: false,
    github: "",
    live: "",
  },
];

function GradientTag({ text }: { text: string }) {
  const colors: Record<string, string> = {
    React: "rgba(102,93,205,0.15)",
    "Node.js": "rgba(95,164,230,0.15)",
    MongoDB: "rgba(210,171,103,0.15)",
    TypeScript: "rgba(102,93,205,0.15)",
    "Next.js": "rgba(95,164,230,0.15)",
    PostgreSQL: "rgba(210,171,103,0.15)",
    Python: "rgba(95,164,230,0.15)",
    Vue: "rgba(102,93,205,0.15)",
  };
  const textColors: Record<string, string> = {
    React: "#9D96E8",
    "Node.js": "#7DC4F8",
    MongoDB: "#E0C47A",
    TypeScript: "#9D96E8",
    "Next.js": "#7DC4F8",
    PostgreSQL: "#E0C47A",
    Python: "#7DC4F8",
    Vue: "#9D96E8",
  };
  const bg = colors[text] || "rgba(255,255,255,0.06)";
  const color = textColors[text] || "#b0b3b8";

  return (
    <span
      className="px-3 py-1 rounded-full text-[12px]"
      style={{ fontFamily: "Inter, sans-serif", background: bg, color }}
    >
      {text}
    </span>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      className="relative py-28 px-8 overflow-hidden"
      style={{ background: "rgba(0,0,0,0.2)" }}
    >
      {/* Glow */}
      <div
        className="absolute left-0 bottom-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(210,171,103,0.07) 0%, transparent 70%)",
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
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 border border-white/10 text-[13px]"
            style={{
              background: "rgba(102,93,205,0.1)",
              color: "#665DCD",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Featured Work
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
            Projects That{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Make an Impact
            </span>
          </h2>
          <p
            className="text-[#b0b3b8] max-w-[540px] mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", lineHeight: "28px" }}
          >
            A curated selection of projects showcasing my skills in design, development, and
            problem-solving.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden border border-white/8 hover:border-white/16 transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.025)" }}
            >
              {/* Image */}
              <div className="relative h-[220px] overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 opacity-60"
                  style={{ background: project.gradient }}
                />
                {/* Links */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20"
                      style={{ background: "rgba(0,0,0,0.5)" }}
                    >
                      <Github size={15} color="white" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20"
                      style={{ background: "rgba(0,0,0,0.5)" }}
                    >
                      <ExternalLink size={15} color="white" />
                    </a>
                  )}
                </div>
                {project.featured && (
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(102,93,205,0.9), rgba(95,164,230,0.9))",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-white mb-2"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "20px" }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-[#b0b3b8] mb-4 text-[14px]"
                  style={{ fontFamily: "Inter, sans-serif", lineHeight: "22px" }}
                >
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <GradientTag key={tag} text={tag} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Nkbros12k"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/15 text-[#b0b3b8] hover:text-white hover:border-white/30 transition-all text-[15px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Github size={16} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
