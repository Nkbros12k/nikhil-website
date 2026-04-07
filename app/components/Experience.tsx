import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Tech Intern",
    company: "Code Ninjas",
    period: "Jun 2024 — Aug 2024",
    location: "Austin, TX",
    points: [
      "Instructed 20+ students (ages 7-14) in Lua, Python, robotics, and 3D modeling",
      "Led 5 week-long STEM camps, averaging 25 hours/week of teaching and mentoring",
      "Guided students through 3D printing workflows, helping them produce 15+ unique prototypes",
    ],
    color: "#665DCD",
  },
  {
    role: "Tech Intern",
    company: "Logica Consulting Group",
    period: "Jun 2024 — Aug 2024",
    location: "Austin, TX",
    points: [
      "Built client-facing website using HTML and React Native, improving load speed by 20%",
      "Collaborated with a team of 3 developers on a project serving 50+ small business users",
      "Drafted documentation that reduced onboarding time for new interns by 40%",
    ],
    color: "#5FA4E6",
  },
  {
    role: "Tech Intern",
    company: "eSeva",
    period: "Jun 2023 — Aug 2023",
    location: "India",
    points: [
      "Coordinated 6 interns, improving team efficiency by 30%",
      "Delivered 10+ financial education sessions, reaching 50+ families",
      "Assisted in 25+ home visits, resolving billing and technology issues on-site",
    ],
    color: "#D2AB67",
  },
  {
    role: "Tech Intern",
    company: "Petual Inc",
    period: "Jun 2022 — Aug 2022",
    location: "Remote",
    points: [
      "Provided IT support to 30+ users, resolving setup and network issues within 48 hours",
      "Automated software deployment, reducing installation time by 25%",
    ],
    color: "#665DCD",
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="relative py-28 px-8 overflow-hidden"
      style={{ background: "rgba(0,0,0,0.2)" }}
    >
      <div
        className="absolute right-0 top-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(95,164,230,0.08) 0%, transparent 70%)",
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
              color: "#665DCD",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Work Experience
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
            Where I've{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Worked
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[23px] top-0 bottom-0 w-[2px] hidden md:block"
            style={{
              background:
                "linear-gradient(to bottom, #665DCD, #5FA4E6, #D2AB67, transparent)",
            }}
          />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative md:pl-16"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-[14px] top-7 w-[20px] h-[20px] rounded-full border-[3px] hidden md:flex items-center justify-center"
                  style={{
                    borderColor: exp.color,
                    background: "#141619",
                  }}
                >
                  <div
                    className="w-[8px] h-[8px] rounded-full"
                    style={{ background: exp.color }}
                  />
                </div>

                <div
                  className="p-6 rounded-2xl border border-white/8 hover:border-white/16 transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.025)" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <Briefcase size={16} style={{ color: exp.color }} />
                        <h3
                          className="text-white"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 600,
                            fontSize: "18px",
                          }}
                        >
                          {exp.role}
                        </h3>
                      </div>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "15px",
                          backgroundImage:
                            "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-[#b0b3b8] text-[13px]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {exp.period}
                      </div>
                      <div
                        className="text-[#888] text-[12px]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {exp.points.map((point, j) => (
                      <li
                        key={j}
                        className="text-[#b0b3b8] text-[14px] flex gap-3"
                        style={{ fontFamily: "Inter, sans-serif", lineHeight: "22px" }}
                      >
                        <span className="text-[#555] mt-[6px] flex-shrink-0">&#8226;</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
