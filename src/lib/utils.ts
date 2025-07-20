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
const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicon/icons";

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



// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// // --- Interview Covers ---
// const interviewCovers = [
//   '/adobe.png',
//   '/amazon.png',
//   '/facebook.png',
//   '/hostinger.png',
//   '/pinterest.png',
//   '/quora.png',
//   '/reddit.png',
//   '/skype.png',
//   '/spotify.png',
//   '/telegram.png',
//   '/tiktok.png',
//   '/yahoo.png',
//   '/ai-avatar.png'
// ];

// export const getRandomInterviewCover = () => {
//   const randomIndex = Math.floor(Math.random() * interviewCovers.length);
//   return `/covers${interviewCovers[randomIndex]}`;
// };

// // --- Class Name Utility ---
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// // --- Technology Icons ---
// const localIconBaseURL = "/icons"; // Your icons are in public/icons

// const mappings = {
//   'javascript': 'JavaScript',
//   'typescript': 'TypeScript',
//   'react': 'React',
//   'nextjs': 'Next.js',
//   'nodejs': 'Node.js',
//   'python': 'Python',
//   'java': 'Java',
//   'cpp': 'C++',
//   'html': 'HTML',
//   'css': 'CSS',
//   'mongodb': 'MongoDB',
//   'mysql': 'MySQL',
//   'docker': 'Docker',
//   'kubernetes': 'Kubernetes',
//   'aws': 'AWS',
//   'azure': 'Azure',
//   'gcp': 'Google Cloud',
//   'git': 'Git',
//   'github': 'GitHub',
//   'figma': 'Figma',
//   'cplusplus': 'C++',
// };

// const normalizeTechName = (tech: string) => {
//   const key = tech.toLowerCase()
//                   .replace(/\.js$/, "")
//                   .replace(/[^a-z0-9]/g, "");
//   if (key === 'cpp') return 'cplusplus';
//   return key;
// };

// export const getTechLogos = (techArray: string[]) => {
//   return techArray.map((tech) => {
//     const normalized = normalizeTechName(tech);
//     const displayName = mappings[normalized as keyof typeof mappings] || tech;
//     return {
//       tech: displayName,
//       url: `${localIconBaseURL}/${normalized}.svg`, // Use local SVG icon
//     };
//   });
// };



// -----
// // src/lib/utils.ts
// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// // --- Interview Covers ---
// const interviewCovers = [
//   '/adobe.png',
//   '/amazon.png',
//   '/facebook.png',
//   '/hostinger.png',
//   '/pinterest.png',
//   '/quora.png',
//   '/reddit.png',
//   '/skype.png',
//   '/spotify.png',
//   '/telegram.png',
//   '/tiktok.png',
//   '/yahoo.png',
//   '/ai-avatar.png'
// ];

// export const getRandomInterviewCover = () => {
//   const randomIndex = Math.floor(Math.random() * interviewCovers.length);
//   return `/covers${interviewCovers[randomIndex]}`;
// };

// // --- Class Name Utility ---
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// // --- Technology Icons ---
// // Corrected base URL for devicons using the proper repository structure
// const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

