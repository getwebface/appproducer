import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  alignment?: 'left' | 'center' | 'right';
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  ctaText, 
  ctaLink = '#', 
  backgroundImage,
  alignment = 'center' 
}) => {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[alignment];

  return (
    <div 
      className="hero min-h-[600px] bg-base-200 relative overflow-hidden"
    >
      {/* Background with subtle parallax or scale effect could go here */}
      {backgroundImage && (
         <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="hero-overlay bg-black bg-opacity-60 z-0"></div>
         </>
      )}
      
      <div className={`hero-content z-10 w-full max-w-5xl flex-col ${alignClass} ${backgroundImage ? 'text-neutral-content' : 'text-base-content'}`}>
        <div className={`max-w-3xl ${alignment === 'center' ? 'text-center' : ''}`}>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p 
              className="py-6 text-xl md:text-2xl opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
          )}
          
          {ctaText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a href={ctaLink} className="btn btn-primary btn-lg shadow-xl hover:scale-105 transition-transform">
                {ctaText}
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;