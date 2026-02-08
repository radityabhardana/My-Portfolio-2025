/**
 * SEO Utilities
 * Helper functions untuk SEO optimization
 */

/**
 * Generate structured data untuk breadcrumb navigation
 */
export const generateBreadcrumbSchema = (breadcrumbs) => {
  const items = breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.label,
    item: crumb.url
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
  };
};

/**
 * Generate FAQPage structured data
 */
export const generateFAQSchema = (faqs) => {
  const mainEntity = faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: mainEntity
  };
};

/**
 * Generate article/blog post structured data
 */
export const generateArticleSchema = (article) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate,
    author: {
      "@type": "Person",
      name: article.authorName,
      url: article.authorUrl
    },
    publisher: {
      "@type": "Organization",
      name: article.publisherName,
      logo: {
        "@type": "ImageObject",
        url: article.publisherLogo
      }
    }
  };
};

/**
 * Insert JSON-LD structured data into document head
 */
export const insertStructuredData = (schema) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Update page title dengan best practices
 * Format: "Primary Keyword - Brand Name" (50-60 chars)
 */
export const setPageTitle = (title, brandName = "Raditya Bagus Hardana") => {
  const fullTitle = title.includes(brandName) ? title : `${title} - ${brandName}`;
  document.title = fullTitle;
};

/**
 * Generate keyword-rich slug from text
 */
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-');       // Remove multiple hyphens
};

/**
 * Check if URL is canonical (no trailing slash, lowercase, etc)
 */
export const isCanonicalURL = (url) => {
  const canonicalURL = new URL(url);
  return !canonicalURL.pathname.endsWith('/') && 
         canonicalURL.pathname === canonicalURL.pathname.toLowerCase();
};

/**
 * Generate social meta tags programmatically
 */
export const setSocialMetaTags = (config) => {
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

  // Open Graph
  updateMetaTag('og:title', config.title, true);
  updateMetaTag('og:description', config.description, true);
  updateMetaTag('og:image', config.image, true);
  updateMetaTag('og:url', config.url, true);

  // Twitter
  updateMetaTag('twitter:title', config.title, true);
  updateMetaTag('twitter:description', config.description, true);
  updateMetaTag('twitter:image', config.image, true);
};

/**
 * Validate if all critical SEO elements are present
 */
export const validateSEO = () => {
  const issues = [];

  // Check title
  if (!document.title || document.title.length < 10) {
    issues.push('Title tag missing or too short');
  }
  if (document.title.length > 70) {
    issues.push('Title tag too long (should be < 70 chars)');
  }

  // Check meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    issues.push('Meta description missing');
  } else if (metaDescription.content.length < 50) {
    issues.push('Meta description too short (should be 50-160 chars)');
  } else if (metaDescription.content.length > 160) {
    issues.push('Meta description too long (should be 50-160 chars)');
  }

  // Check canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    issues.push('Canonical URL missing');
  }

  // Check OG tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  
  if (!ogTitle || !ogDescription || !ogImage) {
    issues.push('Open Graph tags incomplete');
  }

  // Check for H1
  const h1 = document.querySelector('h1');
  if (!h1) {
    issues.push('H1 tag missing');
  }

  return {
    isValid: issues.length === 0,
    issues: issues
  };
};

export default {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
  insertStructuredData,
  setPageTitle,
  generateSlug,
  isCanonicalURL,
  setSocialMetaTags,
  validateSEO
};
