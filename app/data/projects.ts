/* Every claim here is traceable to something Nikhil actually wrote or shipped.
   Where a project has no measured outcome, `status` says so plainly rather
   than inventing a number. */

import type { TrackSlug } from "./tracks";

export type Figure = { src: string; alt: string; caption?: string };

export type Beat = {
  heading: string;
  /** Paragraphs of prose. */
  body?: string[];
  /** Decision list: what he chose, and why. The "why" is the whole point. */
  decisions?: { what: string; why: string; figure?: Figure }[];
  /** Screens shown as a strip, for flows too long for one image. */
  gallery?: Figure[];
};

export type Project = {
  slug: string;
  /** The track page this case study belongs to; its back link returns there. */
  track: TrackSlug;
  title: string;
  /** One line, the claim the case study proves. */
  line: string;
  year: string;
  role: string;
  /** Short right-hand column in the index: scale, users, or outcome. */
  scale: string;
  domain: string;
  /** Card and cover gradient, drawn from the site palette. */
  accent: string;
  /** A real screenshot of the work. Omitted rather than faked with stock imagery. */
  cover?: Figure;
  /** Shown on the index under the title. Two sentences at most. */
  summary: string;
  link?: { label: string; href: string };
  beats: Beat[];
};

const written: Project[] = [
  {
    slug: "hc4a",
    track: "ux",
    title: "AI with All participant app",
    line: "600 teenagers, two venues, one day, and nobody knows where to be.",
    year: "2026",
    role: "Tech Lead and designer",
    scale: "~600 students",
    domain: "Event tooling",
    accent: "linear-gradient(135deg, #665DCD 0%, #5FA4E6 100%)",
    cover: {
      src: "/work/hc4a/cover.jpg",
      alt: "Three screens from the AI with All app: the student dashboard, judge scoring, and the broadcast composer",
      caption: "Student dashboard, judge scoring and the organizer broadcast composer, from the Figma prototype I designed.",
    },
    summary:
      "Designed the screens, feature set and privacy model for the participant app behind a hackathon for students in grades 8 to 12.",
    beats: [
      {
        heading: "The problem",
        body: [
          "A one-day event moves faster than its schedule. The participants are middle and high schoolers, most of them at their first hackathon, and during high-velocity events people suffer from cognitive overload: they lose track of what is happening now, what happens next, and where they are meant to be.",
          "The default answer is to email everyone the schedule and hope. That fails precisely when the day gets busy, which is when it is needed.",
        ],
      },
      {
        heading: "Constraints",
        body: [
          "500 to 600 students across two venues, Austin and Round Rock. 100 teams, 20 pods. The participants are minors, so anything touching identity has to work under COPPA and FERPA. The floor is run by volunteers rather than staff, which means anything requiring training does not get used.",
        ],
      },
      {
        heading: "Decisions",
        decisions: [
          {
            what: "A live Now / Next ticker, pinned to the top of every screen",
            why: "Reading “Now: Brainstorming Sprint. Next: Mentor Check-In” costs a glance. Digging through email costs minutes, so it gets skipped.",
            figure: {
              src: "/work/hc4a/dashboard.jpg",
              alt: "Student dashboard with a Happening Now and Up Next banner above the day's timeline and resource tiles",
              caption: "Happening now and up next sit above everything else on the dashboard.",
            },
          },
          {
            what: "A preset User ID from the registration email, instead of account creation",
            why: "Account creation is where sign-up funnels leak, and it is the worst thing to ask of a thirteen-year-old in a loud gym. Each UID is pre-linked to pod, school, team, table and challenge category, so identity is resolved before anyone arrives.",
            figure: {
              src: "/work/hc4a/profile.jpg",
              alt: "User profile screen listing pod, school, team name, table number, location zone and challenge category",
              caption: "What a User ID resolves to: pod, school, team, table, zone and challenge category.",
            },
          },
          {
            what: "A self-guided design-sprint roadmap with time-boxed steps and a pitch rubric",
            why: "There are twenty pods and far fewer experienced pod leaders. Putting the structure in the app rather than in a person's head means the quality of your day does not depend on which pod you drew.",
          },
          {
            what: "A faceted directory across nonprofits, sponsors and schools",
            why: "Mentors need one specific person, quickly, while standing up. Filtering by category beats scrolling a single long list.",
          },
          {
            what: "A one-tap “request help to my table” button rather than a help desk",
            why: "Students get stuck and then do nothing, because finding a pod lead is more social effort than the question feels worth. Pushing the request out to floating volunteers removes that cost entirely.",
          },
        ],
      },
      {
        heading: "The prototype",
        body: [
          "Screens from the Figma prototype I designed. Students sign in with the User ID from their registration email. Judges score each team on a five-criterion rubric, one rotation at a time. Organizers can push a schedule change to every signed-in device at once.",
        ],
        gallery: [
          { src: "/work/hc4a/home.jpg", alt: "Home screen with student, volunteer and judge sign-in options", caption: "Three ways in" },
          { src: "/work/hc4a/sign-in.jpg", alt: "Student sign-in with an email field and a six-character User ID entry", caption: "Student sign-in" },
          { src: "/work/hc4a/judge-home.jpg", alt: "Judge home listing five teams with scored and not scored badges under a schedule shift alert", caption: "Judge rotation" },
          { src: "/work/hc4a/judge-scoring.jpg", alt: "Scoring screen with one to five buttons for impact, innovation, execution, design and presentation", caption: "Rubric scoring" },
          { src: "/work/hc4a/rotation-complete.jpg", alt: "Rotation complete confirmation with a start next rotation button", caption: "Rotation complete" },
          { src: "/work/hc4a/broadcast.jpg", alt: "Admin broadcast composer with a message type, the message, and a live preview of the alert", caption: "Broadcast to every device" },
        ],
      },
      {
        heading: "How it was designed",
        body: [
          "I designed the screens in Figma and worked through them with my teammate Shaan, starting from what would feel intuitive to a student at their first hackathon, then cross-checking every screen with the rest of the team.",
          "Rather than inventing interaction patterns, we looked for ones that already worked. We searched online for how event apps feel to use, and benchmarked against events that had solved these problems at scale: SXSW for day-at-a-glance wayfinding, Major League Hacking for mentor queueing, and Devpost for project submission. I pulled comparable mobile patterns from Mobbin through an MCP connection, and used Claude, Gemini and ChatGPT for market research on existing event tools. Borrowing a proven pattern is cheaper than testing a novel one on six hundred kids.",
        ],
      },
      {
        heading: "Where it stands",
        body: [
          "The feature set and the privacy-aware UID scheme are designed and documented; the build is in progress ahead of the event. It has not run with real users yet, so there are no post-event numbers here. The design reasoning is what there is to judge.",
        ],
      },
    ],
  },
  {
    slug: "perspect",
    track: "ux",
    title: "Perspect",
    line: "Chat is a bad shape for a debate.",
    year: "2026",
    role: "Founder, solo",
    scale: "Top 20, Claude Hackathon",
    domain: "AI product",
    accent: "linear-gradient(135deg, #5FA4E6 0%, #D2AB67 100%)",
    cover: {
      src: "/work/perspect/debate.jpg",
      alt: "Perspect debate view: a question, six web sources, and a panel of personas each arguing a position",
      caption: "The debate view. Each persona argues under its own name, with the sources the panel drew from pinned above.",
    },
    summary:
      "An AI product where a panel of expert personas debates a topic and returns a briefing with cited sources. Designed and built solo: interface, backend and infrastructure.",
    link: { label: "tryperspect.com", href: "https://tryperspect.com" },
    beats: [
      {
        heading: "The design problem",
        body: [
          "A single scrolling column flattens five viewpoints into one voice. It hides the thing you actually came for: where the sources disagree, and why. If the product's only job is to surface conflict, a chat transcript is the wrong container for it.",
        ],
      },
      {
        heading: "Decisions",
        decisions: [
          {
            what: "A multi-persona debate view rather than one thread",
            why: "Positions stay attributable. You can see who is arguing what, instead of reading a blended summary that belongs to nobody.",
          },
          {
            what: "A contradiction map as a first-class surface",
            why: "The disagreements are the signal. Burying them inside paragraphs wastes the only thing this does that a search engine does not.",
            figure: {
              src: "/work/perspect/contradictions.jpg",
              alt: "Contradiction map grouping where the Financial Planner, Investor and Startup Founder disagree, above the briefing",
              caption: "Disagreements grouped by topic, each attributed to the persona who made it.",
            },
          },
          {
            what: "A synthesized briefing with follow-up prompts",
            why: "People arrive wanting an answer, not a transcript. The briefing is the payload; the debate underneath it is the evidence.",
          },
          {
            what: "Streamed responses instead of a loading spinner",
            why: "A multi-agent debate takes real time. Watching it arrive holds attention. A spinner invites a tab switch.",
          },
        ],
      },
      {
        heading: "Validation",
        body: [
          "Ran a first classroom beta with real student users, and pitched it to a mix of students, educators and testers. Now in closed-beta iteration. Placed top twenty at the Claude Hackathon 2026.",
        ],
      },
      {
        heading: "Built with",
        body: [
          "React 18, Vite, Tailwind and React Router on the front end; Bun and Express with server-sent events behind it. Designing and building it myself meant the interface decision and the streaming behavior were the same decision.",
        ],
      },
    ],
  },
  {
    slug: "drone",
    track: "consulting",
    title: "Drone road-inspection research",
    line: "Hours of raw road video, one continuous crack map.",
    year: "2026",
    role: "Tech Lead",
    scale: "~10 person team",
    domain: "Computer vision",
    accent: "linear-gradient(135deg, #D2AB67 0%, #665DCD 100%)",
    summary:
      "Lead the technical side of a research team using drone imagery to detect road cracks and stitch them into a single georeferenced map.",
    beats: [
      {
        heading: "The problem",
        body: [
          "Road inspection produces enormous amounts of footage and very little that a decision-maker can read. The research question was whether drone imagery could be turned into one continuous, georeferenced map of surface damage, something a city could act on rather than watch.",
        ],
      },
      {
        heading: "What I did",
        decisions: [
          {
            what: "Built an end-to-end proof of concept in days, at zero cloud cost",
            why: "A working pipeline (video sliced into ~785 road-cropped frames, then a YOLOv11 crack detector trained locally on GPU) settled arguments that would otherwise have run for weeks.",
          },
          {
            what: "Authored the research brief setting technical direction",
            why: "The team was debating detection approach (YOLO versus segmentation versus a vision-language model) and stitching approach (photogrammetry versus panorama) at the same time. Writing the trade-offs down let us choose once and move.",
          },
          {
            what: "Split the team into detection and stitching sub-teams",
            why: "Ten people cannot work on one ambiguous problem. Two well-defined problems let both halves make progress in parallel.",
          },
          {
            what: "Diagnosed a camera-angle domain gap",
            why: "Our training data was forward-facing; the drone captures top-down nadir. Catching that mismatch early redirected the whole data-collection strategy rather than producing a model that quietly failed in the field.",
          },
        ],
      },
      {
        heading: "Why it belongs here",
        body: [
          "This is not interface work. It is on the site because the job was the same one: take something unreadable, decide what matters, and give a group of people a structure they can act on.",
        ],
      },
    ],
  },
  {
    slug: "blood-buddy",
    track: "ux",
    title: "Blood Buddy",
    line: "A stranger has to believe you, and act within the hour.",
    year: "2022",
    role: "Founder, now handed off",
    scale: "8,000+ donors",
    domain: "Consumer product",
    accent: "linear-gradient(135deg, #665DCD 0%, #D2AB67 100%)",
    summary:
      "A legacy consumer product I founded in high school to connect blood donors with people who need them. It grew to over 8,000 donors and 100+ transfers before I handed it off.",
    beats: [
      {
        heading: "The design problem",
        body: [
          "Two things have to be true at once for a request to work. A stranger has to believe it is real, and they have to act quickly enough for it to matter. Trust usually costs time (verification, profiles, history), and urgency does not have time to spend.",
        ],
      },
      {
        heading: "Status",
        body: [
          "Blood Buddy is a legacy project. I founded it in high school and have since handed it off. The product from that era is long gone, so there are no screenshots here; the design problem and the outcome are what carry over.",
        ],
      },
      {
        heading: "Where it got to",
        body: [
          "Over 8,000 donors and more than 100 completed transfers. It is the only thing on this site that has run at consumer scale, and the numbers are the outcome rather than a projection.",
        ],
      },
    ],
  },
];

// Perspect leads: it is live, public, and the strongest design story.
const order = ["perspect", "hc4a", "blood-buddy", "drone"];
export const projects: Project[] = order.map((slug) => written.find((p) => p.slug === slug)!);

export const byslug = (slug?: string) => projects.find((p) => p.slug === slug);
