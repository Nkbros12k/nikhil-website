/* Skills shown by /skills, written like SKILL.md entries. Every entry cites work
   that backs it. DRAFT, Nikhil reviews the wording. */

export type Skill = {
  name: string;
  description: string;
  triggers: string[];
  tools: string[];
  evidence: { label: string; slug?: string }[];
};

export const skills: Skill[] = [
  {
    name: "streaming-ai-products",
    description: "Ships LLM products where the answer streams in and every claim cites a source.",
    triggers: ["multi-agent pipelines", "token streaming", "search grounding"],
    tools: ["Bun", "Express", "Server-Sent Events", "Gemini", "Claude API"],
    evidence: [{ label: "Perspect", slug: "perspect" }],
  },
  {
    name: "full-stack-web",
    description: "Takes a feature from schema to deployed screen, including auth, storage and CI.",
    triggers: ["new product", "internal tool", "org website"],
    tools: ["React", "Next.js", "Vite", "Tailwind", "Supabase", "Postgres", "Vercel", "Render"],
    evidence: [{ label: "Perspect", slug: "perspect" }, { label: "SBI Reports feature" }],
  },
  {
    name: "computer-vision",
    description: "Trains detection models on a laptop GPU and finds why they fail on new camera angles.",
    triggers: ["road cracks", "drone imagery", "domain gap"],
    tools: ["YOLOv11", "Ultralytics", "Roboflow", "OpenCV", "Python"],
    evidence: [{ label: "Drone road-inspection research", slug: "drone" }],
  },
  {
    name: "applied-ml",
    description: "Builds and compares classifiers and forecasting models on large tabular data.",
    triggers: ["skip prediction", "lifetime value", "threat detection"],
    tools: ["XGBoost", "LightGBM", "CatBoost", "scikit-learn", "UMAP", "Pandas"],
    evidence: [{ label: "DataHack 2026, 5th place" }, { label: "NetSentinel" }],
  },
  {
    name: "self-hosted-infra",
    description: "Runs storage, backups and monitoring on infrastructure you own.",
    triggers: ["object storage", "backups", "disk monitoring", "autoscaling"],
    tools: ["Docker", "MinIO", "restic", "Backblaze B2", "Kubernetes", "GitHub Actions"],
    evidence: [{ label: "BizFirst AI internship" }, { label: "NetSentinel" }],
  },
  {
    name: "mcp-and-agents",
    description: "Gives AI agents tools they can call safely against a real API.",
    triggers: ["tool calling", "agent orchestration", "schema generation"],
    tools: ["MCP", "multi-agent orchestration", "Python", "C#/.NET"],
    evidence: [{ label: "BizFirst AI internship" }, { label: "Gravity-Zero" }],
  },
  {
    name: "security-fundamentals",
    description: "Thinks like an attacker when reviewing a system, backed by years of competitions.",
    triggers: ["pen testing", "OSINT", "forensics", "capture the flag"],
    tools: ["ethical hacking", "network security", "digital forensics"],
    evidence: [{ label: "CyberPatriot State Semi-Finalist" }, { label: "National Cyber Scholar" }],
  },
  {
    name: "product-design-and-research",
    description: "Designs the flow, tests it with real users, then builds it in code.",
    triggers: ["onboarding", "event apps", "user research"],
    tools: ["Figma", "wireframing", "usability testing", "React"],
    evidence: [{ label: "AI with All participant app", slug: "hc4a" }, { label: "Perspect", slug: "perspect" }],
  },
  {
    name: "data-analysis",
    description: "Turns millions of rows into a recommendation someone can act on.",
    triggers: ["dashboards", "A/B tests", "KPI analysis"],
    tools: ["Tableau", "Excel", "Python", "statistics"],
    evidence: [{ label: "Intel data center analysis" }, { label: "Grammys website analysis" }],
  },
  {
    name: "esg-consulting",
    description: "Explains sustainability reporting standards to clients and trains their teams.",
    triggers: ["IFRS S1 and S2", "GRI", "materiality assessment"],
    tools: ["workshop design", "regulatory research", "slide training modules"],
    evidence: [{ label: "ICELIS Global internship" }],
  },
  {
    name: "team-leadership",
    description: "Leads engineering teams, reviews every merge and brings new members up to speed.",
    triggers: ["recruiting", "client communication", "code review"],
    tools: ["roadmapping", "onboarding", "GitHub"],
    evidence: [{ label: "SBI Tech Director" }, { label: "Blood Buddy", slug: "blood-buddy" }],
  },
];
