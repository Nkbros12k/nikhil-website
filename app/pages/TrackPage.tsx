import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink, FileText } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { CaseStudies } from "../components/CaseStudies";
import { Projects } from "../components/Projects";
import { Skills } from "../components/Skills";
import { trackBySlug, tracks, type Track } from "../data/tracks";

const gradient = "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)";
const gradientText = {
  backgroundImage: gradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;
const inter = { fontFamily: "Inter, sans-serif" };
const glass = { background: "rgba(255,255,255,0.025)" };
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5FA4E6]";
const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

function SectionHeader({ pill, lead, accent }: { pill: string; lead: string; accent: string }) {
  return (
    <motion.div {...reveal} className="mb-12">
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 border border-white/10 text-[13px]"
        style={{ ...inter, background: "rgba(102,93,205,0.1)", color: "#9D96E8" }}
      >
        {pill}
      </div>
      <h2
        className="text-white"
        style={{
          ...inter,
          fontWeight: 700,
          fontSize: "clamp(28px, 4vw, 44px)",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
        }}
      >
        {lead} <span style={gradientText}>{accent}</span>
      </h2>
    </motion.div>
  );
}

function Chip({ text }: { text: string }) {
  return (
    <span
      className="px-3 py-1 rounded-full text-[12px] text-[#b0b3b8]"
      style={{ ...inter, background: "rgba(255,255,255,0.06)" }}
    >
      {text}
    </span>
  );
}

