import React, { useEffect } from 'react';

interface SEOMetaProps {
  title: string;
  description?: string;
  og_image?: string;
}

const SEOMeta: React.FC<SEOMetaProps> = ({ title, description, og_image }) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (description) setMeta('description', description);
    
    // Basic OG tags
    if (og_image) {
        let element = document.querySelector(`meta[property="og:image"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('property', "og:image");
          document.head.appendChild(element);
        }
        element.setAttribute('content', og_image);
    }
  }, [title, description, og_image]);

  return null; // Renders nothing visibly
};

export default SEOMeta;
