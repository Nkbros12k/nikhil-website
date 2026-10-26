const FRAMES = ["◐", "◓", "◑", "◒"];
const VERBS = ["reading", "digging", "stitching", "pulling it together"];
const FRAME_MS = 120;
const VERB_MS = 1400;

type Props = { since: number; now: number };

/** Spinner line shown while an answer is being put together. */
export function Thinking({ since, now }: Props) {
  const elapsed = Math.max(0, now - since);
  const glyph = FRAMES[Math.floor(elapsed / FRAME_MS) % FRAMES.length];
  const verb = VERBS[Math.floor(elapsed / VERB_MS) % VERBS.length];
  return (
    <div className="nk-think" aria-label="Working on it">
      <span className="glyph" aria-hidden="true">{glyph}</span>
      <span>{verb}</span>
      <span className="time">{(elapsed / 1000).toFixed(1)}s</span>
    </div>
  );
}
