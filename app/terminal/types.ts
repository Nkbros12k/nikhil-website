import type { TrackRole, TrackSlug } from "@/data/tracks";

export type Suggestion = { label: string; cmd: string };

export type Block =
  | { type: "prose"; lines: string[] }
  | { type: "tool"; call: string; result: string[] }
  | { type: "list"; title?: string; items: (Suggestion & { hint?: string })[] }
  | { type: "roles"; items: TrackRole[] }
  | { type: "skills"; only?: string }
  | { type: "resume"; track: TrackSlug }
  | { type: "contact" }
  | { type: "notfound"; input: string; suggest: Suggestion[] };

export type Ctx = { cwd: string[] };

export type Result = {
  blocks: Block[];
  cwd?: string[];
  artifact?: string | null;
  clear?: boolean;
  navigate?: string;
};
