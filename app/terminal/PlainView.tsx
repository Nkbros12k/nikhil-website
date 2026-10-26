import { Link } from "react-router-dom";

import { artifacts } from "@/data/artifacts";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { tracks } from "@/data/tracks";

import { roles } from "./filesystem";
import "./terminal.css";

export default function PlainView() {
  return (
    <div className="nk-plain">
      <div className="nk-plain-inner">
        <header>
          <h1>{profile.name}</h1>
          <p className="dim">{profile.tagline}</p>
          <p><Link to="/">back to the terminal</Link></p>
        </header>
        <section>
          <h2>about</h2>
          {profile.whoami.map((l) => <p key={l}>{l}</p>)}
        </section>
        <section>
          <h2>experience</h2>
          <ul>
            {roles.map((r) => (
              <li key={r.slug}><b>{r.role}, {r.org}</b> <span className="dim">{r.when}</span></li>
            ))}
          </ul>
        </section>
        <section>
          <h2>projects</h2>
          <ul>
            {artifacts.map((a) => (
              <li key={a.slug}>
                <b>{a.title}</b> <span className="dim">{a.desc}</span>{" "}
                {a.github && <a href={a.github} target="_blank" rel="noreferrer">source</a>}
                {a.live && <> <a href={a.live} target="_blank" rel="noreferrer">live</a></>}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>skills</h2>
          <ul>{skills.map((s) => <li key={s.name}><b>{s.name}</b> <span className="dim">{s.description}</span></li>)}</ul>
        </section>
        <section>
          <h2>résumé</h2>
          <ul>
            {tracks.map((t) => (
              <li key={t.slug}><a href={t.resume}>{t.label}</a></li>
            ))}
          </ul>
        </section>
        <section>
          <h2>contact</h2>
          <p>
            <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>{" "}
            <a href={profile.links.github}>github</a> <a href={profile.links.linkedin}>linkedin</a>
          </p>
        </section>
      </div>
    </div>
  );
}
