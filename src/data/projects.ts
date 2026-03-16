/**
 * Shared project data for both Classic and Game modes
 */

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
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

export const projects: Project[] = [
  {
    title: 'OSTMC',
    description: 'Open Source Toxicity Multiclassifier',
    longDescription: 'A robust toxic comment classification model and API using React, Vite, and modern machine learning techniques.',
    tech: ['React', 'TypeScript', 'Vite', 'TailwindCSS'],
    github: 'https://github.com/rodneykeilson/OSTMC',
    category: 'web',
    featured: true,
    color: 'pink',
  },
  {
    title: 'RetsuTomo',
    description: 'Smart Queue Management System',
    longDescription: 'A cross-platform React Native app for businesses and customers to manage queues remotely. Features real-time updates and push notifications.',
    tech: ['React Native', 'Firebase', 'Cloud Functions', 'React Navigation'],
    github: 'https://github.com/rodneykeilson/RetsuTomo',
    category: 'mobile',
    featured: true,
    color: 'purple',
  },
  {
    title: 'ToxiScope',
    description: 'Multilabel Toxic Comment Detection',
    longDescription: 'Efficient Transformer-Based Multilabel Toxic Comment Detection for Gaming Communities. Features BERT-tiny fine-tuned with Focal Loss for CPU inference achieving 0.817 Macro-F1.',
    tech: ['Python', 'PyTorch', 'HuggingFace', 'React Native', 'TypeScript'],
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
    github: 'https://github.com/rodneykeilson/ScrapiReddit',
    category: 'tool',
    color: 'cyan',
  },
  {
    title: 'Commulyzer',
    description: 'Community Discussion Analyzer',
    longDescription: 'Collects Reddit community discussions, normalizes raw data, and produces rule-based toxicity labels for downstream ML analysis.',
    tech: ['Python', 'Pandas', 'Regex', 'Data Pipeline'],
    github: 'https://github.com/rodneykeilson/Commulyzer',
    category: 'tool',
    color: 'pink',
  },
  {
    title: 'Plagiarism Split Checker',
    description: 'Smart Document Plagiarism Analysis',
    longDescription: 'React app that splits large documents into manageable chunks for plagiarism checking with weighted average calculations.',
    tech: ['React', 'TypeScript', 'PDF.js', 'TailwindCSS'],
    github: 'https://github.com/rodneykeilson/plagiarism-split-checker',
    category: 'web',
    color: 'purple',
  },
  {
    title: 'EverdrivenDays',
    description: 'Unity Game Project',
    longDescription: 'A small project made with the purpose of familiarizing oneself with Unity game development.',
    tech: ['Unity', 'C#', 'Game Development'],
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
