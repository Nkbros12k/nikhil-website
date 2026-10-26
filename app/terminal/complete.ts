import { artifacts } from "@/data/artifacts";
import { skills } from "@/data/skills";
import { tracks } from "@/data/tracks";

import { ALIASES, commands } from "./commands";
import { resolve, roles } from "./filesystem";
import { commonPrefix } from "./text";
import type { Ctx } from "./types";

export type Completion = { candidates: string[]; completed: string };

const PATH_COMMANDS = ["ls", "cd", "cat"];

const argOptions: Record<string, () => string[]> = {
  experience: () => roles.map((r) => r.slug),
  open: () => artifacts.map((a) => a.slug),
  skills: () => skills.map((s) => s.name),
  resume: () => tracks.map((t) => t.slug),
};

const pathCandidates = (typed: string, cwd: string[]): string[] => {
  const cut = typed.lastIndexOf("/") + 1;
  const dirPart = typed.slice(0, cut);
  const base = typed.slice(cut).toLowerCase();
  const dir = dirPart ? resolve(cwd, dirPart) : resolve(cwd, ".");
  if (!dir?.node.children) return [];
  return dir.node.children
    .filter((c) => c.name.toLowerCase().startsWith(base))
    .map((c) => dirPart + c.name + (c.kind === "dir" ? "/" : ""));
};

const join = (head: string, candidates: string[]): Completion => {
  const prefix = commonPrefix(candidates);
  const single = candidates.length === 1 && !candidates[0].endsWith("/");
  return { candidates, completed: head + prefix + (single ? " " : "") };
};

/** Completes the last word of the input. Tab in the UI calls this. */
export function complete(input: string, ctx: Ctx): Completion {
  const trailing = /\s$/.test(input);
  const words = input.trimStart().split(/\s+/).filter(Boolean);
  if (words.length === 0 || (words.length === 1 && !trailing)) {
    const typed = words[0] ?? "";
    const slash = typed.startsWith("/") ? "/" : "";
    const bare = typed.replace(/^\//, "").toLowerCase();
    const real = Object.keys(commands).filter((n) => n.startsWith(bare)).sort();
    const aliases = Object.keys(ALIASES).filter((a) => /^[a-z]/.test(a) && a.startsWith(bare)).sort();
    return join(slash, real.length ? real : aliases);
  }
  const command = ALIASES[words[0].replace(/^\//, "").toLowerCase()] ?? words[0].replace(/^\//, "").toLowerCase();
  const typed = trailing ? "" : words[words.length - 1];
  const head = input.slice(0, input.length - typed.length);
  const pool = PATH_COMMANDS.includes(command)
    ? pathCandidates(typed, ctx.cwd)
    : (argOptions[command]?.() ?? []).filter((o) => o.startsWith(typed.toLowerCase()));
  return pool.length ? join(head, pool) : { candidates: [], completed: input };
}
