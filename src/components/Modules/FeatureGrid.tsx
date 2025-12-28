import React from 'react';
import * as Icons from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface FeatureItem {
  icon: string; // Name of lucide icon
  title: string;
  description: string;
}

interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  items: FeatureItem[];
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ title, subtitle, items = [] }) => {
  // The "Magic" hook. One line = full animation for adding/removing items.
  const [parent] = useAutoAnimate();

  return (
    <div className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && <h2 className="text-4xl font-bold mb-4">{title}</h2>}
            {subtitle && <p className="text-xl opacity-75 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}

        <div ref={parent} className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item, idx) => {
            const IconComponent = (Icons as any)[item.icon] || Icons.Star;
            return (
              <div key={idx} className="card bg-base-200 hover:bg-base-300 transition-colors duration-300 border border-base-content/5">
                <div className="card-body">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="card-title text-xl mb-2">{item.title}</h3>
                  <p className="opacity-80 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;