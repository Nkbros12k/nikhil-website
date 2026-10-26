/* Copy for the terminal. DRAFT, Nikhil reviews every string before this ships.
   Facts trace to Taildrive/Resume/resume-context.md and the track data. Left out
   on purpose: GPA, visa status, any unverified metric, a Business double major. */

export const profile = {
  name: "Nikhil Kadiyala",
  handle: "nk",
  location: "Austin, TX",
  school:
    "UT Austin, BS in Informatics with focus areas in Human-Centered Data Science and Cybersecurity, working toward the Computer Science certificate",
  tagline: "informatics @ ut austin",
  whoami: [
    "I'm Nikhil, an informatics student at UT Austin in Austin, Texas.",
    "I build full-stack AI products and the infrastructure under them. I founded Perspect, a tool where a panel of AI experts debates any question, and I lead the technical side of a drone road-inspection research team.",
    "I run the tech team at the Sustainable Building Initiative, and I'm the tech lead for a hackathon app that serves around 600 students.",
    "Outside of code I played violin for six years and I like cars.",
  ],
  now: [
    "Running Perspect, my solo AI product, with students testing it",
    "Leading the technical side of the drone road-inspection research team",
    "Running the Sustainable Building Initiative tech team as Tech Director",
    "Building the AI with All hackathon participant app as Tech Lead",
  ],
  links: {
    email: "nikhilkadiyala44@gmail.com",
    github: "https://github.com/Nkbros12k",
    linkedin: "https://www.linkedin.com/in/nikhilkadiyala/",
    perspect: "https://tryperspect.com",
  },
  /* Shown by /certs. Dates stay off until he verifies them. */
  certs: [
    { name: "National Cyber Scholar", org: "National Cyber Scholarship Foundation" },
    { name: "SANS Foundations and GIAC certification", org: "SANS Institute" },
    { name: "UT Austin TACC GenCyber", org: "Texas Advanced Computing Center" },
    { name: "Global Career Accelerator", org: "Completed 2026" },
    { name: "CompTIA Network+ and Security+", org: "In progress" },
    { name: "CyberPatriot State Semi-Finalist", org: "Led a team of 5" },
    { name: "CTF competitor", org: "picoCTF, TryHackMe, HolidayHack" },
  ],
  /* Only items he confirms. Violin and cars come from resume-context.md extras. */
  extras: ["Violin for six years", "Cars", "Robotics team captain"],
} as const;
