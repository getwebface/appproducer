import React from 'react';
import { Box, Plus, LayoutTemplate } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  type?: 'dashboard' | 'table' | 'generic';
  title?: string;
  description?: string;
  cta_text?: string;
  cta_link?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  type = 'generic',
  title,
  description,
  cta_text,
  cta_link = '#'
}) => {
  
  const content = {
    dashboard: {
      icon: LayoutTemplate,
      title: "Your command center is waiting",
      desc: "This dashboard needs a project to come alive. Pro users typically manage 5+ projects here.",
      cta: "Launch First Project"
    },
    table: {
      icon: Box,
      title: "No records found",
      desc: "The data stream is currently empty. Initialize a new entry to see it appear here.",
      cta: "Create Record"
    },
    generic: {
      icon: Box,
      title: "Nothing to see here",
      desc: "This section is empty.",
      cta: "Go Home"
    }
  }[type];

  const Icon = content.icon;
  const finalTitle = title || content.title;
  const finalDesc = description || content.desc;
  const finalCta = cta_text || content.cta;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-base-content/10 rounded-2xl bg-base-100/50"
    >
      <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mb-6 ring-8 ring-base-200/50">
        <Icon size={40} className="text-base-content/30" />
      </div>
      
      <h3 className="text-2xl font-bold mb-2">{finalTitle}</h3>
      <p className="text-base-content/60 max-w-md mb-8 leading-relaxed">
        {finalDesc}
      </p>
      
      {finalCta && (
        <a href={cta_link} className="btn btn-primary gap-2">
          <Plus size={18} />
          {finalCta}
        </a>
      )}

      {type === 'dashboard' && (
        <div className="mt-8 text-xs text-base-content/40 font-mono">
           System Status: WAITING_FOR_INPUT
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;