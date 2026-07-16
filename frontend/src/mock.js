// Mock data for Sankeerth Nara portfolio

export const profile = {
  name: "Sankeerth Nara",
  nameShort: "SANKEERTH NARA",
  headline: ["Software", "Developer", "& Builder."],
  role: "Backend  Full-Stack  AI/CV",
  location: "IIIT Hyderabad",
  year: "25",
  inShort: {
    left: "I'm a first-year Computer Science student at IIIT Hyderabad who loves crafting practical software with careful attention to detail.",
    right: "My interests lie in backend development, artificial intelligence, and computer vision. I enjoy building practical solutions that tackle meaningful real-world problems."
  }
};

export const projects = [
  {
    id: "twixt",
    number: "01",
    title: "Command-Line Twixt",
    category: "Game / Systems",
    stack: "C",
    summary: "Implemented the classic strategy board game Twixt as a command-line application featuring complete game logic, move validation and an interactive gameplay experience.",
    accent: "#6b3aef",
    year: "2025",
    codeUrl: "https://github.com/SankeerthNara/course-project-phase-2-SankeerthNara",
    liveUrl: ""
  },
  {
    id: "portfolio",
    number: "02",
    title: "Portfolio Website",
    category: "Web / Design",
    stack: "HTML, CSS, JavaScript",
    summary: "Designed and developed a personal portfolio to showcase projects, technical skills and achievements through a clean, modern and responsive interface.",
    accent: "#8a63ff",
    year: "2026",
    codeUrl: "https://github.com/SankeerthNara/portfolio",
    liveUrl: "https://www.sankeerthnara.in"
  },
  {
    id: "face-tictactoe",
    number: "03",
    title: "Face Recognition Tic-Tac-Toe",
    category: "AI / Computer Vision",
    stack: "Python, OpenCV, DeepFace",
    summary: "A multiplayer Tic-Tac-Toe application that authenticates players using facial recognition before gameplay, combining computer vision with interactive game development.",
    accent: "#6b3aef",
    year: "2026",
    codeUrl: "https://github.com/SankeerthNara/project-team-3",
    liveUrl: ""
  },
  {
    id: "shuttle",
    number: "04",
    title: "Shuttle Court Slot Booking",
    category: "Web / Utility",
    stack: "HTML, CSS, JavaScript",
    summary: "A web application for a residential colony that enables residents to reserve badminton court slots online, simplifying scheduling and reducing booking conflicts.",
    accent: "#8a63ff",
    year: "2026",
    codeUrl: "https://github.com/SankeerthNara/Shuttle",
    liveUrl: "https://www.sdstpscourt.xyz"
  }
];

export const openSource = [
  {
    org: "Loomy",
    tag: "Security  Testing",
    points: [
      "Identified and fixed an IDOR vulnerability (#25) where any authenticated user could retrieve another user's email and verification status by guessing their UUID — gated the endpoint behind workspace membership and added a reduced public response shape.",
      "Added a Postgres-backed regression test suite (transactional per-test fixtures, DB and auth dependency overrides) and wired a Postgres service into GitHub Actions CI, since none existed for the module before."
    ]
  },
  {
    org: "Mnema",
    tag: "UX  Polish",
    points: [
      "Added relative timestamps with hover-for-absolute-time display for improved readability.",
      "Improved empty states with icons across the UI for a more polished, informative experience."
    ]
  },
  {
    org: "CircuitVerse",
    tag: "i18n  Accessibility",
    points: [
      "Fixed and improved the Hindi language localisation, making the platform more accessible for Hindi-speaking users."
    ]
  },
  {
    org: "kakunin-mcp",
    tag: "Docs  Planning",
    points: [
      "Created and added a comprehensive ROADMAP.md outlining the project's future direction and development milestones."
    ]
  },
  {
    org: "CureCart",
    tag: "Docs  Design",
    points: [
      "Enhanced the About Us page and rewrote it in a more professional voice.",
      "Designed and added a professional README banner to improve the repository's presentation."
    ]
  },
  {
    org: "db (IN3PIRE)",
    tag: "Docs",
    points: [
      "Updated CHANGELOG.md to reflect recent project changes."
    ]
  }
];

export const skills = {
  Languages: ["C", "C++", "Python", "JavaScript", "Git-Bash", "HTML", "CSS", "SQL"],
  Tools: ["Git", "GitHub", "GitHub Actions", "React", "FastAPI", "DeepFace"],
  Learning: ["Node.js", "Backend Systems", "Artificial Intelligence", "Computer Vision", "Open Source"]
};

export const goals = [
  "Build impactful full-stack applications.",
  "Contribute consistently to open-source projects.",
  "Strengthen Data Structures & Algorithms.",
  "Learn scalable backend system design.",
  "Contribute to Google Summer of Code (GSoC)."
];

export const socials = [
  { label: "GitHub", handle: "@SankeerthNara", href: "https://github.com/SankeerthNara" },
  { label: "LinkedIn", handle: "sankeerth-nara", href: "https://www.linkedin.com/in/sankeerth-nara-412ab3373/" },
  { label: "Instagram", handle: "Sankeerth Nara", href: "https://www.instagram.com/sankeerth_nara/ " },
  { label: "GitHub Pages", handle: "sankeerthnara.github.io", href: "https://sankeerthnara.github.io" }
];

export const navItems = [
  { id: "about", label: "About", path: "/" },
  { id: "work", label: "Work", path: "/work" },
  { id: "contact", label: "Contact", path: "/contact" }
];
