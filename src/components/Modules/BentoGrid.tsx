import React from 'react';
import { motion } from 'framer-motion';

interface BentoItem {
  title: string;
  content: string;
  colSpan?: number; // 1 to 4
  rowSpan?: number; // 1 or 2
  type?: 'text' | 'image' | 'stat';
  imageUrl?: string;
  statValue?: string;
}

interface BentoGridProps {
  title?: string;
  items: BentoItem[];
}

const BentoGrid: React.FC<BentoGridProps> = ({ title, items = [] }) => {
  return (
    <div className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {title && <h2 className="text-4xl font-bold text-center mb-12">{title}</h2>}
        
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`
                group relative overflow-hidden rounded-3xl bg-base-200 border border-base-content/5
                hover:shadow-xl transition-all duration-300
                ${item.colSpan === 2 ? 'md:col-span-2' : item.colSpan === 3 ? 'md:col-span-3' : 'md:col-span-1'}
                ${item.rowSpan === 2 ? 'md:row-span-2' : 'md:row-span-1'}
              `}
            >
              {/* Background Image logic for image types */}
              {item.type === 'image' && item.imageUrl && (
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                />
              )}
              
              {/* Overlay for readability if image */}
              {item.type === 'image' && <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />}

              <div className={`relative h-full p-6 flex flex-col justify-end ${item.type === 'image' ? 'text-white' : 'text-base-content'}`}>
                {item.type === 'stat' && (
                  <div className="mb-auto mt-2">
                    <span className="text-5xl font-black tracking-tighter text-primary">{item.statValue}</span>
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className={`text-sm ${item.type === 'image' ? 'text-gray-200' : 'opacity-70'}`}>
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;