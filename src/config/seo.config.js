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
    email: "rexnabagus@gmail.com",
    title: "Web Developer & Web 3 Developer",
    bio: "Web Developer & Web 3 Developer specializing in React, Next.js, TypeScript, JavaScript, and Blockchain technologies.",
    image: "https://radityabagushardana.vercel.app/img/title.png",
    social: {
      github: "https://github.com/radityabhardana",
      linkedin: "https://www.linkedin.com/in/raditya-hardana-962373382/",
      instagram: "https://www.instagram.com/zxlyn_16/",
    },
  },

  // Main SEO keywords
  keywords: {
    primary: [
      "Web Developer",
      "Web 3 Developer",
      "Blockchain Developer",
      "React Developer",
      "Next.js Developer",
      "JavaScript Developer",
      "TypeScript Developer",
    ],
    secondary: [
      "Smart Contracts",
      "Blockchain Technology",
      "Ethereum",
      "Web Development",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "HTML",
      "CSS",
      "Web3 Integration",
    ],
  },

  // Page metadata (for different pages/sections)
  pages: {
    home: {
      title: "Raditya Bagus Hardana - Web Developer & Web 3 Developer",
      description:
        "Web Developer & Web 3 Developer specializing in React, Next.js, TypeScript, JavaScript, and Blockchain technologies. Explore my portfolio, projects, and skills.",
      keywords:
        "Web Developer, Web 3 Developer, Blockchain, Smart Contracts, React, Next.js, TypeScript, JavaScript",
    },
    about: {
      title: "About - Raditya Bagus Hardana | Web Developer & Web 3 Developer",
      description:
        "Learn more about Raditya Bagus Hardana, a passionate Web Developer & Web 3 Developer with expertise in blockchain technologies and modern web development.",
    },
    projects: {
      title: "Web Development & Blockchain Projects - Raditya Bagus Hardana",
      description:
        "Explore my portfolio of web development and blockchain projects built with React, Next.js, TypeScript, and Web3 technologies.",
    },
    skills: {
      title: "Skills - Raditya Bagus Hardana",
      description:
        "Technical skills and expertise in React, Next.js, TypeScript, JavaScript, HTML, CSS, and Blockchain development.",
    },
    certificates: {
      title: "Certificates - Raditya Bagus Hardana",
      description:
        "Professional certifications and credentials in web development and blockchain technologies.",
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
        "Web Developer & Web 3 Developer specializing in React, Next.js, TypeScript, JavaScript, and Blockchain technologies",
      jobTitle: "Web Developer & Web 3 Developer",
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
    // TODO: confirm the owner's Twitter/X handle. No account URL was found in the repo, so none is inferred.
    site: "",
    creator: "", // Add your Twitter handle
  },
};

export default SEO_CONFIG;