// // Define the mappings object
// const mappings = {
//   'javascript': 'JavaScript',
//   'typescript': 'TypeScript',
//   'react': 'React',
//   'nextjs': 'Next.js',
//   'nodejs': 'Node.js',
//   'python': 'Python',
//   'java': 'Java',
//   'cpp': 'C++',
//   'html': 'HTML',
//   'css': 'CSS',
//   'mongodb': 'MongoDB',
//   'mysql': 'MySQL',
//   'docker': 'Docker',
//   'kubernetes': 'Kubernetes',
//   'aws': 'AWS',
//   'azure': 'Azure',
//   'gcp': 'Google Cloud',
//   'git': 'Git',
//   'github': 'GitHub',
//   'figma': 'Figma',
//   'cplusplus': 'C++',
//   'tailwindcss': 'Tailwind CSS',
//   'bootstrap': 'Bootstrap',
//   'vue': 'Vue.js',
//   'angular': 'Angular',
//   'express': 'Express.js',
//   'flask': 'Flask',
//   'django': 'Django',
//   'spring': 'Spring',
//   'laravel': 'Laravel',
//   'php': 'PHP',
//   'go': 'Go',
//   'rust': 'Rust',
//   'csharp': 'C#',
//   'dotnetcore': '.NET Core',
//   'flutter': 'Flutter',
//   'dart': 'Dart',
//   'swift': 'Swift',
//   'kotlin': 'Kotlin',
//   'android': 'Android',
//   'ios': 'iOS',
//   'sass': 'Sass',
//   'webpack': 'Webpack',
//   'vite': 'Vite',
//   'firebase': 'Firebase',
//   'postgresql': 'PostgreSQL',
//   'redis': 'Redis',
//   'graphql': 'GraphQL',
//   'apollographql': 'Apollo GraphQL',
// };

// const normalizeTechName = (tech: string) => {
//   const key = tech.toLowerCase()
//                   .replace(/\.js$/, "") // Remove .js suffix
//                   .replace(/[^a-z0-9]/g, ""); // Remove non-alphanumeric characters
  
//   // Special mappings for common variations
//   const specialMappings: { [key: string]: string } = {
//     'cpp': 'cplusplus',
//     'js': 'javascript',
//     'ts': 'typescript',
//     'node': 'nodejs',
//     'next': 'nextjs',
//     'vue': 'vuejs',
//     'html5': 'html5',
//     'css3': 'css3',
//     'tailwind': 'tailwindcss',
//     'c++': 'cplusplus',
//     'c#': 'csharp',
//     'reactjs': 'react',
//     'vuejs': 'vuejs',
//     'angularjs': 'angularjs',
//     'expressjs': 'express',
//     'dotnet': 'dotnetcore',
//     'postgresql': 'postgresql',
//     'mongo': 'mongodb',
//     'docker': 'docker',
//     'k8s': 'kubernetes',
//     'amazonwebservices': 'amazonwebservices',
//     'googlecloud': 'googlecloud',
//   };
  
//   return specialMappings[key] || key;
// };

// const checkIconExists = async (url: string) => {
//   try {
//     const response = await fetch(url, { method: "HEAD" });
//     return response.ok;
//   } catch {
//     return false;
//   }
// };

// export const getTechLogos = async (techArray: string[]) => {
//   const logoURLs = techArray.map((tech) => {
//     const normalized = normalizeTechName(tech);
//     const displayName = mappings[normalized as keyof typeof mappings] || tech;

//     // Try multiple URL patterns for devicons
//     const possibleUrls = [
//       `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
//       `${techIconBaseURL}/${normalized}/${normalized}-plain.svg`,
//       `${techIconBaseURL}/${normalized}/${normalized}-line.svg`,
//     ];

//     return {
//       tech: displayName,
//       possibleUrls,
//       normalized
//     };
//   });

//   // Check each URL pattern and use the first one that works
//   const results = await Promise.all(
//     logoURLs.map(async ({ tech, possibleUrls, normalized }) => {
//       for (const url of possibleUrls) {
//         if (await checkIconExists(url)) {
//           return { tech, url };
//         }
//       }
      
//       // If no devicon URL works, fallback to a generic tech icon
//       console.warn(`No icon found for: ${tech} (normalized: ${normalized})`);
//       return { 
//         tech, 
//         url: "/tech.svg" // Make sure you have this fallback icon in your public folder
//       };
//     })
//   );

//   return results;
// };

// // Alternative version that doesn't use async (if you prefer synchronous approach)
// export const getTechLogosSync = (techArray: string[]) => {
//   return techArray.map((tech) => {
//     const normalized = normalizeTechName(tech);
//     const displayName = mappings[normalized as keyof typeof mappings] || tech;
    
//     // Use the most common pattern (original variant)
//     return {
//       tech: displayName,
//       url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
//     };
//   });
// };