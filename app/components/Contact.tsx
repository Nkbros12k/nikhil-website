import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, Github, Linkedin } from "lucide-react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    try {
      const res = await fetch("https://formspree.io/f/xbdpblyk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 4000);
      }
    } catch {
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "nikhilkadiyala44@gmail.com", href: "mailto:nikhilkadiyala44@gmail.com" },
    { icon: MapPin, label: "Location", value: "Austin, TX", href: "#" },
  ];

  const socials = [
    { icon: Github, href: "https://github.com/Nkbros12k", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/nikhil-kadiyala-70065b256/", label: "LinkedIn" },
  ];

  return (
    <section id="contact" className="relative py-28 px-8 overflow-hidden">
      {/* Large glowing orb */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(102,93,205,0.15) 0%, rgba(95,164,230,0.08) 40%, transparent 70%)",
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
            Get In Touch
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
            Let's{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Work Together
            </span>
          </h2>
          <p
            className="text-[#b0b3b8] max-w-[520px] mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", lineHeight: "28px" }}
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part
            of your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div
              className="p-7 rounded-2xl border border-white/8"
              style={{ background: "rgba(255,255,255,0.025)" }}
            >
              <h3
                className="text-white mb-2"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "20px" }}
              >
                Contact Info
              </h3>
              <p
                className="text-[#b0b3b8] text-[14px] mb-7"
                style={{ fontFamily: "Inter, sans-serif", lineHeight: "22px" }}
              >
                Feel free to reach out through any of these channels. I typically respond within 24 hours.
              </p>

              <div className="flex flex-col gap-5">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(102,93,205,0.3), rgba(95,164,230,0.3))",
                      }}
                    >
                      <item.icon size={17} color="#9D96E8" />
                    </div>
                    <div>
                      <div
                        className="text-[#888] text-[12px]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="text-white text-[14px] group-hover:text-[#5FA4E6] transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div
              className="p-7 rounded-2xl border border-white/8"
              style={{ background: "rgba(255,255,255,0.025)" }}
            >
              <h3
                className="text-white mb-5"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "18px" }}
              >
                Follow Me
              </h3>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 text-[#b0b3b8] hover:text-white hover:border-white/25 transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <social.icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-3"
          >
            <div
              className="p-8 rounded-2xl border border-white/8 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.025)" }}
            >
              {/* Top gradient line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: "linear-gradient(90deg, #665DCD, #5FA4E6, #D2AB67)",
                }}
              />

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-[13px] text-[#888] mb-2"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-[#555] outline-none focus:border-[#665DCD]/50 transition-colors text-[14px]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[13px] text-[#888] mb-2"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-[#555] outline-none focus:border-[#665DCD]/50 transition-colors text-[14px]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-[13px] text-[#888] mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Project Inquiry"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-[#555] outline-none focus:border-[#665DCD]/50 transition-colors text-[14px]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-[13px] text-[#888] mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-[#555] outline-none focus:border-[#665DCD]/50 transition-colors text-[14px] resize-none"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white text-[15px] relative overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                    }}
                  />
                  <span className="relative flex items-center gap-2">
                    {sent ? (
                      "Message Sent!"
                    ) : error ? (
                      "Failed to send — try email instead"
                    ) : sending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
