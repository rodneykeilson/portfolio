/**
 * Shared project data for both Classic and Game modes
 */

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  screenshots: string[];
  github: string;
  category: 'ml' | 'mobile' | 'web' | 'game' | 'tool';
  featured?: boolean;
  color: 'cyan' | 'pink' | 'purple';
}

export interface PrivateProject {
  title: string;
  description: string;
  category: 'ml' | 'mobile' | 'web' | 'game' | 'tool';
  color: 'cyan' | 'pink' | 'purple';
}

const screenshotAccentByColor = {
  cyan: '#00CCC0',
  pink: '#FF77A8',
  purple: '#BB88FF',
} as const;

function createScreenshotPlaceholder(title: string, slide: number, accent: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#141420"/>
        <stop offset="100%" stop-color="#0B0B13"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1280" height="720" fill="url(#bg)"/>
    <rect width="1280" height="720" fill="url(#glow)"/>
    <g opacity="0.2" fill="none" stroke="${accent}">
      <path d="M0 610 L1280 250"/>
      <path d="M0 680 L1280 320"/>
      <path d="M180 0 L1180 720"/>
    </g>
    <rect x="56" y="56" width="1168" height="608" rx="24" fill="none" stroke="${accent}" stroke-opacity="0.5"/>
    <text x="640" y="315" text-anchor="middle" font-size="64" font-family="Inter, Arial, sans-serif" font-weight="700" fill="#F5F5FF">${title}</text>
    <text x="640" y="380" text-anchor="middle" font-size="26" font-family="Inter, Arial, sans-serif" fill="#A0A0B8">Screenshot Placeholder ${slide}</text>
    <text x="640" y="430" text-anchor="middle" font-size="18" font-family="Inter, Arial, sans-serif" fill="#6C6C86">Replace with real project preview image</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function createProjectScreenshots(title: string, color: keyof typeof screenshotAccentByColor, count = 3): string[] {
  return Array.from({ length: count }, (_, index) =>
    createScreenshotPlaceholder(title, index + 1, screenshotAccentByColor[color])
  );
}

export const projects: Project[] = [
  {
    title: 'OSTMC',
    description: 'osu! Standard to Mania Converter',
    longDescription: 'A robust beatmap conversion tool with a React/TypeScript architecture engineered to translate osu! standard charts into mania maps using intelligent rule-based parsing.',
    tech: ['React', 'TypeScript', 'Vite', 'TailwindCSS'],
    github: 'https://github.com/rodneykeilson/OSTMC',
    category: 'tool',
    featured: true,
    color: 'pink',
    screenshots: createProjectScreenshots('OSTMC', 'pink', 1)
  },
  {
    title: 'Plagiarism Split Checker',
    description: 'Smart Document Plagiarism Analysis',
    longDescription: 'React app that splits large documents into manageable chunks for plagiarism checking with weighted average calculations and PDF processing.',
    tech: ['React', 'TypeScript', 'PDF.js', 'TailwindCSS'],
    screenshots: createProjectScreenshots('Plagiarism Split Checker', 'purple', 2),
    github: 'https://github.com/rodneykeilson/plagiarism-split-checker',
    category: 'web',
    featured: true,
    color: 'purple',
  },
  {
    title: 'Multiplayer Space Invaders',
    description: 'Real-Time Co-Op Arcade',
    longDescription: 'Live multiplayer adaptation of the classic arcade game featuring WebSocket-based real-time state synchronization, game lobby routing, and a dynamic database-backed leaderboard.',
    tech: ['Node.js', 'Express', 'Socket.IO', 'Vanilla JS', 'MySQL'],
    screenshots: createProjectScreenshots('Multiplayer Space Invaders', 'cyan', 2),
    github: 'https://github.com/rodneykeilson/live-multiplayer-space-invaders',
    category: 'game',
    featured: true,
    color: 'cyan',
  },
  {
    title: 'RetsuTomo',
    description: 'Smart Queue Management System',
    longDescription: 'A cross-platform React Native app for businesses and customers to manage queues remotely. Features real-time updates and push notifications.',
    tech: ['React Native', 'Firebase', 'Cloud Functions', 'React Navigation'],
    github: 'https://github.com/rodneykeilson/RetsuTomo',
    category: 'mobile',
    featured: false,
    color: 'purple',
    screenshots: createProjectScreenshots('RetsuTomo', 'purple', 1)
  },
  {
    title: 'ToxiScope',
    description: 'Multilabel Toxic Comment Detection',
    longDescription: 'Efficient Transformer-Based Multilabel Toxic Comment Detection for Gaming Communities. Features BERT-tiny fine-tuned with Focal Loss for CPU inference achieving 0.817 Macro-F1.',
    tech: ['Python', 'PyTorch', 'HuggingFace', 'React Native', 'TypeScript'],
    screenshots: createProjectScreenshots('ToxiScope', 'cyan', 3),
    github: 'https://github.com/rodneykeilson/ToxiScope',
    category: 'ml',
    featured: false,
    color: 'cyan',
  },
  {
    title: 'ScrapiReddit',
    description: 'Zero-Auth Reddit Scraping Toolkit',
    longDescription: 'Complete Reddit scraper without API keys. Features pagination, comment harvesting, media archiving, and CSV exports with resilient caching.',
    tech: ['Python', 'Requests', 'TOML', 'CLI'],
    screenshots: createProjectScreenshots('ScrapiReddit', 'cyan', 2),
    github: 'https://github.com/rodneykeilson/ScrapiReddit',
    category: 'tool',
    featured: false,
    color: 'cyan',
  },
  {
    title: 'Commulyzer',
    description: 'Community Discussion Analyzer',
    longDescription: 'Collects Reddit community discussions, normalizes raw data, and produces rule-based toxicity labels for downstream ML analysis.',
    tech: ['Python', 'Pandas', 'Regex', 'Data Pipeline'],
    screenshots: createProjectScreenshots('Commulyzer', 'pink', 2),
    github: 'https://github.com/rodneykeilson/Commulyzer',
    category: 'tool',
    featured: false,
    color: 'pink',
  }
];

// Category labels
export const categoryLabels = {
  ml: 'Machine Learning',
  mobile: 'Mobile',
  web: 'Web',
  game: 'Game',
  tool: 'Tool',
};

// Color hex values for game mode
export const colorHex = {
  cyan: 0x00CCC0,
  pink: 0xFF77A8,
  purple: 0xBB88FF,
};
