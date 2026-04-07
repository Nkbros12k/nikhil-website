import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Home", "About", "Experience", "Skills", "Projects", "Contact"];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
    setIsMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#141619]/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-[4px]"
            style={{ background: "linear-gradient(135deg, #665DCD, #5FA4E6, #D2AB67)" }}
          />
          <span
            className="text-white text-[18px]"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
          >
            Nikhil K.
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-[#b0b3b8] hover:text-white transition-colors text-[15px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollTo("Contact")}
          className="hidden md:flex items-center px-5 py-2 rounded-[3px] text-white text-[14px] relative overflow-hidden"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #665DCD, #5FA4E6, #D2AB67)" }}
          />
          <span className="relative">Hire Me</span>
        </button>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#141619]/95 backdrop-blur-md border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-[#b0b3b8] hover:text-white transition-colors text-[16px] text-left"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("Contact")}
            className="flex items-center justify-center px-5 py-2 rounded-[3px] text-white text-[14px] relative overflow-hidden mt-2"
          >
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, #665DCD, #5FA4E6, #D2AB67)" }}
            />
            <span className="relative">Hire Me</span>
          </button>
        </div>
      )}
    </nav>
  );
}
