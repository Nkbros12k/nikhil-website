import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { profile } from "@/data/profile";

import { ArtifactPanel } from "./ArtifactPanel";
import { BlockView } from "./BlockView";
import { MAIN_CHIPS, run } from "./commands";
import { complete } from "./complete";
import { pathLabel } from "./filesystem";
import type { Block } from "./types";
import "./terminal.css";

type Entry = { id: number; input: string; blocks: Block[]; shown: number };

type Props = { initial?: string[] };

const REVEAL_MS = 170;
const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Terminal({ initial = ["/whoami"] }: Props) {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [cwd, setCwd] = useState<string[]>([]);
  const [artifact, setArtifact] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const nextId = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const booted = useRef(false);
  const cwdRef = useRef<string[]>([]);

  const exec = useCallback(
    (input: string) => {
      const result = run(input, { cwd: cwdRef.current });
      if (result.navigate) return navigate(result.navigate);
      if (result.clear) return setEntries([]);
      if (result.cwd) {
        cwdRef.current = result.cwd;
        setCwd(result.cwd);
      }
      if (result.artifact !== undefined) setArtifact(result.artifact);
      const shown = prefersReducedMotion() ? result.blocks.length : 0;
      setEntries((prev) => [...prev, { id: nextId.current++, input, blocks: result.blocks, shown }]);
    },
    [navigate],
  );

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    initial.forEach(exec);
  }, [exec, initial]);

  useEffect(() => {
    const pending = entries.some((e) => e.shown < e.blocks.length);
    if (!pending) return;
    const timer = setInterval(() => {
      setEntries((prev) => prev.map((e) => (e.shown < e.blocks.length ? { ...e, shown: e.shown + 1 } : e)));
    }, REVEAL_MS);
    return () => clearInterval(timer);
  }, [entries]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [entries]);

  const skip = () => setEntries((prev) => prev.map((e) => ({ ...e, shown: e.blocks.length })));

  const submit = (input: string) => {
    const text = input.trim();
    if (!text) return;
    skip();
    exec(text);
    setHistory((h) => [text, ...h]);
    setCursor(-1);
    setValue("");
    inputRef.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") return submit(value);
    if (e.key === "Tab") {
      e.preventDefault();
      return setValue(complete(value, { cwd }).completed);
    }
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      setCursor(next);
      return setValue(history[next]);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(cursor - 1, -1);
      setCursor(next);
      return setValue(next === -1 ? "" : history[next]);
    }
    if (e.key === "Escape") setArtifact(null);
    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setEntries([]);
    }
  };

  return (
    <div className="nk">
      <main className="nk-main" onClick={skip}>
        <header className="nk-head">
          <span><b>{profile.handle}</b> {pathLabel(cwd)}</span>
          <Link to="/plain">plain view</Link>
        </header>
        <div className="nk-log" ref={logRef} role="log" aria-live="polite">
          <div className="nk-log-inner">
            <h1 style={{ margin: 0, fontSize: 14, fontWeight: 400 }}>
              <b>{profile.name.toLowerCase()}</b> <span style={{ color: "var(--dim)" }}>{profile.tagline}</span>
            </h1>
            {entries.map((entry) => (
              <section className="nk-entry" key={entry.id}>
                <div className="nk-cmd">{entry.input}</div>
                {entry.shown === 0 && <div className="nk-think">thinking</div>}
                {entry.blocks.slice(0, entry.shown).map((block, i) => (
                  <BlockView key={i} block={block} onRun={submit} />
                ))}
              </section>
            ))}
          </div>
        </div>
        <nav className="nk-chips" aria-label="Quick commands">
          {MAIN_CHIPS.map((c) => (
            <button className="nk-chip" key={c.cmd} onClick={() => submit(c.cmd)}>{c.label}</button>
          ))}
        </nav>
        <div className="nk-input">
          <span className="prompt" aria-hidden="true">›</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="type a command or ask something"
            aria-label="Command"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            autoFocus
          />
        </div>
        <div className="nk-status">
          <span>tab completes, up arrow repeats</span>
          <span>/help lists everything</span>
        </div>
      </main>
      {artifact && <ArtifactPanel slug={artifact} onClose={() => setArtifact(null)} />}
    </div>
  );
}
