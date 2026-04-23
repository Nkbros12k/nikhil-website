import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Tech Director + External Technologies (Incoming)",
    company: "Sustainable Building Initiative",
    period: "Starting Fall 2026",
    location: "Austin, TX",
    points: [
      "Leading a 10 to 15 person tech team building the organization website and related technical projects",
      "Reviewing and approving all team work before branches are merged to main",
      "Reporting directly to the Head of Club on tech team health and project progress",
      "Acting as primary technical point of contact for client-facing communications",
      "Running recruiting, interviews, and onboarding for new tech team members",
      "Leading the External Technologies function with access to industry technical research and emerging tooling",
    ],
    color: "#D2AB67",
  },
  {
    role: "Software Developer, Tech Team",
    company: "Sustainable Building Initiative",
    period: "Feb 2026 to Present",
    location: "Austin, TX",
    points: [
      "Designed and shipped the Reports feature end to end using Supabase (Postgres + storage bucket with image validation)",
      "Integrated front end with Supabase backend for a production-ready reports workflow",
      "Working with Next.js, Bun, Git, and modern full-stack tooling on a 5 to 7 person team",
      "Starting a research collab with a UT Austin team on a Python-based drone ML model (computer vision + route detection)",
    ],
    color: "#665DCD",
  },
  {
    role: "STEM Instructor",
    company: "Code Ninjas",
    period: "Jun 2024 to Aug 2024",
    location: "Austin, TX",
    points: [
      "Taught 20+ students (ages 7 to 14) Python, Lua, robotics, and 3D modeling across 5 week-long STEM camps",
      "Achieved 90% project completion rate through adaptive mentoring",
      "Guided students through building 15+ unique 3D printed prototypes",
    ],
    color: "#5FA4E6",
  },
  {
    role: "Tech Intern",
    company: "Logica Consulting Group",
    period: "May 2024 to Jun 2024",
    location: "Austin, TX",
    points: [
      "Built a client-facing web app using HTML and React Native, cutting page load times by 20%",
      "Collaborated with a 3-developer team on a project serving 50+ small business users",
      "Drafted documentation that reduced onboarding time for new interns by 40%",
    ],
    color: "#D2AB67",
  },
  {
    role: "Assistant Lead",
    company: "India eSeva",
    period: "Jun 2023 to Jul 2023",
    location: "India",
    points: [
      "Coordinated 6 interns, improving team efficiency by 30% through restructured task delegation",
      "Assisted in 25+ home visits resolving billing, government payment, and tech issues on-site",
      "Led 10+ financial literacy sessions reaching 50+ families",
    ],
    color: "#665DCD",
  },
  {
    role: "Tech Intern",
    company: "Petual Inc",
    period: "Jun 2022 to Jul 2022",
    location: "Remote",
    points: [
      "Supported 30+ users with laptop setup, software configuration, and network troubleshooting (sub-48hr resolution)",
      "Automated software deployment workflows, reducing installation time by 25%",
      "Installed and configured Ubuntu and Raspberry Pi environments for training purposes",
    ],
    color: "#5FA4E6",
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
