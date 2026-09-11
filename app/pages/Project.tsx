import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { byslug, projects } from "../data/projects";
import { trackBySlug } from "../data/tracks";

const gradientText = {
  backgroundImage: "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const inter = { fontFamily: "Inter, sans-serif" };
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5FA4E6]";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Project() {
  const { slug } = useParams();
  const project = byslug(slug);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!project) return;
    document.title = `${project.title} | Nikhil Kadiyala`;
    window.scrollTo(0, 0);
    return () => {
      document.title = "Nikhil Kadiyala | Portfolio";
    };
  }, [project]);

  // The section list tracks the part being read, so a long write-up stays navigable.
  useEffect(() => {
    if (!project) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    project.beats.forEach((b) => {
      const el = document.getElementById(slugify(b.heading));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const facts = [
    ["Role", project.role],
    ["Year", project.year],
    ["Scale", project.scale],
    ["Domain", project.domain],
  ];

  return (
    <PageShell>
      <div className="px-6 md:px-8">
            <header className="relative max-w-[1100px] mx-auto pt-32 pb-14">
              <div
                className="absolute right-0 top-10 w-[520px] h-[520px] rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(102,93,205,0.12) 0%, transparent 70%)",
                }}
              />

              <Link
                to={`/${project.track}`}
                className={`relative inline-flex items-center gap-2 text-[14px] text-[#b0b3b8] hover:text-white transition-colors mb-10 ${focusRing}`}
                style={inter}
              >
                <ArrowLeft size={15} />
                Back to {trackBySlug(project.track)?.label ?? "home"}
              </Link>

              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 border border-white/10 text-[13px]"
                  style={{ ...inter, background: "rgba(102,93,205,0.1)", color: "#9D96E8" }}
                >
                  {project.domain}
                </div>
                <h1
                  className="text-white"
                  style={{
                    ...inter,
                    fontWeight: 700,
                    fontSize: "clamp(40px, 6.5vw, 72px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    maxWidth: "16ch",
                  }}
                >
                  {project.title}
                </h1>
                <p
                  className="mt-6"
                  style={{
                    ...inter,
                    ...gradientText,
                    fontWeight: 600,
                    fontSize: "clamp(20px, 2.4vw, 26px)",
                    lineHeight: 1.4,
                    maxWidth: "36ch",
                  }}
                >
                  {project.line}
                </p>
              </motion.div>

              {/* Overview: the facts a reviewer scans before deciding to read */}
              <motion.div
                className="relative mt-12 rounded-2xl border border-white/8 p-6 md:p-8"
                style={{ background: "rgba(255,255,255,0.03)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {facts.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[13px] text-[#8b8e94]" style={inter}>
                        {label}
                      </dt>
                      <dd className="mt-1 text-white text-[15px]" style={{ ...inter, fontWeight: 500 }}>
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 pt-6 border-t border-white/8 flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <p
                    className="text-[#b0b3b8] max-w-[62ch]"
                    style={{ ...inter, fontSize: "16px", lineHeight: "26px" }}
                  >
                    {project.summary}
                  </p>
                  {project.link && (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative overflow-hidden inline-flex shrink-0 self-start md:self-center px-6 py-3 rounded-[3px] text-white text-[14px] transition-transform hover:scale-105 ${focusRing}`}
                      style={{ ...inter, fontWeight: 500 }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(163.15deg, #665DCD 0%, #5FA4E6 44.76%, #D2AB67 100%)",
                        }}
                      />
                      <span className="relative inline-flex items-center gap-2">
                        Visit {project.link.label}
                        <ExternalLink size={14} />
                      </span>
                    </a>
                  )}
                </div>
              </motion.div>
            </header>

            {project.cover && (
              <figure className="max-w-[1100px] mx-auto mb-16">
                <img
                  src={project.cover.src}
                  alt={project.cover.alt}
                  className="w-full rounded-2xl border border-white/8"
                />
                {project.cover.caption && (
                  <figcaption className="mt-3 text-[13px] text-[#8b8e94]" style={inter}>
                    {project.cover.caption}
                  </figcaption>
                )}
              </figure>
            )}

            <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[220px_1fr] gap-12 pb-24">
              <aside className="hidden lg:block">
                <nav aria-label="Case study sections" className="sticky top-28">
                  <p className="text-[13px] text-[#8b8e94] mb-4" style={inter}>
                    On this page
                  </p>
                  <ul className="space-y-1">
                    {project.beats.map((b) => {
                      const id = slugify(b.heading);
                      const isActive = active === id;
                      return (
                        <li key={id}>
                          <a
                            href={`#${id}`}
                            aria-current={isActive ? "location" : undefined}
                            className={`block pl-4 py-1.5 text-[14px] transition-colors ${focusRing} ${
                              isActive ? "text-white" : "text-[#8b8e94] hover:text-white"
                            }`}
                            style={{
                              ...inter,
                              borderLeft: "2px solid",
                              borderImage: isActive
                                ? "linear-gradient(180deg, #665DCD, #5FA4E6, #D2AB67) 1"
                                : "linear-gradient(rgba(255,255,255,0.08), rgba(255,255,255,0.08)) 1",
                            }}
                          >
                            {b.heading}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </aside>

              <article className="min-w-0 max-w-[760px]">
                {project.beats.map((b) => {
                  const id = slugify(b.heading);
                  return (
                    <section key={id} id={id} className="scroll-mt-28 mb-16">
                      <h2
                        className="text-white mb-5"
                        style={{
                          ...inter,
                          fontWeight: 700,
                          fontSize: "clamp(24px, 3vw, 32px)",
                          letterSpacing: "-0.015em",
                          lineHeight: 1.2,
                        }}
                      >
                        {b.heading}
                      </h2>

                      {b.body?.map((p, i) => (
                        <p
                          key={i}
                          className="text-[#c9ccd1] mb-4"
                          style={{ ...inter, fontSize: "17px", lineHeight: "29px" }}
                        >
                          {p}
                        </p>
                      ))}

                      {b.gallery && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                          {b.gallery.map((f) => (
                            <figure key={f.src}>
                              <img
                                src={f.src}
                                alt={f.alt}
                                loading="lazy"
                                className="w-full aspect-[393/852] object-cover object-top rounded-xl border border-white/10"
                              />
                              {f.caption && (
                                <figcaption className="mt-2 text-[13px] text-[#8b8e94]" style={inter}>
                                  {f.caption}
                                </figcaption>
                              )}
                            </figure>
                          ))}
                        </div>
                      )}

                      {b.decisions && (
                        <ol className="space-y-4">
                          {b.decisions.map((d, i) => (
                            <li
                              key={i}
                              className="grid grid-cols-[auto_1fr] gap-5 p-6 rounded-2xl border border-white/8"
                              style={{ background: "rgba(255,255,255,0.025)" }}
                            >
                              <span
                                aria-hidden="true"
                                style={{ ...inter, ...gradientText, fontWeight: 700, fontSize: "22px", lineHeight: 1.2 }}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <div>
                                <h3
                                  className="text-white"
                                  style={{ ...inter, fontWeight: 600, fontSize: "17px", lineHeight: 1.4 }}
                                >
                                  {d.what}
                                </h3>
                                <p
                                  className="text-[#b0b3b8] mt-2"
                                  style={{ ...inter, fontSize: "15px", lineHeight: "25px" }}
                                >
                                  {d.why}
                                </p>
                                {d.figure && (
                                  <figure className="mt-5">
                                    <img
                                      src={d.figure.src}
                                      alt={d.figure.alt}
                                      loading="lazy"
                                      className="block max-w-full max-h-[560px] w-auto h-auto rounded-xl border border-white/10"
                                    />
                                    {d.figure.caption && (
                                      <figcaption className="mt-2 text-[13px] text-[#8b8e94]" style={inter}>
                                        {d.figure.caption}
                                      </figcaption>
                                    )}
                                  </figure>
                                )}
                              </div>
                            </li>
                          ))}
                        </ol>
                      )}
                    </section>
                  );
                })}

                <Link
                  to={`/work/${next.slug}`}
                  className={`group relative block mt-8 p-8 rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-colors ${focusRing}`}
                  style={{ background: "rgba(255,255,255,0.025)" }}
                >
                  <div className="absolute inset-0 opacity-15" style={{ background: next.accent }} />
                  <div className="relative">
                    <p className="text-[13px] text-[#b0b3b8] mb-2" style={inter}>
                      Next case study
                    </p>
                    <p
                      className="text-white"
                      style={{ ...inter, fontWeight: 700, fontSize: "26px", letterSpacing: "-0.01em" }}
                    >
                      {next.title}
                    </p>
                    <p className="text-[#b0b3b8] mt-2 text-[15px]" style={inter}>
                      {next.line}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 mt-5 text-[14px] text-[#7DC4F8] group-hover:text-white transition-colors"
                      style={{ ...inter, fontWeight: 500 }}
                    >
                      Read it
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </Link>
              </article>
            </div>
      </div>
    </PageShell>
  );
}
