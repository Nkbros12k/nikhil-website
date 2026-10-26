import { artifactBySlug, artifacts } from "@/data/artifacts";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { tracks } from "@/data/tracks";
import type { TrackSlug } from "@/data/tracks";

import { pathLabel, resolve, roles, root } from "./filesystem";
import type { Block, Ctx, Result, Suggestion } from "./types";

type Handler = (args: string[], ctx: Ctx) => Result;

const prose = (...lines: string[]): Result => ({ blocks: [{ type: "prose", lines }] });
const show = (blocks: Block[], extra: Partial<Result> = {}): Result => ({ blocks, ...extra });

export const MAIN_CHIPS: Suggestion[] = [
  { label: "/whoami", cmd: "/whoami" },
  { label: "/experience", cmd: "/experience" },
  { label: "/projects", cmd: "/projects" },
  { label: "/skills", cmd: "/skills" },
  { label: "/resume", cmd: "/resume" },
  { label: "/contact", cmd: "/contact" },
];

const HELP: Record<string, string> = {
  "/whoami": "who I am",
  "/experience": "roles and what I did in them",
  "/projects": "things I built, opened as artifacts",
  "/skills": "what I can do, with proof",
  "/resume": "download a résumé by track",
  "/contact": "get in touch",
  "/education": "school and coursework",
  "/certs": "certifications and competitions",
  "/now": "what I am working on",
  "/extras": "outside of code",
};

/** Entries shown in the slash menu while typing a command. */
export const MENU: { cmd: string; hint: string }[] = [
  ...Object.keys(HELP).map((cmd) => ({ cmd, hint: HELP[cmd] })),
  { cmd: "/help", hint: "every command" },
  { cmd: "/plain", hint: "the same content as a normal page" },
  { cmd: "/clear", hint: "clear the screen" },
];

const trackSlugs = tracks.map((t) => t.slug as string);

const whoami: Handler = () =>
  show([
    { type: "tool", call: "Read(whoami.md)", result: [`${profile.name}, ${profile.location}`] },
    { type: "prose", lines: [...profile.whoami] },
  ]);

const experience: Handler = ([slug]) => {
  if (!slug) {
    return show([
      { type: "tool", call: "Read(experience/)", result: [`${roles.length} roles`] },
      {
        type: "list",
        items: roles.map((r) => ({ label: r.slug, hint: `${r.role}, ${r.when}`, cmd: `/experience ${r.slug}` })),
      },
    ]);
  }
  const role = roles.find((r) => r.slug === slug);
  if (!role) return prose(`No role called "${slug}". Try /experience to see the list.`);
  return show([
    { type: "tool", call: `Read(experience/${role.slug})`, result: [role.org] },
    { type: "roles", items: [role] },
  ]);
};

const education: Handler = () => {
  const coursework = [...new Set(tracks.flatMap((t) => t.coursework ?? []))];
  const blocks: Block[] = [
    { type: "tool", call: "Read(education.md)", result: ["UT Austin"] },
    { type: "prose", lines: [profile.school] },
  ];
  if (coursework.length) {
    blocks.push({ type: "list", title: "Coursework", items: coursework.map((c) => ({ label: c, cmd: "/education" })) });
  }
  return show(blocks);
};

const certs: Handler = () =>
  show([
    { type: "tool", call: "Read(certs.md)", result: [`${profile.certs.length} entries`] },
    { type: "list", items: profile.certs.map((c) => ({ label: c.name, hint: c.org, cmd: "/certs" })) },
  ]);

const now: Handler = () => show([{ type: "tool", call: "Read(now.md)", result: [] }, { type: "prose", lines: [...profile.now] }]);

const extras: Handler = () =>
  show([{ type: "list", title: "Outside of code", items: profile.extras.map((e) => ({ label: e, cmd: "/extras" })) }]);

const projects: Handler = () =>
  show([
    { type: "tool", call: "Read(projects/)", result: [`${artifacts.length} artifacts`] },
    { type: "list", items: artifacts.map((a) => ({ label: a.slug, hint: a.title, cmd: `/open ${a.slug}` })) },
  ]);

const open: Handler = ([slug]) => {
  const artifact = artifactBySlug(slug);
  if (!artifact) return prose(slug ? `No artifact called "${slug}". Try /projects.` : "Open what? Try /projects.");
  return show([{ type: "tool", call: `Open(${artifact.slug}.artifact)`, result: [artifact.title] }], { artifact: artifact.slug });
};

const skillsCmd: Handler = ([name]) => {
  if (name && !skills.some((s) => s.name === name)) return prose(`No skill called "${name}". Try /skills.`);
  const call = name ? `Read(skills/${name}.skill)` : "Read(skills/)";
  return show([{ type: "tool", call, result: [] }, { type: "skills", only: name }]);
};

