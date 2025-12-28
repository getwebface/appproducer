import React, { Suspense } from 'react';
import { getComponent } from '../../utils/componentRegistry';
import { SDUIComponent } from '../../types';
import { motion } from 'framer-motion';

interface DynamicRendererProps {
  config: SDUIComponent;
}

const DynamicRenderer: React.FC<DynamicRendererProps> = ({ config }) => {
  const { type, props, children, id } = config;

  // 1. Resolve the component from the registry
  const Component = getComponent(type);

  // 2. Handle unknown components gracefully
  if (!Component) {
    console.warn(`Component type "${type}" not found in registry.`);
    return (
      <div className="p-4 border-2 border-dashed border-red-300 bg-red-50 text-red-500 rounded text-sm">
        Unknown Component: <strong>{type}</strong> (ID: {id})
      </div>
    );
  }

  // 3. Recursive Rendering: If the component has children, render them inside
  const renderChildren = () => {
    if (!children || children.length === 0) return null;
    return children.map((childConfig) => (
      <DynamicRenderer key={childConfig.id} config={childConfig} />
    ));
  };

  // 4. Render with Motion for smooth entry
  return (
    <Suspense fallback={<div className="animate-pulse bg-base-300 h-32 w-full rounded mb-4" />}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Component {...props} id={id}>
          {renderChildren()}
        </Component>
      </motion.div>
    </Suspense>
  );
};

export default DynamicRenderer;