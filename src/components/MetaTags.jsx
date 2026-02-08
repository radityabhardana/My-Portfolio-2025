import { useEffect } from 'react';

/**
 * MetaTags Component for dynamic SEO management
 * Usage: <MetaTags title="..." description="..." image="..." />
 */
const MetaTags = ({
  title = 'Raditya Bagus Hardana - Full Stack Developer & Creative Designer',
  description = 'Full Stack Developer specializing in React, Next.js, TypeScript, and Modern Web Technologies. Explore my portfolio, projects, skills, and certificates.',
  image = 'https://radityabagushardana.vercel.app/img/title.png',
  url = 'https://radityabagushardana.vercel.app/',
  type = 'website',
  keywords = 'Full Stack Developer, React Developer, Next.js Developer, TypeScript, Web Development'
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name, value, property = false) => {
      let tag = document.querySelector(
        property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      );
      
      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', value);
    };
    
    // Basic Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph Meta Tags
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    
    // Twitter Meta Tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:url', url, true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);
    
    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, image, url, type, keywords]);
  
  return null; // This component only updates meta tags, doesn't render anything
};

export default MetaTags;
