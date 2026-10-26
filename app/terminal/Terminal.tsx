import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { profile } from "@/data/profile";

import { ArtifactPanel } from "./ArtifactPanel";
import { BlockView } from "./BlockView";
import { MAIN_CHIPS, MENU, run } from "./commands";
import { complete } from "./complete";
import { pathLabel } from "./filesystem";
import { Thinking } from "./Thinking";
import type { Block } from "./types";
import "./terminal.css";

type Entry = { id: number; input: string; blocks: Block[]; born: number };

type Props = { initial?: string[] };

const THINK_MS = 650;
const STEP_MS = 240;
const TICK_MS = 80;
const INSTANT = 0;

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const visibleCount = (entry: Entry, now: number) => {
  if (entry.born === INSTANT) return entry.blocks.length;
  const elapsed = now - entry.born - THINK_MS;
  return elapsed < 0 ? 0 : Math.min(entry.blocks.length, Math.floor(elapsed / STEP_MS) + 1);
};

export default function Terminal({ initial = ["/whoami"] }: Props) {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [now, setNow] = useState(() => Date.now());
  const [cwd, setCwd] = useState<string[]>([]);
  const [artifact, setArtifact] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [menuIndex, setMenuIndex] = useState(0);
  const [menuClosed, setMenuClosed] = useState(false);
  const nextId = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const booted = useRef(false);
  const cwdRef = useRef<string[]>([]);

  const menuItems = useMemo(() => {
    if (menuClosed || !value.startsWith("/") || value.includes(" ")) return [];
    return MENU.filter((m) => m.cmd.startsWith(value.toLowerCase()));
  }, [value, menuClosed]);

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
      const born = prefersReducedMotion() ? INSTANT : Date.now();
      setEntries((prev) => [...prev, { id: nextId.current++, input, blocks: result.blocks, born }]);
    },
    [navigate],
  );

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    initial.forEach(exec);
  }, [exec, initial]);

  const pending = entries.some((e) => visibleCount(e, now) < e.blocks.length);

  useEffect(() => {
    if (!pending) return;
    const timer = setInterval(() => setNow(Date.now()), TICK_MS);
    return () => clearInterval(timer);
  }, [pending]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [entries, now]);

  const skip = () => setEntries((prev) => prev.map((e) => ({ ...e, born: INSTANT })));

  const submit = (input: string) => {
    const text = input.trim();
    if (!text) return;
    skip();
    exec(text);
    setHistory((h) => [text, ...h]);
    setCursor(-1);
    setValue("");
    setMenuClosed(false);
    inputRef.current?.focus();
  };

  const onMenuKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      return setMenuIndex((i) => (i + step + menuItems.length) % menuItems.length);
    }
    const picked = menuItems[Math.min(menuIndex, menuItems.length - 1)];
    if (e.key === "Tab") {
      e.preventDefault();
      return setValue(`${picked.cmd} `);
    }
    if (e.key === "Enter") return submit(picked.cmd);
    if (e.key === "Escape") setMenuClosed(true);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (menuItems.length) return onMenuKey(e);
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
          <span className="crumb"><span className="nk-dot" aria-hidden="true" /><b>{profile.handle}</b> {pathLabel(cwd)}</span>
          <Link to="/plain">plain view</Link>
        </header>
        <div className="nk-log" ref={logRef} role="log" aria-live="polite">
          <div className="nk-log-inner">
            <section className="nk-welcome">
              <h1>{profile.name.toLowerCase()}</h1>
              <div className="tag">{profile.tagline}</div>
              <div className="meta"><b>cwd</b> {pathLabel(cwd)} · try /projects, /skills or ask a question in plain words</div>
            </section>
            {entries.map((entry) => {
              const count = visibleCount(entry, now);
              return (
                <section className="nk-entry" key={entry.id}>
                  <div className="nk-user">{entry.input}</div>
                  <div className="nk-asst">
                    <div className="nk-mark" aria-hidden="true">nk</div>
                    <div className="nk-asst-body">
                      {count === 0 && entry.blocks.length > 0 && <Thinking since={entry.born} now={now} />}
                      {entry.blocks.slice(0, count).map((block, i) => (
                        <BlockView key={i} block={block} onRun={submit} />
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
        <div className="nk-dock">
          <div className="nk-dock-inner">
            {menuItems.length > 0 && (
              <div className="nk-menu" role="listbox" aria-label="Commands">
                {menuItems.map((m, i) => (
                  <button key={m.cmd} role="option" aria-selected={i === menuIndex} onMouseEnter={() => setMenuIndex(i)} onClick={() => submit(m.cmd)}>
                    <span className="cmd">{m.cmd}</span>
                    <span className="hint">{m.hint}</span>
                  </button>
                ))}
              </div>
            )}
            <nav className="nk-chips" aria-label="Quick commands">
              {MAIN_CHIPS.map((c) => (
                <button className="nk-chip" key={c.cmd} onClick={() => submit(c.cmd)}>{c.label}</button>
              ))}
            </nav>
            <div className="nk-composer">
              <span className="prompt" aria-hidden="true">›</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setMenuIndex(0);
                  setMenuClosed(false);
                }}
                onKeyDown={onKeyDown}
                placeholder="type / for commands or ask something"
                aria-label="Command"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                autoFocus
              />
              <button className="nk-send" onClick={() => submit(value)} disabled={!value.trim()} aria-label="Run command">↵</button>
            </div>
            <div className="nk-hints">
              <span>/ for commands · tab completes · up arrow repeats</span>
              <span>esc closes the artifact</span>
            </div>
          </div>
        </div>
      </main>
      {artifact && <ArtifactPanel slug={artifact} onClose={() => setArtifact(null)} />}
    </div>
  );
}
