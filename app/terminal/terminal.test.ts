import { describe, expect, it } from "vitest";

import { artifacts } from "@/data/artifacts";
import { skills } from "@/data/skills";
import { tracks } from "@/data/tracks";

import { commands, run } from "./commands";
import { complete } from "./complete";
import { resolve, roles } from "./filesystem";
import type { Block } from "./types";

const home = { cwd: [] as string[] };

const textOf = (blocks: Block[]) => JSON.stringify(blocks);

describe("commands", () => {
  it("returns content for every command that takes no argument", () => {
    const skip = ["clear", "cat", "cd", "open", "plain", "ls", "pwd"];
    for (const name of Object.keys(commands).filter((n) => !skip.includes(n))) {
      expect(run(`/${name}`, home).blocks.length, name).toBeGreaterThan(0);
    }
  });

  it("opens every artifact by slug", () => {
    for (const a of artifacts) expect(run(`/open ${a.slug}`, home).artifact).toBe(a.slug);
  });

  it("shows every role and every skill by name", () => {
    for (const r of roles) expect(textOf(run(`/experience ${r.slug}`, home).blocks)).toContain(r.org);
    for (const s of skills) expect(run(`/skills ${s.name}`, home).blocks[1]).toMatchObject({ type: "skills", only: s.name });
  });

  it("resolves a résumé for each track", () => {
    for (const t of tracks) expect(run(`/resume ${t.slug}`, home).blocks.at(-1)).toMatchObject({ type: "resume", track: t.slug });
  });

  it("rejects an unknown slug without opening anything", () => {
    expect(run("/open nope", home).artifact).toBeUndefined();
    expect(textOf(run("/experience nope", home).blocks)).toContain("No role");
  });

  it("routes plain-language questions to the right command", () => {
    expect(run("what projects have you built", home).blocks[0]).toMatchObject({ call: "Read(projects/)" });
    expect(run("tell me about your experience", home).blocks[0]).toMatchObject({ call: "Read(experience/)" });
    expect(run("send me your ux resume", home).blocks.at(-1)).toMatchObject({ type: "resume", track: "ux" });
  });

  it("falls back to suggestions for input it cannot match", () => {
    expect(run("zzzz qqqq", home).blocks[0]).toMatchObject({ type: "notfound" });
  });
});

describe("shell navigation", () => {
  it("cd into a folder changes the working directory", () => {
    expect(run("cd projects", home).cwd).toEqual(["projects"]);
    expect(run("cd ..", { cwd: ["projects"] }).cwd).toEqual([]);
    expect(run("cd", { cwd: ["projects"] }).cwd).toEqual([]);
  });

  it("cd to a project file opens its artifact", () => {
    expect(run("cd projects/perspect", home).artifact).toBe("perspect");
    expect(run("cat projects/perspect.artifact", home).artifact).toBe("perspect");
  });

  it("resolves every project and role path from the root", () => {
    for (const a of artifacts) expect(resolve([], `projects/${a.slug}`)).not.toBeNull();
    for (const r of roles) expect(resolve([], `~/experience/${r.slug}`)).not.toBeNull();
    expect(resolve([], "projects/nope")).toBeNull();
  });

  it("reports a missing path", () => {
    expect(textOf(run("cd nowhere", home).blocks)).toContain("no such file");
  });
});

describe("tab completion", () => {
  it("completes a command name", () => {
    expect(complete("/proj", home).completed).toBe("/projects ");
    expect(complete("exp", home).candidates).toContain("experience");
  });

  it("completes arguments for each command", () => {
    expect(complete("/open pers", home).completed).toBe("/open perspect ");
    expect(complete("/resume u", home).completed).toBe("/resume ux ");
    expect(complete("cd pro", home).completed).toBe("cd projects/");
    expect(complete("cd projects/per", home).completed).toBe("cd projects/perspect ");
  });

  it("leaves unknown input alone", () => {
    expect(complete("/open zz", home)).toEqual({ candidates: [], completed: "/open zz" });
  });
});

describe("copy rules", () => {
  const banned = [/—/, /–/, /\bgenuinely\b/i, /\bactually\b/i, /headshot/i, /\breally\b/i];
  it("keeps banned characters and words out of every command output", () => {
    const inputs = ["/whoami", "/now", "/extras", "/education", "/certs", "/skills", "/help", "/projects", "/experience", ...artifacts.map((a) => `/open ${a.slug}`)];
    for (const input of inputs) {
      const out = textOf(run(input, home).blocks);
      for (const re of banned) expect(out, `${input} ${re}`).not.toMatch(re);
    }
  });
});
