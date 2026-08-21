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
  },
  {
    id: "Music Player",
    number: "05",
    title: "Command-Line Music Player",
    category: "Music Editor",
    stack: "C",
    summary: "A Basic Command Line Music Player with pause/play , prev/next and other functionalities",
    accent: "#6b3aef",
    year: "2025",
    codeUrl: "https://github.com/SankeerthNara/Command-Line-Music-Player",
    liveUrl: ""
  }
];

// OPEN-SOURCE-STATS:START
export const openSourceStats = {
  totalMergedPRs: 32,
  searchUrl: "https://github.com/search?q=is%3Apr%20is%3Amerged%20author%3ASankeerthNara&type=pullrequests"
};
// OPEN-SOURCE-STATS:END

// OPEN-SOURCE:START
export const openSource = [
  {
    org: "Microsoft",
    repo: "aspire",
    tag: "Open Source",
    points: [
      {
        text: "Surface deploy, publish, and pipeline actions in Aspire pane",
        url: "https://github.com/microsoft/aspire/pull/19466"
      },
      {
        text: "Expose Aspire project creation workflows",
        url: "https://github.com/microsoft/aspire/pull/19539"
      },
      {
        text: "Prompt for an AppHost when a directory launch is ambiguous",
        url: "https://github.com/microsoft/aspire/pull/19541"
      }
    ]
  },
  {
    org: "Google",
    repo: "xrblocks",
    tag: "Open Source",
    points: [
      {
        text: "Fix read-buffer composition in OcclusionPass",
        url: "https://github.com/google/xrblocks/pull/533"
      }
    ]
  },
  {
    org: "Mozilla-Mobile",
    repo: "firefox-ios",
    tag: "Open Source",
    points: [
      {
        text: "Refactor FXIOS-15358 [Microsurvey] Use @Copyable macro for MicrosurveyState",
        url: "https://github.com/mozilla-mobile/firefox-ios/pull/35109"
      },
      {
        text: "Remove FXIOS-16371 [Translations] Remove dead engine/service methods",
        url: "https://github.com/mozilla-mobile/firefox-ios/pull/34812"
      },
      {
        text: "Remove FXIOS-16367 [NotificationManager] Unused methods removed",
        url: "https://github.com/mozilla-mobile/firefox-ios/pull/34830"
      },
      {
        text: "Remove FXIOS-16368 [Periphery] Remove unused GleanWrapper functions",
        url: "https://github.com/mozilla-mobile/firefox-ios/pull/34822"
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
