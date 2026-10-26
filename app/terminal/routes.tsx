import { Navigate, useParams } from "react-router-dom";

import { artifactBySlug } from "@/data/artifacts";
import { tracks } from "@/data/tracks";

import Terminal from "./Terminal";

/** /work/:slug opens the terminal with that artifact already shown. */
export function WorkRoute() {
  const { slug } = useParams();
  if (!artifactBySlug(slug)) return <Navigate to="/" replace />;
  return <Terminal key={slug} initial={[`/open ${slug}`]} />;
}

/** /cs, /ux, /consulting, /business open the terminal on that résumé track. */
export function TrackRoute() {
  const { track } = useParams();
  if (!tracks.some((t) => t.slug === track)) return <Navigate to="/" replace />;
  return <Terminal key={track} initial={[`/resume ${track}`]} />;
}
