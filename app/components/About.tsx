import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Code2, Shield, Cpu, BrainCircuit } from "lucide-react";

const stats = [
  { value: "4", label: "Tech Internships" },
  { value: "8+", label: "Projects Built" },
  { value: "8K+", label: "Blood Buddy Users" },
  { value: "GIAC", label: "Certified" },
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

      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative w-full max-w-[420px] mx-auto">
              {/* Gradient border */}
              <div
                className="absolute -inset-[2px] rounded-2xl"
                style={{
                  background:
                    "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                }}
              />
              <div
                className="relative rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: "#141619", height: "420px" }}
              >
                {/* Initials */}
                <div
                  className="text-[120px] select-none"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 800,
                    backgroundImage:
                      "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                  }}
                >
                  NK
                </div>

                {/* Floating icons */}
                <motion.div
                  className="absolute top-8 right-8 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(102,93,205,0.2)" }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Shield size={22} color="#665DCD" />
                </motion.div>
                <motion.div
                  className="absolute bottom-12 left-8 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(95,164,230,0.2)" }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Code2 size={22} color="#5FA4E6" />
                </motion.div>
                <motion.div
                  className="absolute top-12 left-10 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(210,171,103,0.2)" }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <Cpu size={18} color="#D2AB67" />
                </motion.div>
                <motion.div
                  className="absolute bottom-8 right-10 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(102,93,205,0.2)" }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                >
                  <BrainCircuit size={18} color="#9D96E8" />
                </motion.div>
              </div>

              {/* Badge */}
              <div
                className="absolute -bottom-5 -right-5 px-4 py-3 rounded-xl border border-white/10"
                style={{ background: "#1a1c20" }}
              >
                <div
                  className="text-[24px]"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    backgroundImage:
                      "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  UT '29
                </div>
                <div
                  className="text-[#b0b3b8] text-[12px]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Austin, TX
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 border border-white/10 text-[13px]"
              style={{
                background: "rgba(102,93,205,0.1)",
                color: "#665DCD",
                fontFamily: "Inter, sans-serif",
              }}
            >
              About Me
            </div>
            <h2
              className="text-white mb-6"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(32px, 5vw, 52px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              Developer &{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Cybersecurity Enthusiast
              </span>
            </h2>
            <p
              className="text-[#b0b3b8] mb-5"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", lineHeight: "28px" }}
            >
              I'm an incoming Informatics student at UT Austin majoring in Human-Centered Data Science
              & Cybersecurity. I build things that solve real problems — from AI debate tools to
              algorithmic trading bots to platforms connecting thousands of blood donors globally.
            </p>
            <p
              className="text-[#b0b3b8] mb-10"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", lineHeight: "28px" }}
            >
              National Cyber Scholar with SANS/GIAC certification, ranked in multiple CTF competitions
              (PicoCTF, TryHackMe, HolidayHack), and 4 tech internships before even starting college.
              I love working across the full stack — from ML models to React frontends to Raspberry Pi hardware.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
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
      </div>
    </section>
  );
}
