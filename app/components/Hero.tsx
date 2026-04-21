import { motion } from "motion/react";

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero content */}
      <div className="relative z-10 text-center max-w-[700px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            className="mb-6 text-white"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(48px, 8vw, 88px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Hi, I'm{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Nikhil
            </span>
          </h1>

          <div className="mb-10" />

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={scrollToProjects}
              className="relative overflow-hidden px-8 py-4 rounded-[3px] text-white text-[16px] transition-transform hover:scale-105"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                }}
              />
              <span className="relative uppercase tracking-wider">View My Work</span>
            </button>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 rounded-[3px] text-white text-[16px] border border-white/20 hover:border-white/40 transition-colors"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, background: "transparent" }}
            >
              <span className="uppercase tracking-wider">Contact Me</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
