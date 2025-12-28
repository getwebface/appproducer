import React from 'react';

interface ContentBlockProps {
  title?: string;
  html_content?: string;
  image_url?: string;
  alignment?: 'left' | 'right';
}

const ContentBlock: React.FC<ContentBlockProps> = ({ 
  title, 
  html_content, 
  image_url, 
  alignment = 'left' 
}) => {
  return (
    <div className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row items-center gap-12 ${alignment === 'right' ? 'md:flex-row-reverse' : ''}`}>
          
          <div className="flex-1">
            {title && <h2 className="text-3xl font-extrabold text-gray-900 mb-6">{title}</h2>}
            {html_content && (
              <div 
                className="prose prose-indigo text-gray-500"
                dangerouslySetInnerHTML={{ __html: html_content }}
              />
            )}
          </div>

          {image_url && (
            <div className="flex-1">
              <img 
                className="w-full rounded-xl shadow-lg ring-1 ring-black ring-opacity-5"
                src={image_url} 
                alt={title || "Content Image"} 
              />
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default ContentBlock;
