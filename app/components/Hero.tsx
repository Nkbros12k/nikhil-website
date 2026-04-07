import { motion } from "motion/react";
// Background blob — using a CSS gradient instead of Figma asset
const imgBg = "";

function FloatingCube({
  size,
  color,
  style,
  delay = 0,
}: {
  size: number;
  color: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <motion.div
      style={{ width: size, height: size, position: "absolute", ...style }}
      animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div
        className="w-full h-full rounded-[6px] opacity-80"
        style={{
          background: color,
          boxShadow: `0 8px 32px ${color}66`,
          transform: "perspective(200px) rotateX(20deg) rotateY(20deg)",
        }}
      />
    </motion.div>
  );
}

function GlowOrb({
  size,
  color,
  style,
}: {
  size: number;
  color: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: `blur(${size / 2}px)`,
        position: "absolute",
        opacity: 0.3,
        ...style,
      }}
    />
  );
}

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
      {/* Background blob */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={imgBg}
          alt=""
          className="absolute w-[900px] h-[900px] object-cover opacity-20"
          style={{ top: "-200px", left: "-200px" }}
        />
      </div>

      {/* Glow orbs */}
      <GlowOrb size={400} color="#665DCD" style={{ top: "10%", left: "5%" }} />
      <GlowOrb size={300} color="#5FA4E6" style={{ bottom: "20%", right: "10%" }} />
      <GlowOrb size={200} color="#D2AB67" style={{ top: "40%", right: "30%" }} />

      {/* Floating 3D geometric shapes */}
      <div className="hidden lg:block">
        <FloatingCube
          size={60}
          color="linear-gradient(135deg, #665DCD, #5FA4E6)"
          style={{ top: "20%", right: "18%" }}
          delay={0}
        />
        <FloatingCube
          size={40}
          color="linear-gradient(135deg, #5FA4E6, #D2AB67)"
          style={{ top: "35%", right: "10%" }}
          delay={1.2}
        />
        <FloatingCube
          size={80}
          color="linear-gradient(135deg, #665DCD 30%, #D2AB67)"
          style={{ top: "55%", right: "22%" }}
          delay={0.6}
        />
        <FloatingCube
          size={30}
          color="linear-gradient(135deg, #5FA4E6, #665DCD)"
          style={{ top: "70%", right: "12%" }}
          delay={1.8}
        />
        <FloatingCube
          size={50}
          color="linear-gradient(135deg, #D2AB67, #665DCD)"
          style={{ top: "25%", left: "8%" }}
          delay={0.9}
        />
        <FloatingCube
          size={35}
          color="linear-gradient(135deg, #5FA4E6, #D2AB67)"
          style={{ top: "65%", left: "12%" }}
          delay={1.5}
        />

        {/* Hexagon-like cluster */}
        <motion.div
          className="absolute"
          style={{ top: "30%", right: "15%" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: ["#665DCD", "#5FA4E6", "#D2AB67", "#665DCD", "#5FA4E6", "#D2AB67"][i],
                transform: `rotate(${angle}deg) translateX(55px)`,
                opacity: 0.8,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-[700px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-white/10"
            style={{ background: "rgba(102,93,205,0.15)" }}
          >
            <div className="w-2 h-2 rounded-full bg-[#5FA4E6] animate-pulse" />
            <span
              className="text-[#5FA4E6] text-[13px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Available for work
            </span>
          </div>

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

          <p
            className="text-[#b0b3b8] mb-10 max-w-[520px] mx-auto"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "18px",
              lineHeight: "30px",
            }}
          >
            Developer, cybersecurity enthusiast, and builder. From AI-powered tools to trading bots — I turn ideas into real products.
          </p>

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

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-2 mt-16 opacity-50"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white" />
            <span className="text-white text-[11px] tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
              Scroll
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
