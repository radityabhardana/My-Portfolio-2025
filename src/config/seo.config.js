/**
 * SEO Configuration for Raditya Bagus Hardana Portfolio
 * This file contains all SEO-related settings and configurations
 */

const SEO_CONFIG = {
  // Website metadata
  site: {
    name: "Raditya Bagus Hardana Portfolio",
    domain: "https://radityabagushardana.vercel.app",
    language: "en-US",
    locale: "en_US",
  },

  // Author information
  author: {
    name: "Raditya Bagus Hardana",
    email: "your-email@example.com",
    title: "Full Stack Web3 Developer & Crypto Trader",
    bio: "Full Stack Web3 Developer specializing in React, Next.js, TypeScript, Blockchain, and DeFi. Crypto Trader with Binance x AWS Node Runners Certificate and expertise in modern web technologies and Web3 integration.",
    image: "https://radityabagushardana.vercel.app/img/title.png",
    social: {
      github: "https://github.com/radityabagus",
      linkedin: "https://linkedin.com/in/radityabagushardana",
      twitter: "https://twitter.com/radityabagus",
    },
  },

  // Main SEO keywords
  keywords: {
    primary: [
      "Web3 Developer",
      "Full Stack Developer",
      "Blockchain Developer",
      "Smart Contract Developer",
      "React Developer",
      "Next.js Developer",
      "Crypto Trader",
      "DeFi Developer",
    ],
    secondary: [
      "Web3 Portfolio",
      "Binance x AWS Node Runners",
      "Cryptocurrency",
      "Blockchain Technology",
      "Ethereum",
      "Smart Contracts",
      "DeFi Projects",
      "Crypto Trading",
      "TypeScript Developer",
      "JavaScript Developer",
      "Frontend Developer",
      "Backend Developer",
      "GSAP Animation",
      "Three.js",
      "UI/UX Design",
      "Modern Web Technologies",
    ],
  },

  // Page metadata (for different pages/sections)
  pages: {
    home: {
      title: "Raditya Bagus Hardana - Full Stack Web3 Developer & Crypto Trader",
      description:
        "Full Stack Web3 Developer & Crypto Trader with Binance x AWS Node Runners Certificate. Specializing in React, Next.js, TypeScript, Blockchain, and DeFi. Explore my portfolio, Web3 projects, and skills.",
      keywords:
        "Web3 Developer, Full Stack Developer, Blockchain, Smart Contracts, React, Next.js, Crypto Trader",
    },
    about: {
      title: "About - Raditya Bagus Hardana | Web3 Developer & Crypto Trader",
      description:
        "Learn more about Raditya Bagus Hardana, a passionate Full Stack Web3 Developer with expertise in blockchain, DeFi, and crypto trading. Holds Binance x AWS Node Runners Certificate with proven experience in modern web technologies.",
    },
    projects: {
      title: "Web3 & Blockchain Projects - Raditya Bagus Hardana",
      description:
        "Explore my portfolio of Web3 and blockchain projects built with React, Next.js, TypeScript, and Web3 technologies. Including DeFi integrations and smart contract interactions.",
    },
    skills: {
      title: "Skills - Raditya Bagus Hardana",
      description:
        "Technical skills and expertise in React, Next.js, TypeScript, JavaScript, HTML, CSS, and more.",
    },
    certificates: {
      title: "Certificates - Raditya Bagus Hardana",
      description:
        "Professional certifications and credentials in web development and related fields.",
    },
    contact: {
      title: "Contact - Raditya Bagus Hardana",
      description:
        "Get in touch with me for collaborations, opportunities, or just to say hello.",
    },
  },

  // JSON-LD Structured Data
  schemaOrg: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Raditya Bagus Hardana",
      url: "https://radityabagushardana.vercel.app",
      image: "https://radityabagushardana.vercel.app/img/title.png",
      description:
        "Full Stack Developer specializing in React, Next.js, TypeScript, and Modern Web Technologies",
      jobTitle: "Full Stack Developer",
    },
  },

  // Search engine verification (add these IDs if you have them)
  verification: {
    googleSiteVerification: "", // Add your Google verification code here
    msValidate: "", // Add your Bing verification code here
    yandexVerification: "", // Add your Yandex verification code here
  },

  // Analytics (optional)
  analytics: {
    googleAnalyticsId: "", // Add your Google Analytics ID
    googleTagManagerId: "", // Add your GTM ID
  },

  // Sitemap and robots configuration
  crawling: {
    sitemapUrl: "https://radityabagushardana.vercel.app/sitemap.xml",
    robotsUrl: "https://radityabagushardana.vercel.app/robots.txt",
    allowBots: true,
    crawlDelay: 1, // seconds
  },

  // Open Graph defaults
  openGraph: {
    type: "website",
    image: "https://radityabagushardana.vercel.app/img/title.png",
    imageWidth: 1200,
    imageHeight: 630,
    locale: "en_US",
  },

  // Twitter Card defaults
  twitter: {
    card: "summary_large_image",
    site: "@radityabagus", // Add your Twitter handle
    creator: "@radityabagus",
  },
};

export default SEO_CONFIG;
