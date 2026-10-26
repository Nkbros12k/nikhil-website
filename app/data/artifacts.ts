/* Artifacts opened by the terminal. Copied from the project list the old site
   already showed, plus the case studies in projects.ts that it did not list. */

import { byslug } from "./projects";

export type Artifact = {
  slug: string;
  title: string;
  desc: string;
  image?: string;
  tags: string[];
  github?: string;
  live?: string;
  /** Slug in projects.ts when a full case study exists. */
  caseStudy?: string;
};

const listed: Artifact[] = [
  {
    slug: "gravity-zero",
    title: "Gravity-Zero",
    desc: "Fully local AI IDE. A three-agent triad (Planner, Coder, Reviewer) runs against a quantized Qwen 2.5 Coder 7B model served by LM Studio, with a Monaco-based editor and FastAPI backend. No data leaves the machine.",
    image: "/work/gravity-zero/ide.jpg",
    tags: [
      "Python",
      "FastAPI",
      "React",
      "LM Studio"
    ],
    github: "https://github.com/Nkbros12k/gravity-zero"
  },
  {
    slug: "intel",
    title: "Intel Data Center Analysis",
    desc: "Analyzed 4M+ rows of hourly U.S. energy-generation data in Tableau to recommend a region for a new data center, building calculated fields, a parameter-driven dual-axis time series, a tree map, and an interactive dashboard. Recommended the Northwest on surplus capacity and a 52% renewable mix.",
    image: "/work/intel/energy-by-region.jpg",
    tags: [
      "Tableau",
      "Excel",
      "Data Viz"
    ]
  },
  {
    slug: "netsentinel",
    title: "NetSentinel",
    desc: "Real-time ML-powered network intrusion detection. XGBoost multi-class classifier on NSL-KDD (77% accuracy, 96% DoS precision), FastAPI backend with WebSocket threat broadcasts, React + 3D globe dashboard, and Kubernetes auto-scaling.",
    image: "/work/netsentinel/dashboard.jpg",
    tags: [
      "Python",
      "XGBoost",
      "FastAPI",
      "Kubernetes"
    ],
    github: "https://github.com/Nkbros12k/netsentinel"
  },
  {
    slug: "perspect",
    title: "Perspect AI",
    desc: "Real-time AI debate engine where expert personas argue any topic, then generate a personalized study guide. Built at the Hooked on Claude Hackathon.",
    image: "/work/perspect/debate.jpg",
    tags: [
      "React",
      "Express",
      "Gemini AI",
      "SSE Streaming"
    ],
    github: "https://github.com/Nkbros12k/claudehackathon26",
    live: "https://tryperspect.com",
    caseStudy: "perspect"
  },
  {
    slug: "sbi-reports",
    title: "SBI Reports Feature",
    desc: "Supabase-backed Reports feature for the UT Austin Sustainable Building Initiative org website. Postgres schema, validated image storage bucket, and Next.js front-end integration, shipped end to end.",
    image: "/work/sbi/website.jpg",
    tags: [
      "Next.js",
      "Supabase",
      "Postgres",
      "Bun"
    ],
    github: "https://github.com/Nkbros12k/sbi-reports-case-study"
  },
  {
    slug: "tradbot",
    title: "TradBot",
    desc: "Algorithmic paper trading bot using RSI + SMA signals with auto take-profit at +3% and stop-loss at -1.5%. Live Flask dashboard with 15s auto-refresh, day P/L, open positions, and full trade feed. Market-hours aware.",
    image: "/work/tradbot/backtest.jpg",
    tags: [
      "Python",
      "Flask",
      "RSI",
      "SMA"
    ],
    github: "https://github.com/Nkbros12k/tradbot"
  },
  {
    slug: "blood-buddy",
    title: "Blood Buddy",
    desc: "Nonprofit platform connecting 8,000+ global blood donors and recipients, matching by location and blood type. Enabled 100+ successful transfers worldwide. Founded as a high-schooler.",
    tags: [
      "Full-Stack",
      "Database",
      "Nonprofit"
    ],
    caseStudy: "blood-buddy"
  },
  {
    slug: "gemini-exporter",
    title: "Gemini Chat Exporter",
    desc: "Open-source Chrome extension, shipped through GitHub releases, that exports Google Gemini conversations to JSON, Markdown, TXT, CSV, or PDF with one click.",
    image: "/work/gemini/popup.jpg",
    tags: [
      "JavaScript",
      "Chrome Ext",
      "PDF Export"
    ],
    github: "https://github.com/Nkbros12k/gemini-exporter"
  },
  {
    slug: "datahack",
    title: "DataHack 2026",
    desc: "UT Austin MLDS competition: predicted music streaming skip behavior and optimized customer lifetime value using UMAP clustering and ensemble ML models.",
    image: "/work/datahack/title.jpg",
    tags: [
      "Python",
      "LightGBM",
      "CatBoost",
      "UMAP"
    ],
    github: "https://github.com/MLDS-UT-Austin/mlds-datahack-2026-akhilkotturi"
  },
  {
    slug: "findmyitem",
    title: "FindMyItem App",
    desc: "ML-powered accessibility app using Google Teachable Machine to help seniors locate misplaced items. Trained a custom object recognition model with a senior-friendly interface.",
    tags: [
      "Python",
      "ML",
      "Accessibility"
    ]
  },
  {
    slug: "raspberry-pi",
    title: "Raspberry Pi Ecosystem",
    desc: "Automated ecosystem integrating a 3D printer, Pi-Hole ad-blocker, and remote access, all controlled via custom Python scripts on a Raspberry Pi.",
    tags: [
      "Raspberry Pi",
      "Python",
      "Pi-Hole",
      "Networking"
    ]
  }
];

/** Case studies that were not in the old project grid. */
const fromCaseStudy = (slug: string): Artifact[] => {
  const p = byslug(slug);
  if (!p) return [];
  return [{ slug: p.slug, title: p.title, desc: p.summary, image: p.cover?.src, tags: [p.domain, p.role], live: p.link?.href, caseStudy: p.slug }];
};

export const artifacts: Artifact[] = [
  ...listed,
  ...["hc4a", "drone"].filter((s) => !listed.some((a) => a.slug === s)).flatMap(fromCaseStudy),
];

export const artifactBySlug = (slug?: string) => artifacts.find((a) => a.slug === slug);
