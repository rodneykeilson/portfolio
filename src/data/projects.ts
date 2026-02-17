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
    title: 'ToxiScope',
    description: 'Multilabel Toxic Comment Detection',
    longDescription: 'Efficient Transformer-Based Multilabel Toxic Comment Detection for Gaming Communities. Features BERT-tiny fine-tuned with Focal Loss for CPU inference achieving 0.817 Macro-F1.',
    tech: ['Python', 'PyTorch', 'HuggingFace', 'React Native', 'TypeScript'],
    screenshots: createProjectScreenshots('ToxiScope', 'cyan', 3),
    github: 'https://github.com/rodneykeilson/ToxiScope',
    category: 'ml',
    featured: true,
    color: 'cyan',
  },
  {
    title: 'SmuleRod',
    description: 'Smule Video Downloader for Android',
    longDescription: 'A minimalist, WCAG AAA compliant Android app to download Smule videos with built-in player, WebView-based extraction to bypass Cloudflare protection.',
    tech: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Media3', 'OkHttp'],
    screenshots: createProjectScreenshots('SmuleRod', 'pink', 3),
    github: 'https://github.com/rodneykeilson/SmuleRod',
    category: 'mobile',
    featured: true,
    color: 'pink',
  },
  {
    title: 'MikuMikuWorldEX',
    description: 'Universal Chart Editor Fork',
    longDescription: 'Extended fork of MikuMikuWorld4CC, a universal rhythm game chart editor. Features enhanced preview system with official in-game particle effects.',
    tech: ['C++', 'OpenGL', 'ImGui', 'GLFW'],
    screenshots: createProjectScreenshots('MikuMikuWorldEX', 'purple', 3),
    github: 'https://github.com/rodneykeilson/MikuMikuWorldEX',
    category: 'tool',
    featured: true,
    color: 'purple',
  },
  {
    title: 'ScrapiReddit',
    description: 'Zero-Auth Reddit Scraping Toolkit',
    longDescription: 'Complete Reddit scraper without API keys. Features pagination, comment harvesting, media archiving, and CSV exports with resilient caching.',
    tech: ['Python', 'Requests', 'TOML', 'CLI'],
    screenshots: createProjectScreenshots('ScrapiReddit', 'cyan', 2),
    github: 'https://github.com/rodneykeilson/ScrapiReddit',
    category: 'tool',
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
    color: 'pink',
  },
  {
    title: 'Plagiarism Split Checker',
    description: 'Smart Document Plagiarism Analysis',
    longDescription: 'React app that splits large documents into manageable chunks for plagiarism checking with weighted average calculations.',
    tech: ['React', 'TypeScript', 'PDF.js', 'TailwindCSS'],
    screenshots: createProjectScreenshots('Plagiarism Split Checker', 'purple', 2),
    github: 'https://github.com/rodneykeilson/plagiarism-split-checker',
    category: 'web',
    color: 'purple',
  },
  {
    title: 'EverdrivenDays',
    description: 'Unity Game Project',
    longDescription: 'A small project made with the purpose of familiarizing oneself with Unity game development.',
    tech: ['Unity', 'C#', 'Game Development'],
    screenshots: createProjectScreenshots('EverdrivenDays', 'cyan', 2),
    github: 'https://github.com/rodneykeilson/EverdrivenDays',
    category: 'game',
    color: 'cyan',
  },
];

// Private projects - showcased without revealing actual names
export const privateProjects: PrivateProject[] = [
  {
    title: 'Private Project #1',
    description: 'Rhythm game utilities and tools suite with real-time data integration',
    category: 'tool',
    color: 'cyan',
  },
  {
    title: 'Private Project #2',
    description: 'Full-stack B2B company website with product catalog and admin dashboard',
    category: 'web',
    color: 'pink',
  },
  {
    title: 'Private Project #3',
    description: 'Interactive browser-based game with multiplayer support',
    category: 'game',
    color: 'purple',
  },
  {
    title: 'Private Project #4',
    description: 'Autonomous AI character battles designed for short-form content creation',
    category: 'game',
    color: 'cyan',
  },
  {
    title: 'Private Project #5',
    description: 'Personal automation and AI-powered assistant project',
    category: 'ml',
    color: 'pink',
  },
  {
    title: 'Private Project #6',
    description: 'Specialized data extraction tools for game assets and metadata',
    category: 'tool',
    color: 'purple',
  },
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
