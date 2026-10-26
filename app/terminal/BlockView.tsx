import { useState } from "react";
import type { FormEvent } from "react";

import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { tracks } from "@/data/tracks";

import type { Block } from "./types";

type Props = { block: Block; onRun: (cmd: string) => void };

const FORM_ENDPOINT = "https://formspree.io/f/xbdpblyk";

function Skills({ only, onRun }: { only?: string; onRun: (cmd: string) => void }) {
  const shown = only ? skills.filter((s) => s.name === only) : skills;
  return (
    <div className="nk-cards">
      {shown.map((s) => (
        <article className="nk-card" key={s.name}>
          <div className="fm">---</div>
          <div><span className="key">name </span><span className="name">{s.name}</span></div>
          <div><span className="key">description </span>{s.description}</div>
          <div><span className="key">triggers </span>{s.triggers.join(", ")}</div>
          <div><span className="key">tools </span>{s.tools.join(", ")}</div>
          <div className="ev">
            <span className="key">evidence </span>
            {s.evidence.map((e, i) => (
              <span key={e.label}>
                {i > 0 && ", "}
                {e.slug ? <button onClick={() => onRun(`/open ${e.slug}`)}>{e.label}</button> : e.label}
              </span>
            ))}
          </div>
          <div className="fm">---</div>
        </article>
      ))}
    </div>
  );
}

function Resume({ track }: { track: string }) {
  const [preview, setPreview] = useState(false);
  const t = tracks.find((x) => x.slug === track);
  if (!t) return null;
  return (
    <div className="nk-card nk-resume">
      <div className="name">{t.label} résumé</div>
      <div>{t.blurb}</div>
      <div className="row">
        <a href={t.resume} target="_blank" rel="noreferrer">open pdf</a>
        <a href={t.resume} download>download</a>
        <button onClick={() => setPreview((p) => !p)} aria-expanded={preview}>{preview ? "hide preview" : "preview"}</button>
      </div>
      {preview && <iframe src={`${t.resume}#toolbar=0`} title={`${t.label} résumé preview`} />}
    </div>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };
  return (
    <div>
      <div className="nk-links">
        <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>
        <a href={profile.links.github} target="_blank" rel="noreferrer">github</a>
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer">linkedin</a>
        <a href={profile.links.perspect} target="_blank" rel="noreferrer">perspect</a>
      </div>
      {status === "sent" ? (
        <p role="status">Sent. I will get back to you.</p>
      ) : (
        <form className="nk-form" onSubmit={submit}>
          <label>name<input name="name" required autoComplete="name" /></label>
          <label>email<input name="email" type="email" required autoComplete="email" /></label>
          <label>message<textarea name="message" required /></label>
          <button type="submit" disabled={status === "sending"}>{status === "sending" ? "sending" : "send"}</button>
          {status === "error" && <p role="alert">That did not send. Email me at {profile.links.email}.</p>}
        </form>
      )}
    </div>
  );
}

export function BlockView({ block, onRun }: Props) {
  switch (block.type) {
    case "prose":
      return <div className="nk-prose">{block.lines.map((l) => <p key={l}>{l}</p>)}</div>;
    case "tool":
      return (
        <div className="nk-tool">
          <div><span className="dot">● </span>{block.call}</div>
          {block.result.map((r) => <div className="res" key={r}>⎿ {r}</div>)}
        </div>
      );
    case "list":
      return (
        <div className="nk-list">
          {block.title && <div className="nk-list-title">{block.title}</div>}
          {block.items.map((i) => (
            <button className="nk-item" key={i.label} onClick={() => onRun(i.cmd)}>
              <span className="label">{i.label}</span>
              {i.hint && <span className="hint">{i.hint}</span>}
            </button>
          ))}
        </div>
      );
    case "roles":
      return (
        <div className="nk-cards">
          {block.items.map((r) => (
            <section className="nk-role" key={`${r.org}${r.role}`}>
              <h3>{r.role}, {r.org}</h3>
              <div className="meta">{r.when}{r.where ? `, ${r.where}` : ""}</div>
              <ul>{r.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </section>
          ))}
        </div>
      );
    case "skills":
      return <Skills only={block.only} onRun={onRun} />;
    case "resume":
      return <Resume track={block.track} />;
    case "contact":
      return <Contact />;
    case "notfound":
      return (
        <div className="nk-prose">
          <p>No match for "{block.input}". Try one of these.</p>
          <div className="nk-list">
            {block.suggest.map((s) => (
              <button className="nk-item" key={s.cmd} onClick={() => onRun(s.cmd)}><span className="label">{s.label}</span></button>
            ))}
          </div>
        </div>
      );
  }
}
