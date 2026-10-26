import { useState } from "react";

import { artifactBySlug } from "@/data/artifacts";
import { byslug } from "@/data/projects";

type Props = { slug: string; onClose: () => void };
type Tab = "preview" | "details" | "source";

const TABS: Tab[] = ["preview", "details", "source"];

function Details({ slug, desc, tags }: { slug?: string; desc: string; tags: string[] }) {
  const study = byslug(slug);
  return (
    <>
      <p>{desc}</p>
      <div className="nk-tags">{tags.join("  ")}</div>
      {study?.beats.map((b) => (
        <section key={b.heading}>
          <h4>{b.heading}</h4>
          {b.body?.map((p) => <p key={p}>{p}</p>)}
          {b.decisions?.map((d) => (
            <p key={d.what}><b>{d.what}</b> {d.why}</p>
          ))}
          {b.gallery?.map((g) => <img key={g.src} src={g.src} alt={g.alt} loading="lazy" />)}
        </section>
      ))}
    </>
  );
}

export function ArtifactPanel({ slug, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("preview");
  const artifact = artifactBySlug(slug);
  if (!artifact) return null;
  const cover = artifact.image;
  return (
    <aside className="nk-panel" aria-label={`${artifact.title} artifact`}>
      <div className="nk-panel-head">
        <span className="title">{artifact.slug}.artifact</span>
        <button onClick={onClose} aria-label="Close artifact">close</button>
      </div>
      <div className="nk-tabs" role="tablist">
        {TABS.map((t) => (
          <button className="nk-tab" role="tab" aria-selected={tab === t} key={t} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className="nk-panel-body" role="tabpanel">
        <h3 style={{ margin: 0 }}>{artifact.title}</h3>
        {tab === "preview" &&
          (cover ? <img src={cover} alt={`${artifact.title} screenshot`} /> : <div className="nk-noimg">no screenshot for this one</div>)}
        {tab === "details" && <Details slug={artifact.caseStudy} desc={artifact.desc} tags={artifact.tags} />}
        {tab === "source" && (
          <div className="nk-links">
            {artifact.github && <a href={artifact.github} target="_blank" rel="noreferrer">source on github</a>}
            {artifact.live && <a href={artifact.live} target="_blank" rel="noreferrer">live</a>}
            {!artifact.github && !artifact.live && <span className="nk-tags">no public link</span>}
          </div>
        )}
      </div>
    </aside>
  );
}
