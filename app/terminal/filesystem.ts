import { artifacts } from "@/data/artifacts";
import { skills } from "@/data/skills";
import { tracks } from "@/data/tracks";
import type { TrackRole } from "@/data/tracks";

import { kebab } from "./text";

export type Node = {
  name: string;
  kind: "dir" | "file";
  /** Command that shows this node, run by cat and cd. */
  cmd: string;
  children?: Node[];
};

const ORG_SHORT: [RegExp, string][] = [
  [/sustainable building/i, "sbi"],
  [/hc4a|hindu charities/i, "hc4a"],
  [/bizfirst/i, "bizfirst"],
  [/drone/i, "drone-research"],
  [/icelis/i, "icelis"],
  [/perspect/i, "perspect"],
  [/blood buddy/i, "blood-buddy"],
];

const shortOrg = (org: string) => ORG_SHORT.find(([re]) => re.test(org))?.[1] ?? kebab(org).split("-").slice(0, 2).join("-");

type Role = TrackRole & { slug: string };

const withUniqueSlugs = (items: Role[]): Role[] => {
  const used = new Map<string, number>();
  return items.map((item) => {
    const count = (used.get(item.slug) ?? 0) + 1;
    used.set(item.slug, count);
    return count === 1 ? item : { ...item, slug: `${item.slug}-${count}` };
  });
};


const buildRoles = (): Role[] => {
  const seen = new Set<string>();
  const unique = tracks.flatMap((t) => t.experience).filter((r) => {
    const key = `${shortOrg(r.org)}|${r.when}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const shaped = unique.map((r) => {
    const base = shortOrg(r.org);
    const clash = unique.filter((o) => shortOrg(o.org) === base).length > 1;
    const suffix = kebab(r.role).split("-").slice(0, 2).join("-");
    return { ...r, slug: clash ? `${base}-${suffix}` : base };
  });
  return withUniqueSlugs(shaped);
};

export const roles = buildRoles();

const dir = (name: string, cmd: string, children: Node[]): Node => ({ name, kind: "dir", cmd, children });
const file = (name: string, cmd: string): Node => ({ name, kind: "file", cmd });

export const root: Node = dir("nikhil", "/help", [
  file("whoami.md", "/whoami"),
  dir("experience", "/experience", roles.map((r) => file(r.slug, `/experience ${r.slug}`))),
  dir("projects", "/projects", artifacts.map((a) => file(a.slug, `/open ${a.slug}`))),
  dir("skills", "/skills", skills.map((s) => file(s.name, `/skills ${s.name}`))),
  dir("resume", "/resume", tracks.map((t) => file(t.slug, `/resume ${t.slug}`))),
  file("contact", "/contact"),
]);

const EXTENSIONS = /\.(md|artifact|pdf|skill)$/;

const child = (node: Node, name: string) =>
  node.children?.find((c) => c.name === name || c.name.replace(EXTENSIONS, "") === name.replace(EXTENSIONS, ""));

/** Walks a path from cwd. Returns the node and its absolute path, or null. */
export const resolve = (cwd: string[], path: string): { node: Node; abs: string[] } | null => {
  const parts = path.trim().replace(/^~\/?/, "/").split("/");
  let abs = path.trim().startsWith("/") || path.trim().startsWith("~") ? [] : [...cwd];
  let node = nodeAt(abs);
  for (const part of parts) {
    if (part === "" || part === ".") continue;
    if (part === "..") {
      abs = abs.slice(0, -1);
      node = nodeAt(abs);
      continue;
    }
    const next = node && child(node, part.toLowerCase());
    if (!next) return null;
    abs = [...abs, next.name];
    node = next;
  }
  return node ? { node, abs } : null;
};

function nodeAt(abs: string[]): Node | null {
  let node: Node | undefined = root;
  for (const name of abs) node = node && child(node, name);
  return node ?? null;
}

export const pathLabel = (cwd: string[]) => (cwd.length === 0 ? "~/nikhil" : `~/nikhil/${cwd.join("/")}`);
