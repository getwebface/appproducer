import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import DynamicRenderer from './DynamicRenderer';
import { SDUIComponent } from '../../types';
import EmptyState from '../Modules/EmptyState';

interface RouteConfig {
  path: string;
  exact?: boolean;
  children: SDUIComponent[];
}

interface PageRouterProps {
  routes: RouteConfig[];
}

const PageRouter: React.FC<PageRouterProps> = ({ routes = [] }) => {
  const location = useLocation();

  // Find the first matching route
  // We look for exact matches first, then loose matches if 'exact' is false
  const activeRoute = routes.find((route) => {
    const isMatch = matchPath(
      { path: route.path, end: route.exact !== false }, // Default to exact matching unless specified
      location.pathname
    );
    return isMatch !== null;
  });

  if (!activeRoute) {
    return (
      <div className="p-8">
        <EmptyState 
            type="generic" 
            title="Page Not Found" 
            description={`The path ${location.pathname} does not exist in the current app configuration.`}
            cta_text="Return Home"
            cta_link="/"
        />
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
      {activeRoute.children.map((childConfig) => (
        <DynamicRenderer key={childConfig.id} config={childConfig} />
      ))}
    </div>
  );
};

export default PageRouter;