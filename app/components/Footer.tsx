import { Github, Linkedin } from "lucide-react";

export function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const socials = [
    { icon: Github, href: "https://github.com/Nkbros12k" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/nikhil-kadiyala-70065b256/" },
  ];

  return (
    <footer
      className="relative py-10 px-8 border-t overflow-hidden"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Gradient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(95,164,230,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full"
              style={{
                background: "linear-gradient(135deg, #665DCD, #5FA4E6, #D2AB67)",
              }}
            />
            <span
              className="text-white text-[16px]"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              Nikhil K.
            </span>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.id)}
                className="text-[#888] hover:text-white transition-colors text-[13px]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 text-[#888] hover:text-white hover:border-white/25 transition-all"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <social.icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-8 pt-6 border-t text-center"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p
            className="text-[#555] text-[13px] flex items-center justify-center gap-1"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            © 2026 Nikhil Kadiyala. Modified from an online Figma theme ツ
          </p>
        </div>
      </div>
    </footer>
  );
}
