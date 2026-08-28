import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Award, Shield, Trophy, GraduationCap } from "lucide-react";

const certifications = [
  {
    icon: Shield,
    title: "CompTIA Network+ and Security+",
    org: "CompTIA (in progress)",
    desc: "Currently working through both certifications to formalize networking and security fundamentals.",
    color: "#D2AB67",
  },
  {
    icon: Award,
    title: "Global Career Accelerator",
    org: "UT Austin / Podium Education",
    desc: "Data analytics track covering Excel and Tableau. Finished at 104.75% with capstone projects scoring 220/200 and 209/200.",
    color: "#5FA4E6",
  },
  {
    icon: Shield,
    title: "National Cyber Scholar",
    org: "National Cyber Scholarship Foundation",
    desc: "Awarded for demonstrating advanced cybersecurity skills through a rigorous national competition.",
    color: "#665DCD",
  },
  {
    icon: Award,
    title: "SANS Foundations Training",
    org: "SANS Institute",
    desc: "Completed the SANS Foundations cybersecurity training covering core security concepts and practical skills.",
    color: "#5FA4E6",
  },
  {
    icon: Award,
    title: "Autodesk Inventor Certified",
    org: "Autodesk",
    desc: "Professional certification in 3D CAD design, modeling, and prototyping with Autodesk Inventor.",
    color: "#D2AB67",
  },
  {
    icon: GraduationCap,
    title: "UT Austin TACC GenCyber",
    org: "Texas Advanced Computing Center",
    desc: "Completed intensive training in digital forensics and ethical hacking at UT Austin's TACC program.",
    color: "#665DCD",
  },
];

const achievements = [
  {
    icon: Trophy,
    title: "CTF Competitor",
    desc: "Ranked in PicoCTF, TryHackMe, HolidayHack, and other cybersecurity capture-the-flag competitions.",
    color: "#D2AB67",
  },
  {
    icon: Trophy,
    title: "State Semi-Finalist, CyberPatriot",
    desc: "Led a team of 5 to State Semi-Finalist position in ethical hacking and network security competition.",
    color: "#5FA4E6",
  },
  {
    icon: Trophy,
    title: "Robotics Team Captain",
    desc: "Directed team for robotics competitions, overseeing design, building, and programming of robots.",
    color: "#665DCD",
  },
  {
    icon: Trophy,
    title: "Founded Student Club",
    desc: "Founded and grew a student organization promoting strategic problem-solving through board games. President from 2022-2025.",
    color: "#D2AB67",
  },
];

export function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="relative py-28 px-8 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(102,93,205,0.06) 0%, transparent 60%)",
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
            Certifications & Achievements
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
            Recognition &{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Credentials
            </span>
          </h2>
        </motion.div>

        {/* Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-2xl border border-white/8 hover:border-white/16 transition-all duration-300 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.025)" }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, ${cert.color}, transparent)`,
                }}
              />
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${cert.color}30, ${cert.color}10)`,
                  }}
                >
                  <cert.icon size={22} style={{ color: cert.color }} />
                </div>
                <div>
                  <h3
                    className="text-white mb-1"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "16px" }}
                  >
                    {cert.title}
                  </h3>
                  <p
                    className="text-[13px] mb-2"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: cert.color,
                    }}
                  >
                    {cert.org}
                  </p>
                  <p
                    className="text-[#b0b3b8] text-[14px]"
                    style={{ fontFamily: "Inter, sans-serif", lineHeight: "22px" }}
                  >
                    {cert.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <div
            className="text-center mb-8 text-[13px] tracking-widest uppercase"
            style={{ fontFamily: "Inter, sans-serif", color: "#555" }}
          >
            Achievements & Leadership
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              className="p-5 rounded-xl border border-white/8 hover:border-white/16 transition-all duration-300 text-center"
              style={{ background: "rgba(255,255,255,0.025)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{
                  background: `linear-gradient(135deg, ${ach.color}30, ${ach.color}10)`,
                }}
              >
                <ach.icon size={18} style={{ color: ach.color }} />
              </div>
              <h4
                className="text-white mb-2 text-[14px]"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
              >
                {ach.title}
              </h4>
              <p
                className="text-[#b0b3b8] text-[12px]"
                style={{ fontFamily: "Inter, sans-serif", lineHeight: "18px" }}
              >
                {ach.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
