// Mock data for Sankeerth Nara portfolio

export const profile = {
  name: "Sankeerth Nara",
  nameShort: "SANKEERTH NARA",
  headline: ["Student,", "Developer", "& Builder."],
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
    codeUrl: "https://github.com/SankeerthNara/CLI-twixt",
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
    codeUrl: "https://github.com/SankeerthNara/tic-tac-toe",
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

// OPEN-SOURCE-STATS:START
export const openSourceStats = {
  totalMergedPRs: 15,
  searchUrl: "https://github.com/search?q=is%3Apr%20is%3Amerged%20author%3ASankeerthNara&type=pullrequests"
};
// OPEN-SOURCE-STATS:END

// OPEN-SOURCE:START
export const openSource = [
  {
    org: "teams360",
    tag: "Open Source",
    points: [
      {
        text: "Removed the duplicate frontend/postcss.config.mjs to eliminate conflicting PostCSS settings. It referenced @tailwindcss/postcss (not installed), which caused build issues with the Tailwind v4 setup.",
        url: "https://github.com/guidewire-oss/teams360/pull/135"
      }
    ]
  },
  {
    org: "Kepler",
    tag: "Frontend  Design",
    points: [
      {
        text: "Built a custom 404 Not Found page matching Kepler's dashboard design system, featuring an animated orbital debris SVG scene and a catch-all route for previously unmatched paths.",
        url: "https://github.com/7-Blocks/Kepler/pull/47"
      }
    ]
  },
  {
    org: "Termix",
    tag: "Frontend  UX",
    points: [
      {
        text: "Fixed poor-contrast autocomplete suggestion text in the command autocomplete dropdown so it stays legible across all themes and accent colors.",
        url: "https://github.com/Termix-SSH/Termix/pull/1061"
      },
      {
        text: "Added an \"Open File Manager\" option to the terminal tab's right-click context menu, wiring TabBar and AppShell to open a file browser directly from a terminal session.",
        url: "https://github.com/Termix-SSH/Termix/pull/1046"
      }
    ]
  },
  {
    org: "Mnema",
    tag: "UX  Polish",
    points: [
      {
        text: "Replaced the plain \"No sessions found\" text with a styled empty-state card (icon, heading, description, and a \"Clear filters\" CTA) matching the app's empty-state convention.",
        url: "https://github.com/nbkdoesntknowcoding/mnema/pull/88"
      },
      {
        text: "Added icon-based empty states with clearer, tab-specific copy to the Access Requests inbox for both incoming and outgoing requests.",
        url: "https://github.com/nbkdoesntknowcoding/mnema/pull/80"
      },
      {
        text: "Added relative timestamps with hover-for-absolute-time display for improved readability.",
        url: "https://github.com/nbkdoesntknowcoding/mnema/pull/79"
      }
    ]
  },
  {
    org: "llama.cpp-fork",
    tag: "Docs",
    points: [
      {
        text: "Wrote a beginner-friendly getting-started guide covering installation, downloading models, and running first inference with llama-cli and llama-server.",
        url: "https://github.com/ghshhf/llama.cpp-fork/pull/11"
      }
    ]
  },
  {
    org: "Loomy",
    tag: "Security  Testing",
    points: [
      {
        text: "Identified and fixed an IDOR vulnerability where any authenticated user could retrieve another user's email and verification status by guessing their UUID — gated the endpoint behind workspace membership and added a reduced public response shape.",
        url: "https://github.com/Devlaner/loomy/pull/40"
      }
    ]
  },
  {
    org: "db (IN3PIRE)",
    tag: "Docs",
    points: [
      {
        text: "Updated CHANGELOG.md to reflect recent project changes.",
        url: "https://github.com/IN3PIRE/db/pull/18"
      }
    ]
  },
  {
    org: "CureCart",
    tag: "Docs  Design",
    points: [
      {
        text: "Enhanced the About Us page and rewrote it in a more professional voice.",
        url: "https://github.com/Princeag1310/CureCart/pull/38"
      },
      {
        text: "Designed and added a professional README banner to improve the repository's presentation.",
        url: "https://github.com/Princeag1310/CureCart/pull/36"
      }
    ]
  },
  {
    org: "kakunin-mcp",
    tag: "Docs  Planning",
    points: [
      {
        text: "Created and added a comprehensive ROADMAP.md outlining the project's future direction and development milestones.",
        url: "https://github.com/kakunin-ai/kakunin-mcp/pull/13"
      }
    ]
  }
];
// OPEN-SOURCE:END

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
  { label: "Email", handle: "sankeerthnara@gmail.com", href: "mailto:sankeerthnara@gmail.com"},
  { label: "GitHub", handle: "@SankeerthNara", href: "https://github.com/SankeerthNara" },
  { label: "LinkedIn", handle: "sankeerth-nara", href: "https://www.linkedin.com/in/sankeerth-nara-412ab3373/" },
  { label: "Instagram", handle: "Sankeerth Nara", href: "https://www.instagram.com/sankeerth_nara/ " }
];

export const navItems = [
  { id: "about", label: "About", path: "/" },
  { id: "work", label: "Work", path: "/work" },
  { id: "contact", label: "Contact", path: "/contact" }
];
