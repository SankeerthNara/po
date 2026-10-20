// Hand-written copy. Pull request data lives in prs.json (regenerated on build).

export const projects = [
  {
    id: 'tabby',
    category: 'AI web app, live',
    name: 'Tabby',
    body: 'Snap a receipt and say who had what. Gemini reads the receipt and maps your sentence to line items, the split is worked out in integer cents, and each friend gets an itemised PayPal invoice with reminders until they pay.',
    stack: ['Next.js', 'TypeScript', 'Gemini', 'PayPal API'],
    links: [
      { label: 'Open the live site', href: 'https://tabby-eta-five.vercel.app' },
      { label: 'Source code', href: 'https://github.com/SankeerthNara/Tabby' },
    ],
  },
  {
    id: 'vision',
    category: 'Edge AI, computer vision',
    name: 'On-Device Vision Pipeline',
    body: 'Runs depth estimation, instance segmentation and 6-DoF pose estimation together on a live camera feed, on the NPU of a Snapdragon 8 Gen 3 dev kit. Swapping to a smaller depth model shrank it from 682 MB to 50 MB.',
    stack: ['Kotlin', 'CameraX', 'YOLOv8-seg', 'Depth Anything V2'],
    links: [{ label: 'Source code', href: 'https://github.com/SankeerthNara/ESW-Project' }],
  },
  {
    id: 'tracker',
    category: 'Web and Android app, live',
    name: 'ProgressTracker',
    body: 'One dashboard for coding progress across LeetCode, Codeforces and GitHub: problems by difficulty, contest ratings and merged pull requests, with an Android app from the same code.',
    stack: ['Next.js', 'TypeScript', 'Capacitor'],
    links: [{ label: 'Open the live site', href: 'https://codetrack-coral.vercel.app' }],
  },
  {
    id: 'faceplay',
    category: 'Computer vision',
    name: 'Face Recognition Tic-Tac-Toe',
    body: 'Multiplayer Tic-Tac-Toe that checks who you are before it lets you play. Each player is identified with OpenCV and DeepFace, so nobody takes a turn for someone else.',
    stack: ['Python', 'OpenCV', 'DeepFace'],
    links: [{ label: 'Source code', href: 'https://github.com/SankeerthNara/tic-tac-toe' }],
  },
  {
    id: 'shuttle',
    category: 'Web app, live',
    name: 'Shuttle Court Slot Booking',
    body: 'Residents of a residential colony reserve badminton court slots online, so two families stop turning up for the same hour.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Open the live site', href: 'https://www.sdstpscourt.xyz' },
      { label: 'Source code', href: 'https://github.com/SankeerthNara/Shuttle' },
    ],
  },
  {
    id: 'jam',
    category: 'Game, in progress',
    name: 'Glitched Out',
    body: 'Keep your torch on the vampire to catch him, clear task consoles along the way, then decide whether to reveal him or kill him. Built solo in Godot for the TGC Game Jam.',
    stack: ['Godot', 'GDScript'],
    links: [{ label: 'Source code', href: 'https://github.com/SankeerthNara/TGC-Game-Jam' }],
  },
  {
    id: 'twixt',
    category: 'Game, C',
    name: 'Command-Line Twixt',
    body: 'The connection board game Twixt, played in a terminal. Complete game logic, move validation and an interactive game loop, written in C.',
    stack: ['C'],
    links: [{ label: 'Source code', href: 'https://github.com/SankeerthNara/CLI-twixt' }],
  },
  {
    id: 'player',
    category: 'CLI tool, C',
    name: 'Command-Line Music Player',
    body: 'A small music player for the shell. Play, pause, skip tracks and move through a playlist without leaving the terminal.',
    stack: ['C'],
    links: [{ label: 'Source code', href: 'https://github.com/SankeerthNara/Command-Line-Music-Player' }],
  },
  {
    id: 'site',
    category: 'Web, motion',
    name: 'This website',
    body: 'The site you are on. Built with Vite and GSAP, and the open-source list rebuilds from the GitHub API on every deploy.',
    stack: ['JavaScript', 'GSAP', 'Lenis'],
    links: [{ label: 'Source code', href: 'https://github.com/SankeerthNara/po' }],
  },
];

// Plain-English summaries for the repos worth explaining; others show raw PR titles.
export const repoNotes = {
  'Termix-SSH/Termix': 'Added an "Open File Manager" action to terminal tabs and fixed autocomplete contrast across themes.',
  'mozilla-mobile/firefox-ios': 'Moved Microsurvey state to the @Copyable macro and removed dead translation, notification and telemetry code.',
  'microsoft/aspire': 'Brought deploy, publish and project-creation workflows into the Aspire editor pane, plus a fast path for release PRs.',
  'microsoft/hve-core': 'Corrected a stale marketplace description in the shared AI artifact docs.',
  'google/xrblocks': 'Fixed read-buffer composition in the occlusion pass of the WebXR renderer.',
  'OpenRailAssociation/netzgrafik-editor-frontend': 'Made the language selector available when the timetable editor runs standalone.',
  '7-Blocks/Kepler': 'Built a satellite spotlight effect, a global keyboard shortcut system and an animated 404 page.',
  'Devlaner/loomy': 'Patched an IDOR that exposed user emails to any signed-in user.',
  'nbkdoesntknowcoding/mnema': 'Reworked empty states and added absolute timestamps on hover.',
  'IN3PIRE/db': 'Added --json output across the CLI and spinners for long-running queries.',
};

// Rewrites for terse PR titles, keyed by PR URL.
export const titleOverrides = {
  'https://github.com/Termix-SSH/Termix/pull/1061': 'Fix autocomplete contrast and legibility across themes',
  'https://github.com/mozilla-mobile/firefox-ios/pull/35109': 'Use the @Copyable macro for MicrosurveyState',
  'https://github.com/mozilla-mobile/firefox-ios/pull/34812': 'Remove dead engine and service methods in Translations',
  'https://github.com/mozilla-mobile/firefox-ios/pull/34830': 'Remove unused NotificationManager methods',
  'https://github.com/mozilla-mobile/firefox-ios/pull/34822': 'Remove unused GleanWrapper telemetry functions',
  'https://github.com/microsoft/hve-core/pull/2777': 'Fix stale marketplace locator description in AI artifact docs',
  'https://github.com/Elladriel80/Aratea/pull/205': 'Fix stale structure block and document production endpoints',
  'https://github.com/nbkdoesntknowcoding/mnema/pull/80': 'Improve empty states',
  'https://github.com/nbkdoesntknowcoding/mnema/pull/88': 'Fix the sessions empty state',
};

export const skills = {
  'Languages I write': ['C', 'C++', 'Python', 'JavaScript', 'SQL', 'HTML', 'CSS', 'Bash'],
  'Tools I use': ['Git', 'GitHub', 'GitHub Actions', 'React', 'FastAPI', 'DeepFace', 'OpenCV'],
  'Learning now': ['Node.js', 'Backend systems', 'Artificial intelligence','Computer vision', 'Open-source architecture'],
};
