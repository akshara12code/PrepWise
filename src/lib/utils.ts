// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Interview Covers ---
const interviewCovers = [
  '/adobe.png',
  '/amazon.png',
  '/facebook.png',
  '/hostinger.png',
  '/pinterest.png',
  '/quora.png',
  '/reddit.png',
  '/skype.png',
  '/spotify.png',
  '/telegram.png',
  '/tiktok.png',
  '/yahoo.png',
  '/ai-avatar.png'
];

export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return `/covers${interviewCovers[randomIndex]}`;
};

// --- Class Name Utility ---
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Technology Icons ---
// Corrected base URL for devicons-plain on unpkg.com for direct file access
// This URL will lead to a directory where you can find individual icon folders (e.g., /javascript, /react)
const techIconBaseURL = "https://unpkg.com/devicons-plain@1.0.0/icons";

// Define the mappings object
const mappings = {
  'javascript': 'JavaScript',
  'typescript': 'TypeScript',
  'react': 'React',
  'nextjs': 'Next.js',
  'nodejs': 'Node.js',
  'python': 'Python',
  'java': 'Java',
  'cpp': 'C++', // Display name
  'html': 'HTML',
  'css': 'CSS',
  'mongodb': 'MongoDB',
  'mysql': 'MySQL',
  'docker': 'Docker',
  'kubernetes': 'Kubernetes',
  'aws': 'AWS',
  'azure': 'Azure',
  'gcp': 'Google Cloud',
  'git': 'Git',
  'github': 'GitHub',
  'figma': 'Figma',
  // Added 'cplusplus' key for correct icon file mapping (Devicons name C++ as cplusplus)
  'cplusplus': 'C++',
  // Add more mappings as needed
};

const normalizeTechName = (tech: string) => {
  const key = tech.toLowerCase()
                  .replace(/\.js$/, "") // Remove .js suffix (e.g., for 'nodejs')
                  .replace(/[^a-z0-9]/g, ""); // Remove non-alphanumeric characters
  
  // Special handling for 'cpp' input to map to 'cplusplus' for icon lookup
  if (key === 'cpp') {
    return 'cplusplus';
  }
  
  // Return the normalized key that matches the devicon folder name
  // If a mapping exists for a cleaner name, return that key, otherwise the normalized tech itself
  return Object.keys(mappings).find(map_key => mappings[map_key as keyof typeof mappings].toLowerCase() === key) || key;
};


const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok; // Returns true if the icon exists (e.g., 200 OK)
  } catch {
    return false; // Network error or other issues
  }
};

export const getTechLogos = async (techArray: string[]) => {
  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    const displayName = mappings[normalized as keyof typeof mappings] || tech; // Get display name from mapping

    // Construct the URL using the unpkg base and the specific icon file (e.g., 'javascript/javascript-plain.svg')
    // The 'devicons-plain' package typically uses '-plain.svg' for its icon files.
    return {
      tech: displayName, // Use the display name for the tech property
      url: `${techIconBaseURL}/${normalized}/${normalized}-plain.svg`,
    };
  });

  // Use Promise.all to concurrently check if each icon URL exists
  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : "/tech.svg", // Fallback to a generic /tech.svg if icon not found
    }))
  );

  return results;
};