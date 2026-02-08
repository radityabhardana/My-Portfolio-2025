import React from 'react';

/**
 * SEOImage Component
 * Optimized image component with proper alt text and lazy loading for SEO
 * 
 * Usage:
 * <SEOImage 
 *   src="/img/project.png"
 *   alt="Project screenshot showing React dashboard"
 *   title="Project Title"
 *   lazy={true}
 * />
 */
const SEOImage = ({ 
  src, 
  alt, 
  title = null, 
  lazy = true, 
  className = '', 
  style = {},
  ...props 
}) => {
  // Ensure alt text is provided for accessibility and SEO
  if (!alt) {
    console.warn(`Image without alt text: ${src}`);
  }

  return (
    <img
      src={src}
      alt={alt}
      title={title || alt}
      loading={lazy ? 'lazy' : 'eager'}
      className={className}
      style={style}
      {...props}
    />
  );
};

export default SEOImage;