const resume: Handler = ([track]) => {
  if (track && !trackSlugs.includes(track)) return prose(`No track called "${track}". Pick one of ${trackSlugs.join(", ")}.`);
  const picks = track ? [track] : trackSlugs;
  return show([
    { type: "tool", call: "Read(resume/)", result: [`${picks.length} PDF${picks.length > 1 ? "s" : ""}`] },
    ...picks.map((t): Block => ({ type: "resume", track: t as TrackSlug })),
  ]);
};

const contact: Handler = () => show([{ type: "contact" }]);

const help: Handler = () =>
  show([
    {
      type: "list",
      title: "Commands",
      items: [
        ...Object.keys(HELP).map((cmd) => ({ label: cmd, hint: HELP[cmd], cmd })),
        { label: "ls, cd, cat, pwd", hint: "move around the folders like a shell", cmd: "ls" },
        { label: "/plain", hint: "same content as a normal page", cmd: "/plain" },
        { label: "/clear", hint: "clear the screen", cmd: "/clear" },
      ],
    },
    { type: "prose", lines: ['You can also ask in plain words, like "what projects have you built".'] },
  ]);

const ls: Handler = ([path], ctx) => {
  const target = resolve(ctx.cwd, path ?? ".");
  if (!target) return prose(`ls: ${path}: no such file or directory`);
  const kids = target.node.children ?? [target.node];
  return show([{ type: "list", items: kids.map((k) => ({ label: k.kind === "dir" ? `${k.name}/` : k.name, cmd: k.cmd })) }]);
};

const cat: Handler = ([path], ctx) => {
  const target = path ? resolve(ctx.cwd, path) : null;
  if (!target) return prose(path ? `cat: ${path}: no such file or directory` : "cat: which file?");
  return run(target.node.cmd, ctx);
};

const cd: Handler = ([path], ctx) => {
  const target = path ? resolve(ctx.cwd, path) : { node: root, abs: [] as string[] };
  if (!target) return prose(`cd: ${path}: no such file or directory`);
  if (target.node.kind === "dir") return { ...run(target.node.cmd, ctx), cwd: target.abs };
  return run(target.node.cmd, ctx);
};

const pwd: Handler = (_args, ctx) => prose(pathLabel(ctx.cwd));
const clear: Handler = () => ({ blocks: [], clear: true });
const plain: Handler = () => ({ blocks: [{ type: "prose", lines: ["Opening the plain page."] }], navigate: "/plain" });

export const commands: Record<string, Handler> = {
  whoami, experience, education, certs, now, extras, projects, open,
  skills: skillsCmd, resume, contact, help, ls, cat, cd, pwd, clear, plain,
};

export const ALIASES: Record<string, string> = {
  who: "whoami", about: "whoami", exp: "experience", jobs: "experience", skill: "skills",
  cv: "resume", email: "contact", hire: "contact", view: "open", read: "cat", cls: "clear",
  "?": "help", commands: "help", project: "projects", cert: "certs", edu: "education",
};

export const INTENTS: [RegExp, string][] = [
  [/\b(experience|work history|jobs?|roles?|worked|intern)/i, "experience"],
  [/\b(projects?|built|build|portfolio|demos?|artifacts?|made)\b/i, "projects"],
  [/\b(skills?|stack|tech|languages?|good at)\b/i, "skills"],
  [/\b(resume|résumé|cv|download)\b/i, "resume"],
  [/\b(contact|email|reach|hire|linkedin|github|message)\b/i, "contact"],
  [/\b(school|education|degree|major|college|ut austin|classes|courses?)\b/i, "education"],
  [/\b(certs?|certifications?|awards?|credentials?|ctf)\b/i, "certs"],
  [/\b(now|currently|working on|up to)\b/i, "now"],
  [/\b(hobbies|hobby|violin|cars?|fun|outside)\b/i, "extras"],
  [/\b(who|about|introduc|yourself)/i, "whoami"],
  [/\b(help|what can|commands?|options)\b/i, "help"],
];

export function run(input: string, ctx: Ctx): Result {
  const text = input.trim();
  if (!text) return { blocks: [] };
  const [first, ...args] = text.replace(/^\//, "").split(/\s+/);
  const name = ALIASES[first.toLowerCase()] ?? first.toLowerCase();
  const handler = commands[name];
  if (handler) return handler(args.map((a) => a.toLowerCase()), ctx);
  const intent = INTENTS.find(([re]) => re.test(text));
  if (intent) {
    const track = trackSlugs.find((t) => new RegExp(`\\b${t}\\b`, "i").test(text));
    return commands[intent[1]](intent[1] === "resume" && track ? [track] : [], ctx);
  }
  return { blocks: [{ type: "notfound", input: text, suggest: MAIN_CHIPS }] };
}
