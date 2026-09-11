/* Content for the four track pages. Every claim traces to a résumé source in
   Taildrive/Resume (noted per entry); nothing here is invented. */

export type TrackSlug = "cs" | "ux" | "consulting" | "business";

export type TrackRole = {
  org: string;
  role: string;
  when: string;
  where?: string;
  bullets: string[];
};

export type TrackWork = {
  title: string;
  desc: string;
  tags: string[];
  caseStudy?: string;
  href?: string;
  /** A real image of the work; omitted rather than faked. */
  image?: { src: string; alt: string };
};

export type Track = {
  slug: TrackSlug;
  label: string;
  title: string;
  titleAccent: string;
  blurb: string;
  intro: string;
  resume: string;
  showcase: "case-studies" | "projects" | "work";
  caseStudies?: string[];
  work?: TrackWork[];
  experience: TrackRole[];
  skills: { group: string; items: string[] }[];
  coursework?: string[];
};

export const tracks: Track[] = [
  {
    slug: "cs",
    label: "Software",
    title: "Software",
    titleAccent: "Engineering",
    blurb: "Full-stack AI products, backend infrastructure, and computer vision research, from Perspect to BizFirst AI.",
    intro:
      "I build full-stack products and the infrastructure under them, from AI apps with streaming backends to self-hosted storage and computer vision pipelines. I founded Perspect, shipped object storage and MCP tools as a software engineering intern at BizFirst AI, and lead the technical side of a drone road-inspection research team at UT Austin.",
    resume: "/resume/Nikhil-Kadiyala-Resume-CS.pdf",
    showcase: "projects",
    experience: [
      {
        org: "Sustainable Building Initiative (UT Austin)",
        role: "Tech Director",
        when: "Aug 2026 to Present",
        where: "Austin, TX",
        bullets: [
          "Lead a 10 to 15 person tech team building the organization website and related technical projects, reviewing and approving all work before branches merge to main",
          "Serve as primary technical point of contact for client-facing communication and run recruiting, interviews, and onboarding for new tech team members",
          "Lead the External Technologies function, tracking industry research and emerging tooling to inform the team's tech-stack decisions",
        ],
      }, // master-cs.html
      {
        org: "HC4A: AI with All Hackathon",
        role: "Tech Lead",
        when: "Jul 2026 to Present",
        where: "Austin, TX",
        bullets: [
          "Co-lead technology and student-council operations for Hindu Charities for America's hackathon (~600 participants, grades 8-12), coordinating with a data scientist and an AI/UX designer on a one-month build",
          "Design the participant app feature set, a privacy-aware per-participant UID scheme, and login and behavior tracking under COPPA and FERPA constraints",
        ],
      }, // master-cs.html
      {
        org: "BizFirst AI",
        role: "Software Engineering Intern",
        when: "Jun 2026 to Aug 2026",
        where: "Remote",
        bullets: [
          "Built and documented BizFirst's V1 self-hosted object storage on MinIO in Docker with tiered quotas scaling to 90% of disk, 365-day lifecycle expiration, and incremental restic snapshots to Backblaze B2 for offsite backup",
          "Built three MCP tools (create_form, update_form, delete_form) that let Octopus AI, BizFirst's multi-agent orchestrator, generate valid Atlas Forms JSON schemas and call the REST API from natural-language prompts",
          "Contributed to StorageStudio (open-source React UI for S3-compatible storage, owning backend API design) and AccumulateNodes (Accumulate blockchain integration in C#/.NET)",
        ],
      }, // master-cs.html
      {
        org: "SBI x UT Austin: Drone Road-Inspection Research",
        role: "Tech Lead",
        when: "May 2026 to Present",
        where: "Austin, TX",
        bullets: [
          "Lead the technical side of a ~10 person research team using drone imagery and computer vision to detect road cracks and stitch images into one continuous georeferenced road map",
          "Built an end-to-end proof of concept in days: wrote a Python pipeline slicing road-test video into ~785 road-cropped frames, then trained a YOLOv11 crack-detection model locally on GPU at zero cloud cost",
          "Authored the research brief setting technical direction across detection (YOLO vs segmentation vs VLM) and stitching (WebODM photogrammetry vs panorama), then split the team into sub-teams",
        ],
      }, // master-cs.html
      {
        org: "Sustainable Building Initiative (UT Austin)",
        role: "Software Developer, Tech Team",
        when: "Feb 2026 to Aug 2026",
        where: "Austin, TX",
        bullets: [
          "Designed and shipped the public-facing Reports feature end to end using Supabase (Postgres + storage bucket with image validation), Next.js, and Bun",
          "Integrated the front end with the Supabase backend for a production-ready reports workflow",
        ],
      }, // master-cs.html
      {
        org: "Perspect",
        role: "Founder",
        when: "Jan 2026 to Present",
        bullets: [
          "Designed and shipped a solo full-stack AI product where a panel of expert AI personas debates a topic, surfaces disagreements, cites web-searched sources, and outputs a structured briefing; originated at the Claude Hackathon 2026 (top-20 finish)",
          "Built the backend on Bun + Express with Server-Sent Events streaming for a multi-persona debate pipeline (personas, rebuttals, synthesizer) using Gemini 2.5 with Google Search grounding",
          "Deployed on Vercel + Render with a same-origin API proxy, keep-warm GitHub Action, Gemini spend guard, and CI pipeline (build, dependency audit, secret scan); Supabase for auth and analytics",
        ],
      }, // master-cs.html
    ],
    skills: [
      {
        group: "Languages",
        items: ["Python", "TypeScript", "JavaScript", "Java", "C#/.NET", "Lua", "HTML/CSS", "POSIX shell"],
      },
      {
        group: "Frontend & Backend",
        items: ["React", "Next.js", "Vite", "Tailwind CSS", "FastAPI", "Express", "Flask", "Node.js", "Bun"],
      },
      {
        group: "AI/ML & CV",
        items: [
          "XGBoost",
          "scikit-learn",
          "LightGBM",
          "CatBoost",
          "Pandas",
          "YOLO (v8/v11)",
          "Ultralytics",
          "Roboflow",
          "OpenCV",
          "LLM app development (Gemini, Claude API)",
          "Multi-agent orchestration",
          "MCP tool building",
        ],
      },
      {
        group: "Data & Infra",
        items: [
          "PostgreSQL",
          "Supabase",
          "MongoDB",
          "Docker",
          "Kubernetes (HPA)",
          "MinIO",
          "restic",
          "Backblaze B2",
          "GitHub Actions",
          "Vercel",
          "Render",
          "Tableau",
        ],
      },
      {
        group: "Cybersecurity",
        items: ["Ethical hacking", "OSINT", "Penetration testing", "CTFs", "Digital forensics"],
      },
    ],
  },
  {
    slug: "ux",
    label: "UX Design",
    title: "UX &",
    titleAccent: "Product Design",
    blurb: "Interface design, user research, and front-end builds, from Perspect's debate view to a hackathon app for ~600 students.",
    intro:
      "I design interfaces and build them myself, from user research and information architecture through React front ends. I designed and shipped Perspect's multi-persona debate view and contradiction map, and designed the screens for a hackathon app serving ~600 students in grades 8-12. I'm currently taking I 310U Introduction to User Experience Design at UT Austin.",
    resume: "/resume/Nikhil-Kadiyala-Resume-UX.pdf",
    showcase: "case-studies",
    caseStudies: ["perspect", "hc4a", "blood-buddy"],
    experience: [
      {
        org: "Sustainable Building Initiative (UT Austin)",
        role: "Tech Director",
        when: "Aug 2026 to Present",
        where: "Austin, TX",
        bullets: [
          "Lead a 10 to 15 person tech team building the organization website and related technical projects, reviewing and approving all work before branches merge to main",
          "Serve as primary technical point of contact for client-facing communication and run recruiting, interviews, and onboarding for new tech team members",
        ],
      }, // master-ux.html
      {
        org: "HC4A: AI with All Hackathon",
        role: "Tech Lead",
        when: "Jul 2026 to Present",
        where: "Austin, TX",
        bullets: [
          "Co-lead technology and student-council operations for Hindu Charities for America's hackathon (~600 participants, grades 8-12), coordinating with a data scientist and an AI/UX designer on a one-month build",
          "Designed the app's screens in Figma: a live Now / Next status ticker to cut cognitive load during a high-velocity event, a preset User ID sign-in to remove account-creation drop-off, a self-guided design-sprint roadmap, and a faceted directory across nonprofits, sponsors, and schools; benchmarked against SXSW, MLH, and Devpost",
          "Design the participant app feature set and a privacy-aware per-participant UID scheme under COPPA and FERPA constraints, scoped for 500 students, 100 teams, and 20 pods across two venues",
        ],
      }, // master-ux.html
      {
        org: "BizFirst AI",
        role: "Software Engineering Intern",
        when: "Jun 2026 to Aug 2026",
        where: "Remote",
        bullets: [
          "Contributed to StorageStudio (open-source React UI for S3-compatible storage, owning backend API design) and AccumulateNodes (Accumulate blockchain integration in C#/.NET)",
          "Built three MCP tools (create_form, update_form, delete_form) that let BizFirst's multi-agent orchestrator generate valid Atlas Forms JSON schemas and call the REST API from natural-language prompts",
        ],
      }, // master-ux.html
      {
        org: "SBI x UT Austin: Drone Road-Inspection Research",
        role: "Tech Lead",
        when: "May 2026 to Present",
        where: "Austin, TX",
        bullets: [
          "Lead the technical side of a ~10 person research team using drone imagery and computer vision to detect road cracks and stitch images into one continuous georeferenced road map",
          "Built an end-to-end proof of concept in days: wrote a Python pipeline slicing road-test video into ~785 road-cropped frames, then trained a YOLOv11 crack-detection model locally on GPU at zero cloud cost",
        ],
      }, // master-ux.html
      {
        org: "Sustainable Building Initiative (UT Austin)",
        role: "Software Developer, Tech Team",
        when: "Feb 2026 to Aug 2026",
        where: "Austin, TX",
        bullets: [
          "Shipped features for the SBI organization website on a 5 to 7 person tech team, meeting twice weekly to hit deliverables on time",
          "Designed and shipped the public-facing Reports feature end to end using Supabase (Postgres + storage bucket with image validation), Next.js, and Bun",
        ],
      }, // master-ux.html
      {
        org: "Perspect",
        role: "Founder",
        when: "Jan 2026 to Present",
        bullets: [
          "Designed and shipped a solo full-stack AI product where a panel of expert AI personas debates a topic, surfaces disagreements, cites web-searched sources, and outputs a structured briefing; originated at the Claude Hackathon 2026 (top-20 finish)",
          "Built the frontend on React 18 + Vite + Tailwind + React Router 7 with a multi-persona debate view, contradiction map, synthesized briefing, and follow-up prompts",
          "Ran a first classroom beta with real student users; now in closed-beta iteration",
        ],
      }, // master-ux.html, master-consulting.html
    ],
    skills: [
      {
        group: "Design & Prototyping",
        items: ["Figma", "Blender", "Onshape", "AutoCAD"],
      },
      {
        group: "Research Methods",
        items: ["User research", "Information architecture", "Competitive analysis"],
      },
      {
        group: "Frontend",
        items: ["React 18", "Next.js", "Vite", "Tailwind CSS", "React Router", "HTML/CSS", "Responsive UI"],
      },
      {
        group: "Backend",
        items: ["FastAPI", "Express", "Flask", "Node.js", "Bun", "Supabase"],
      },
      {
        group: "Languages",
        items: ["Python", "TypeScript", "JavaScript", "Java", "C#/.NET", "Lua", "POSIX shell"],
      },
    ],
    coursework: [
      "I 310U Introduction to User Experience Design (in progress)",
      "I 310D Introduction to Human-Centered Data Science (in progress)",
      "I 305 Research Methods for Informatics",
      "I 303 Ethical Foundations of Informatics",
      "AET 304 Foundations of Arts & Entertainment Technology (in progress)",
    ],
  },
  {
    slug: "consulting",
    label: "Consulting",
    title: "Consulting &",
    titleAccent: "Strategy",
    blurb: "ESG consulting, research direction, and data-driven recommendations that connect technical work to business decisions.",
    intro:
      "I work where technical work meets business decisions. As an ESG consulting intern at ICELIS Global I delivered about 90 slides of client training material on IFRS S1/S2, GRI Standards, and the GCC regulatory landscape. At UT Austin I hold concurrent tech and business leadership roles at the Sustainable Building Initiative, and I turn data into recommendations in Tableau and Excel.",
    resume: "/resume/Nikhil-Kadiyala-Resume-Consulting.pdf",
    showcase: "work",
    work: [
      {
        title: "Drone road-inspection research brief",
        image: { src: "/work/drone/pipeline.jpg", alt: "Crack detection pipeline on road test tiles, from raw frame to length estimate" },
        desc: "Authored the research brief setting technical direction across detection (YOLO vs segmentation vs VLM) and stitching (WebODM photogrammetry vs panorama), then split a ~10 person team into two sub-teams and set the data-collection strategy. Diagnosed a camera-angle domain gap that redirected the team's collection approach.",
        tags: ["Research", "Technical strategy", "Computer vision"],
        caseStudy: "drone",
      }, // master-consulting.html, cv.md
      {
        title: "Intel data center capstone",
        image: { src: "/work/intel/energy-by-region.jpg", alt: "Tableau line chart of U.S. energy generation by source across 2022" },
        desc: "Analyzed 4M+ rows of hourly U.S. energy-generation data in Tableau to recommend a data-center region, building calculated fields, a parameter-driven dual-axis time series, a tree map, and an interactive dashboard. Recommended the Northwest on surplus capacity and a 52% renewable mix (scored 209/200).",
        tags: ["Tableau", "Data analysis", "Recommendation"],
      }, // master-consulting.html, gca-resume-material.md
      {
        title: "Grammys website analysis",
        desc: "Used Excel PivotTables, SUMIFS/AVERAGEIFS, and XLOOKUP to compute engagement KPIs and mobile-visitor rates and assess the business impact of the 2022 Grammy.com and RecordingAcademy.com split. Delivered a stakeholder recommendation memo (scored 220/200).",
        tags: ["Excel", "KPI analysis", "Stakeholder memo"],
      }, // master-consulting.html, gca-resume-material.md
      {
        title: "A/B testing milestones",
        desc: "Ran A/B tests at 95% confidence on email subject lines and a Warby Parker landing-page redesign, across 14+ analytics milestones spanning entertainment, transit, sports, music, and e-commerce data.",
        tags: ["A/B testing", "Statistical significance", "Excel"],
      }, // master-consulting.html, gca-resume-material.md
      {
        title: "DataHack 2026, 5th place",
        image: { src: "/work/datahack/title.jpg", alt: "Title slide of the DataHack 2026 deck: Predicting Skips. Retaining Listeners." },
        desc: "Built skip-prediction and customer-lifetime-value models across a large music listening-history dataset at UT Austin MLDS's DataHack 2026, placing 5th.",
        tags: ["Python", "LightGBM", "CatBoost", "UMAP"],
      }, // master-consulting.html
    ],
    experience: [
      {
        org: "Sustainable Building Initiative (UT Austin)",
        role: "Tech Director & Co Vice Director, Business Oversight & Analytics",
        when: "Aug 2026 to Present",
        where: "Austin, TX",
        bullets: [
          "Hold two concurrent leadership roles spanning technology and business, bridging the club's engineering output and its operational strategy",
          "Lead a 10 to 15 person tech team as primary technical point of contact for client-facing communication, running recruiting, interviews, and onboarding; review and approve all work before merge",
          "Partner with leadership as Co Vice Director on operational oversight, performance tracking, and data-driven analysis that informs club strategy and resource decisions",
        ],
      }, // master-consulting.html
      {
        org: "Hindu Charities for America",
        role: "Tech Lead, AI with All Hackathon",
        when: "Jul 2026 to Present",
        where: "Austin, TX",
        bullets: [
          "Co-lead technology and student-council operations for a hackathon of ~600 participants in grades 8-12, coordinating with a data scientist and an AI/UX designer on a one-month build",
          "Designed the participant app feature set and a privacy-aware per-participant UID scheme under COPPA and FERPA constraints",
        ],
      }, // master-consulting.html
      {
        org: "ICELIS Global",
        role: "ESG Consulting Intern",
        when: "Jun 2026 to Jul 2026",
        where: "Remote to Doha, Qatar",
        bullets: [
          "Delivered ~90 slides of consultant-ready client training material, including a 26-slide IFRS S1/S2 standards landscape with a GCC regulatory map and a 22-slide materiality-assessment playbook with scoring rubrics and an 8-week engagement plan",
          "Produced reference matrices spanning an IFRS vs GRI comparison, a six-step reporting process guide, and a full GCC regulatory scan",
          "Presented a final recap to leadership with four strategic proposals; received a letter of recommendation signed by the Founder & CEO",
        ],
      }, // master-consulting.html
      {
        org: "BizFirst AI",
        role: "Software Engineering Intern",
        when: "Jun 2026 to Aug 2026",
        where: "Remote",
        bullets: [
          "Shipped the company's V1 self-hosted object storage with tiered quotas, lifecycle expiration, and offsite backup, plus three tools letting its multi-agent orchestrator generate valid schemas from natural-language prompts",
        ],
      }, // master-consulting.html
      {
        org: "Perspect",
        role: "Founder",
        when: "Jan 2026 to Present",
        bullets: [
          "Built and shipped a full-stack AI product solo (backend, frontend, infrastructure, and brand) where expert AI personas debate a topic and output a structured briefing with cited sources; top-20 at Claude Hackathon 2026",
          "Ran a first classroom beta with real student users, pitched to students, educators, and testers, and self-funded the product under a monthly spend guard; now in closed-beta iteration",
        ],
      }, // master-consulting.html
      {
        org: "Logica Consulting Group",
        role: "Tech Intern",
        when: "May 2024 to Jun 2024",
        where: "Austin, TX",
        bullets: [
          "Delivered a client-facing product for 50+ small-business users on a 3-person team, cutting page load times by 20%",
          "Authored onboarding documentation that reduced new-intern ramp time by 40%, and partnered with client stakeholders",
        ],
      }, // master-consulting.html
    ],
    skills: [
      {
        group: "Data & Analytics",
        items: [
          "Tableau",
          "Excel",
          "SQL",
          "Python (Pandas, scikit-learn, LightGBM, CatBoost, XGBoost)",
          "Dashboard design",
          "Data storytelling",
          "A/B testing and statistical significance",
          "KPI analysis",
        ],
      },
      {
        group: "Business & Consulting",
        items: [
          "Client deliverables and decks",
          "Strategic proposals",
          "Materiality assessment methodology",
          "Sustainability frameworks (IFRS S1/S2, GRI, ESRS)",
          "GCC regulatory landscape",
          "Stakeholder presentation",
          "Cross-functional leadership",
          "Recruiting and onboarding",
        ],
      },
      {
        group: "Technical",
        items: [
          "Python",
          "TypeScript",
          "JavaScript",
          "SQL",
          "React",
          "Next.js",
          "FastAPI",
          "Node.js",
          "Supabase",
          "PostgreSQL",
          "Docker",
          "Git",
          "Computer vision (YOLO)",
          "LLM application development",
        ],
      },
    ],
  },
  {
    slug: "business",
    label: "Business",
    title: "Business &",
    titleAccent: "Leadership",
    blurb: "Founding products, leading teams, and analyzing data to back business recommendations.",
    intro:
      "I've founded two products, Perspect and, before college, Blood Buddy, and I now hold concurrent roles as Tech Director and Co Vice Director for Business Oversight & Analytics at UT Austin's Sustainable Building Initiative. Through the Global Career Accelerator I analyzed real datasets in Excel and Tableau to produce KPI analyses and stakeholder recommendations.",
    resume: "/resume/Nikhil-Kadiyala-Resume-Business.pdf",
    showcase: "work",
    work: [
      {
        title: "Perspect",
        image: { src: "/work/perspect/debate.jpg", alt: "Perspect debate view with sources and expert personas" },
        desc: "Designed, built, and shipped a full-stack AI product solo where a panel of expert AI personas debates a topic and outputs a structured briefing with cited sources; top-20 at the Claude Hackathon 2026. Ran a first classroom beta with real student users and self-funded it under a Gemini spend guard; now in closed-beta iteration.",
        tags: ["Founder", "AI product", "Classroom beta"],
        caseStudy: "perspect",
        href: "https://tryperspect.com",
      }, // _business_resume.html
      {
        title: "Blood Buddy",
        desc: "Founded and ran a location-based platform that matched blood donors with recipients, growing it to 8,000+ donors and 100+ completed transfers. Designed the database, matching logic, operations, and outreach, and coordinated volunteers across the country.",
        tags: ["Founder", "Consumer product", "Operations"],
        caseStudy: "blood-buddy",
      }, // _business_resume.html, cv.md
      {
        title: "Intel data center capstone",
        image: { src: "/work/intel/energy-by-region.jpg", alt: "Tableau line chart of U.S. energy generation by source across 2022" },
        desc: "Analyzed 4M+ rows of hourly U.S. energy-generation data in Tableau to recommend a region for a new data center, comparing regional net production, renewable share, and generation by source in an interactive dashboard. Recommended the Northwest on surplus capacity and a 52% renewable mix.",
        tags: ["Tableau", "Data analysis", "Dashboards"],
      }, // _business_resume.html, gca-resume-material.md
      {
        title: "Grammys website analysis",
        desc: "Used advanced Excel (PivotTables, SUMIFS/AVERAGEIFS, XLOOKUP) to compute engagement KPIs and mobile-visitor rates and assess the business impact of the 2022 Grammy.com and RecordingAcademy.com split. Delivered a stakeholder recommendation memo (scored 220/200).",
        tags: ["Excel", "KPI analysis", "Stakeholder memo"],
      }, // _business_resume.html, gca-resume-material.md
    ],
    experience: [
      {
        org: "Sustainable Building Initiative (UT Austin)",
        role: "Tech Director & Co Vice Director, Business Oversight & Analytics",
        when: "Aug 2026 to Present",
        where: "Austin, TX",
        bullets: [
          "Hold two concurrent leadership roles spanning technology and business",
          "Lead a 10 to 15 person tech team and serve as primary technical point of contact for client-facing communication, running recruiting, interviews, and onboarding for new members",
          "Partner with leadership as Co Vice Director on operational oversight, performance tracking, and data-driven analysis that informs club strategy and resource decisions",
        ],
      }, // _business_resume.html
      {
        org: "HC4A: AI with All Hackathon",
        role: "Tech Lead",
        when: "Jul 2026 to Present",
        where: "Austin, TX",
        bullets: [
          "Co-lead technology and student-council operations for Hindu Charities for America's AI with All hackathon, targeting ~600 participants in grades 8-12 on a one-month build timeline",
          "Help recruit and structure the student council team and its project-management processes",
        ],
      }, // _business_resume.html
      {
        org: "ICELIS Global",
        role: "ESG Consulting Intern",
        when: "Jun 2026 to Jul 2026",
        where: "Remote to Doha, Qatar",
        bullets: [
          "Completed a four-week internship with the ESG consulting team focused on IFRS S1 and S2, GRI Standards, and the GCC regulatory landscape",
          "Delivered ~90 slides of consultant-ready training material plus reference matrices spanning an IFRS vs GRI comparison, a six-step reporting process guide, and a full GCC regulatory scan",
          "Presented a final recap to leadership with four strategic proposals; received a letter of recommendation signed by the Founder & CEO",
        ],
      }, // _business_resume.html
      {
        org: "BizFirst AI",
        role: "Software Engineering Intern",
        when: "Jun 2026 to Aug 2026",
        where: "Remote",
        bullets: [
          "Built infrastructure and AI tooling on an enterprise workflow platform: self-hosted MinIO object storage on Docker with restic snapshots to Backblaze B2, and three MCP tools that let a multi-agent orchestrator generate valid form schemas from natural-language prompts",
        ],
      }, // _business_resume.html, cv.md (dates)
      {
        org: "SBI x UT Austin: Drone Road-Inspection Research",
        role: "Tech Lead",
        when: "May 2026 to Present",
        where: "Austin, TX",
        bullets: [
          "Lead the technical side of a ~10 person research team using drone imagery and computer vision to detect road cracks and stitch them into a continuous georeferenced road map",
          "Authored the research brief setting technical direction across detection and stitching, then split the team into two sub-teams and set the data-collection strategy",
        ],
      }, // _business_resume.html
    ],
    skills: [
      {
        group: "Data & Analytics",
        items: [
          "Tableau (calculated fields, parameters, dashboards, tree maps, maps)",
          "Excel (PivotTables, XLOOKUP, SUMIFS/AVERAGEIFS)",
          "A/B testing and statistical significance",
          "KPI analysis",
          "Data visualization",
        ],
      },
      {
        group: "Business & Consulting",
        items: [
          "Strategy",
          "Product management",
          "Client presentations",
          "Cross-functional leadership",
          "Sustainability frameworks (IFRS S1/S2, GRI, ESRS)",
          "Materiality assessment methodology",
          "GCC regulatory landscape",
        ],
      },
      {
        group: "Technical",
        items: [
          "Python",
          "TypeScript",
          "JavaScript",
          "C#/.NET",
          "SQL",
          "React",
          "Next.js",
          "FastAPI",
          "Docker",
          "Kubernetes",
          "PostgreSQL",
          "Supabase",
          "MCP tools",
          "LLM app development",
        ],
      },
      {
        group: "Tools",
        items: ["Figma", "PowerPoint", "Google Workspace", "GitHub", "Vercel", "Render", "MinIO", "Notion"],
      },
    ],
  },
];

export const trackBySlug = (slug?: string) => tracks.find((t) => t.slug === slug);
