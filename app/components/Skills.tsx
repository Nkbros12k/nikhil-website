import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Code2, Server, Shield, Database, Cpu, BrainCircuit } from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    subtitle: "Building end-to-end applications",
    desc: "Experienced with React, Next.js, TypeScript, and Tailwind on the frontend. Python, FastAPI, Express, and Node.js on the backend. Comfortable shipping production apps.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    gradient: "linear-gradient(135deg, #665DCD, #5FA4E6)",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    subtitle: "National Cyber Scholar & GIAC Certified",
    desc: "SANS Foundations + GIAC certification. Ranked in PicoCTF, TryHackMe, and HolidayHack CTF competitions. Trained in digital forensics and ethical hacking at UT Austin TACC GenCyber.",
    tags: ["Ethical Hacking", "OSINT", "Pen Testing", "CTFs"],
    gradient: "linear-gradient(135deg, #5FA4E6, #D2AB67)",
  },
  {
    icon: BrainCircuit,
    title: "AI & Machine Learning",
    subtitle: "From ML models to AI-powered apps",
    desc: "Built ML-based object recognition apps, AI debate engines with real-time streaming, and local AI IDE agents. Experience with Google Gemini, LLM APIs, and data pipelines.",
    tags: ["Python", "Gemini API", "LLMs", "Teachable Machine"],
    gradient: "linear-gradient(135deg, #D2AB67, #665DCD)",
  },
  {
    icon: Database,
    title: "Data Science",
    subtitle: "Turning data into insights",
    desc: "Competed in UT Austin's MLDS DataHack. Experienced with UMAP, clustering, LightGBM, CatBoost, and Bayesian methods for predictive modeling and user segmentation.",
    tags: ["Pandas", "scikit-learn", "LightGBM", "CatBoost"],
    gradient: "linear-gradient(135deg, #665DCD, #D2AB67)",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    subtitle: "Scalable server-side systems",
    desc: "Built trading bots with real-time dashboards, SSE streaming backends, and REST APIs. Experience with Flask, FastAPI, Express, Supabase, and PostgreSQL.",
    tags: ["Python", "FastAPI", "Express", "Supabase"],
    gradient: "linear-gradient(135deg, #5FA4E6, #665DCD)",
  },
  {
    icon: Cpu,
    title: "Hardware & IoT",
    subtitle: "Physical computing and automation",
    desc: "Engineered a Raspberry Pi ecosystem automating 3D printing, network-wide ad blocking, and remote access. Certified in Autodesk Inventor for 3D design.",
    tags: ["Raspberry Pi", "3D Printing", "Autodesk Inventor", "Python"],
    gradient: "linear-gradient(135deg, #D2AB67, #5FA4E6)",
  },
];

const techStack = [
  "Python", "Java", "TypeScript", "React", "Next.js", "Tailwind CSS",
  "FastAPI", "Express", "Supabase", "PostgreSQL", "Raspberry Pi", "Lua",
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-28 px-8 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[300px] pointer-events-none"
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
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 border border-white/10 text-[13px]"
            style={{
              background: "rgba(102,93,205,0.1)",
              color: "#665DCD",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Skills & Expertise
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
            What I{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Bring to the Table
            </span>
          </h2>
          <p
            className="text-[#b0b3b8] max-w-[540px] mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", lineHeight: "28px" }}
          >
            I specialize in modern web technologies and frameworks, creating scalable and performant
            applications from concept to deployment.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-6 rounded-2xl border border-white/8 hover:border-white/16 transition-all duration-300 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.025)" }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top left, ${
                    skill.gradient.includes("665DCD")
                      ? "rgba(102,93,205,0.08)"
                      : "rgba(95,164,230,0.08)"
                  } 0%, transparent 60%)`,
                }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative"
                style={{ background: skill.gradient }}
              >
                <skill.icon size={22} color="white" />
              </div>

              <h3
                className="text-white mb-1"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "18px" }}
              >
                {skill.title}
              </h3>
              <p
                className="mb-3"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  backgroundImage:
                    "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {skill.subtitle}
              </p>
              <p
                className="text-[#b0b3b8] mb-5 text-[14px]"
                style={{ fontFamily: "Inter, sans-serif", lineHeight: "22px" }}
              >
                {skill.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md text-[12px] border border-white/8"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      background: "rgba(255,255,255,0.04)",
                      color: "#b0b3b8",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative overflow-hidden"
        >
          <div
            className="text-center mb-5 text-[13px] tracking-widest uppercase"
            style={{ fontFamily: "Inter, sans-serif", color: "#555" }}
          >
            Tech I work with
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            {techStack.map((tech) => (
              <div
                key={tech}
                className="px-5 py-2 rounded-full border border-white/10 text-[14px]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#b0b3b8",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
