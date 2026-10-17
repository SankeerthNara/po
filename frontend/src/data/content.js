// Hand-written copy. Pull request data lives in prs.json (regenerated on build).

export const projects = [
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
    links: [{ label: 'Source code', href: 'https://github.com/SankeerthNara/portfolio' }],
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
