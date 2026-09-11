import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { tracks } from "../data/tracks";

const links = [
  { label: "Home", to: "/" },
  ...tracks.map((t) => ({ label: t.label, to: `/${t.slug}` })),
];

const activeBar = "linear-gradient(90deg, #665DCD, #5FA4E6, #D2AB67)";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // A route change always closes the mobile menu.
  useEffect(() => setIsMobileOpen(false), [pathname]);

  // Escape closes the mobile menu and hands focus back to the toggle.
  useEffect(() => {
    if (!isMobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsMobileOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileOpen]);

  // Contact lives on the home page, so from anywhere else go there first.
  const goToContact = () => {
    setIsMobileOpen(false);
    if (pathname !== "/") {
      navigate("/#contact");
      return;
    }
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const onHomeClick = () => {
    if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Main"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileOpen
          ? "bg-[#141619]/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Spacer (logo removed) */}
        <div />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center md:gap-5 lg:gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={link.to === "/" ? onHomeClick : undefined}
              className={({ isActive }) =>
                `relative transition-colors text-[15px] ${isActive ? "text-white" : "text-[#b0b3b8] hover:text-white"}`
              }
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full"
                      style={{ background: activeBar }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <button
            onClick={goToContact}
            className="text-[#b0b3b8] hover:text-white transition-colors text-[15px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Contact
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={goToContact}
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
          ref={toggleRef}
          className="md:hidden text-white w-11 h-11 -mr-2 flex items-center justify-center"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[#141619]/95 backdrop-blur-md border-t border-white/5 px-6 py-4 flex flex-col gap-1"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={link.to === "/" ? onHomeClick : undefined}
              className={({ isActive }) =>
                `transition-colors text-[16px] py-2.5 ${isActive ? "text-white" : "text-[#b0b3b8] hover:text-white"}`
              }
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={goToContact}
            className="flex items-center justify-center px-5 py-3 rounded-[3px] text-white text-[14px] relative overflow-hidden mt-3"
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
