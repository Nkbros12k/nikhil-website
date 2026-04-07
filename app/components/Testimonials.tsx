import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO at TechStart",
    text: "Alex delivered an exceptional e-commerce platform that exceeded all our expectations. The attention to detail, clean code, and timely delivery made the collaboration a true pleasure. Highly recommend!",
    rating: 5,
    avatar: "SJ",
    color: "#665DCD",
  },
  {
    name: "Marcus Chen",
    role: "CTO at Innovate Labs",
    text: "Working with Alex was a game-changer for our startup. The backend architecture they designed scaled from 100 to 100,000 users without a hiccup. Outstanding technical expertise and communication.",
    rating: 5,
    avatar: "MC",
    color: "#5FA4E6",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager at DigitalCo",
    text: "Alex transformed our outdated dashboard into a beautiful, intuitive product. The user engagement metrics jumped 40% after launch. They truly understand both design and development.",
    rating: 5,
    avatar: "ER",
    color: "#D2AB67",
  },
  {
    name: "James Wilson",
    role: "Founder at CloudApp",
    text: "I've worked with many developers, but Alex stands out for their proactive communication and ability to translate business requirements into elegant technical solutions. A true professional.",
    rating: 5,
    avatar: "JW",
    color: "#665DCD",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="relative py-28 px-8 overflow-hidden"
    >
      {/* Background */}
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
            Testimonials
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
            What Clients{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Say
            </span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-[800px] mx-auto"
        >
          <div
            className="relative p-10 rounded-2xl border border-white/10 overflow-hidden"
            style={{ background: "#0d0e11" }}
          >
            {/* Gradient accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, #665DCD, #5FA4E6, #D2AB67)",
              }}
            />

            {/* Quote icon */}
            <div
              className="absolute top-8 right-8 opacity-10"
              style={{ color: "#665DCD" }}
            >
              <Quote size={80} />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={16} fill="#D2AB67" color="#D2AB67" />
              ))}
            </div>

            {/* Quote text */}
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[#d0d3d8] mb-8 relative"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "18px",
                lineHeight: "30px",
                fontStyle: "italic",
              }}
            >
              "{t.text}"
            </motion.p>

            {/* Author */}
            <motion.div
              key={`author-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-[16px]"
                style={{
                  background: `linear-gradient(135deg, ${t.color}, #141619)`,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                }}
              >
                {t.avatar}
              </div>
              <div>
                <div
                  className="text-white"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "16px" }}
                >
                  {t.name}
                </div>
                <div
                  className="text-[#b0b3b8] text-[13px]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t.role}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[#b0b3b8] hover:text-white hover:border-white/30 transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 24 : 8,
                    background:
                      i === current
                        ? "linear-gradient(90deg, #665DCD, #5FA4E6)"
                        : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[#b0b3b8] hover:text-white hover:border-white/30 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Mini cards row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {testimonials.map((item, i) => (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              onClick={() => setCurrent(i)}
              className="p-4 rounded-xl border text-left transition-all duration-300"
              style={{
                borderColor: i === current ? `${item.color}40` : "rgba(255,255,255,0.06)",
                background: i === current ? `${item.color}10` : "rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px]"
                  style={{
                    background: item.color,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {item.avatar}
                </div>
                <div>
                  <div
                    className="text-white text-[12px]"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                  >
                    {item.name.split(" ")[0]}
                  </div>
                  <div
                    className="text-[#888] text-[11px]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.role.split(" ")[0]}
                  </div>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} size={10} fill="#D2AB67" color="#D2AB67" />
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