function ResumeButton({ track }: { track: Track }) {
  return (
    <a
      href={track.resume}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative overflow-hidden inline-flex items-center px-7 py-4 rounded-[3px] text-white text-[15px] transition-transform hover:scale-105 ${focusRing}`}
      style={{ ...inter, fontWeight: 500 }}
    >
      <div className="absolute inset-0" style={{ background: gradient }} />
      <span className="relative inline-flex items-center gap-2 uppercase tracking-wider">
        <FileText size={16} aria-hidden="true" />
        {track.label} résumé
      </span>
    </a>
  );
}

function WorkGrid({ track }: { track: Track }) {
  return (
    <section className="relative py-20 px-8">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader pill="Selected Work" lead="Selected" accent="Work" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {track.work?.map((w) => (
            <motion.div
              {...reveal}
              key={w.title}
              className="relative flex flex-col p-7 rounded-2xl border border-white/8 overflow-hidden"
              style={glass}
            >
              {w.image && (
                <div
                  className="-mx-7 -mt-7 mb-6 h-[200px] overflow-hidden border-b border-white/8"
                  style={{ background: "#191b1f" }}
                >
                  <img src={w.image.src} alt={w.image.alt} loading="lazy" className="w-full h-full object-cover object-top" />
                </div>
              )}
              <h3 className="text-white" style={{ ...inter, fontWeight: 600, fontSize: "19px" }}>
                {w.title}
              </h3>
              <p className="text-[#b0b3b8] mt-2 text-[15px]" style={{ ...inter, lineHeight: "24px" }}>
                {w.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {w.tags.map((tag) => (
                  <Chip key={tag} text={tag} />
                ))}
              </div>
              {(w.caseStudy || w.href) && (
                <div className="flex flex-wrap gap-5 mt-auto pt-5">
                  {w.caseStudy && (
                    <Link
                      to={`/work/${w.caseStudy}`}
                      className={`inline-flex items-center gap-1.5 text-[14px] text-[#7DC4F8] hover:text-white transition-colors ${focusRing}`}
                      style={{ ...inter, fontWeight: 500 }}
                    >
                      Read case study
                      <ArrowUpRight size={15} />
                    </Link>
                  )}
                  {w.href && (
                    <a
                      href={w.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-[14px] text-[#7DC4F8] hover:text-white transition-colors ${focusRing}`}
                      style={{ ...inter, fontWeight: 500 }}
                    >
                      Visit {w.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceList({ track }: { track: Track }) {
  return (
    <section className="relative py-20 px-8">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader pill="Experience" lead="Relevant" accent="Experience" />
        <ol className="space-y-4">
          {track.experience.map((r) => (
            <motion.li
              {...reveal}
              key={r.org + r.role}
              className="p-6 md:p-7 rounded-2xl border border-white/8"
              style={glass}
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6">
                <h3 className="text-white" style={{ ...inter, fontWeight: 600, fontSize: "18px" }}>
                  {r.role}
                </h3>
                <span className="text-[13px] text-[#8b8e94] shrink-0" style={inter}>
                  {r.when}
                </span>
              </div>
              <p className="text-[15px] text-[#b0b3b8] mt-1" style={inter}>
                {r.org}
                {r.where ? `, ${r.where}` : ""}
              </p>
              <ul className="mt-4 space-y-2">
                {r.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[10px] w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: gradient }}
                    />
                    <span className="text-[15px] text-[#b0b3b8]" style={{ ...inter, lineHeight: "25px" }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SkillsGrid({ track }: { track: Track }) {
  return (
    <section className="relative py-20 px-8">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader pill="Skills" lead="Skills &" accent="Tools" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {track.skills.map((g) => (
            <motion.div {...reveal} key={g.group} className="p-7 rounded-2xl border border-white/8" style={glass}>
              <h3 className="text-white mb-4" style={{ ...inter, fontWeight: 600, fontSize: "17px" }}>
                {g.group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <Chip key={item} text={item} />
                ))}
              </div>
            </motion.div>
          ))}
          {track.coursework && (
            <motion.div {...reveal} className="p-7 rounded-2xl border border-white/8" style={glass}>
              <h3 className="text-white mb-4" style={{ ...inter, fontWeight: 600, fontSize: "17px" }}>
                Coursework at UT Austin
              </h3>
              <div className="flex flex-wrap gap-2">
                {track.coursework.map((c) => (
                  <Chip key={c} text={c} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function ClosingBand({ track }: { track: Track }) {
  const others = tracks.filter((t) => t.slug !== track.slug);
  return (
    <section className="px-8 pt-8 pb-28">
      <motion.div
        {...reveal}
        className="relative max-w-[1100px] mx-auto p-8 md:p-10 rounded-2xl border border-white/8 overflow-hidden"
        style={glass}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, #665DCD, #5FA4E6, #D2AB67)" }}
        />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2
              className="text-white"
              style={{ ...inter, fontWeight: 700, fontSize: "28px", letterSpacing: "-0.01em" }}
            >
              Want the one-page version?
            </h2>
            <p className="text-[#b0b3b8] mt-2 max-w-[52ch] text-[16px]" style={{ ...inter, lineHeight: "26px" }}>
              The {track.label} résumé puts this page on a single sheet.
            </p>
          </div>
          <ResumeButton track={track} />
        </div>
        <div className="mt-8 pt-6 border-t border-white/8">
          <p className="text-[13px] text-[#8b8e94] mb-3" style={inter}>
            Looking at a different kind of role?
          </p>
          <div className="flex flex-wrap gap-3">
            {others.map((t) => (
              <Link
                key={t.slug}
                to={`/${t.slug}`}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/15 text-[14px] text-[#b0b3b8] hover:text-white hover:border-white/30 transition-colors ${focusRing}`}
                style={inter}
              >
                {t.title} {t.titleAccent}
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function TrackPage() {
  const { track: slug } = useParams();
  const track = trackBySlug(slug);

  useEffect(() => {
    if (!track) return;
    document.title = `${track.title} ${track.titleAccent} | Nikhil Kadiyala`;
    window.scrollTo(0, 0);
    return () => {
      document.title = "Nikhil Kadiyala | Portfolio";
    };
  }, [track]);

  if (!track) return <Navigate to="/" replace />;

  return (
    <PageShell>
      <header className="relative px-8 pt-36 pb-12 overflow-hidden">
        <div
          className="absolute right-0 top-10 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(102,93,205,0.12) 0%, transparent 70%)",
          }}
        />
        <motion.div
          className="relative max-w-[1100px] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 border border-white/10 text-[13px]"
            style={{ ...inter, background: "rgba(102,93,205,0.1)", color: "#9D96E8" }}
          >
            {track.label}
          </div>
          <h1
            className="text-white"
            style={{
              ...inter,
              fontWeight: 700,
              fontSize: "clamp(40px, 7vw, 80px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "14ch",
            }}
          >
            {track.title} <span style={gradientText}>{track.titleAccent}</span>
          </h1>
          <p
            className="text-[#b0b3b8] mt-7 max-w-[640px]"
            style={{ ...inter, fontSize: "18px", lineHeight: "30px" }}
          >
            {track.intro}
          </p>
          <div className="flex items-center gap-4 flex-wrap mt-10">
            <ResumeButton track={track} />
            <Link
              to="/#contact"
              className={`px-7 py-4 rounded-[3px] text-white text-[15px] border border-white/20 hover:border-white/40 transition-colors ${focusRing}`}
              style={{ ...inter, fontWeight: 500 }}
            >
              <span className="uppercase tracking-wider">Get in touch</span>
            </Link>
          </div>
        </motion.div>
      </header>

      {track.showcase === "case-studies" && <CaseStudies slugs={track.caseStudies} />}
      {track.showcase === "projects" && <Projects />}
      {track.showcase === "work" && <WorkGrid track={track} />}

      <ExperienceList track={track} />

      {/* Software keeps the site's richer skills cards; the other tracks list their own. */}
      {track.showcase === "projects" ? <Skills /> : <SkillsGrid track={track} />}

      <ClosingBand track={track} />
    </PageShell>
  );
}
