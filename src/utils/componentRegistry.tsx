import React, { LazyExoticComponent, ComponentType } from 'react';

// Define the type for the registry map
type ComponentMap = Record<string, LazyExoticComponent<ComponentType<any>>>;

// Lazy load all feature components
const Hero = React.lazy(() => import('../components/Modules/Hero'));
const UniversalNavbar = React.lazy(() => import('../components/Modules/UniversalNavbar'));
const UniversalFooter = React.lazy(() => import('../components/Modules/UniversalFooter'));
const SidebarLayout = React.lazy(() => import('../components/Modules/SidebarLayout'));
const FeatureGrid = React.lazy(() => import('../components/Modules/FeatureGrid'));
const BentoGrid = React.lazy(() => import('../components/Modules/BentoGrid'));
const PricingTable = React.lazy(() => import('../components/Modules/PricingTable'));
const ContentBlock = React.lazy(() => import('../components/Modules/ContentBlock'));
const DynamicForm = React.lazy(() => import('../components/Modules/DynamicForm'));
const StripeCheckoutButton = React.lazy(() => import('../components/Modules/StripeCheckoutButton'));
const NewsletterSignup = React.lazy(() => import('../components/Modules/NewsletterSignup'));
const AuthForm = React.lazy(() => import('../components/Modules/AuthForm'));
const AuthGate = React.lazy(() => import('../components/Modules/AuthGate'));
const DataTable = React.lazy(() => import('../components/Modules/DataTable'));
const SimpleChart = React.lazy(() => import('../components/Modules/SimpleChart'));
const SEOMeta = React.lazy(() => import('../components/Modules/SEOMeta'));

// NEW HIGH CAPACITY COMPONENTS
const ProfileDashboard = React.lazy(() => import('../components/Modules/ProfileDashboard'));
const SettingsPanel = React.lazy(() => import('../components/Modules/SettingsPanel'));
const EmptyState = React.lazy(() => import('../components/Modules/EmptyState'));
const GhostTable = React.lazy(() => import('../components/Modules/GhostTable'));

export const componentRegistry: ComponentMap = {
  // Shell
  "UniversalNavbar": UniversalNavbar,
  "UniversalFooter": UniversalFooter,
  "SidebarLayout": SidebarLayout,
  
  // Showcase
  "Hero": Hero,
  "FeatureGrid": FeatureGrid,
  "BentoGrid": BentoGrid,
  "PricingTable": PricingTable,
  "ContentBlock": ContentBlock,
  "EmptyState": EmptyState,
  
  // Action
  "DynamicForm": DynamicForm,
  "StripeCheckoutButton": StripeCheckoutButton,
  "NewsletterSignup": NewsletterSignup,
  
  // Auth & Admin
  "AuthForm": AuthForm,
  "AuthGate": AuthGate,
  "ProfileDashboard": ProfileDashboard,
  "SettingsPanel": SettingsPanel,
  
  // Data
  "DataTable": DataTable,
  "SimpleChart": SimpleChart,
  "GhostTable": GhostTable,
  
  // Invisible
  "SEOMeta": SEOMeta,
  
  // Primitives / Layout Helpers
  "Container": React.lazy(() => Promise.resolve({ 
    default: ({ children, className }: any) => <div className={className}>{children}</div> 
  })),
  "Section": React.lazy(() => Promise.resolve({ 
    default: ({ children, className }: any) => <section className={`py-12 ${className || ''}`}>{children}</section> 
  })),
  "Typography": React.lazy(() => Promise.resolve({
    default: ({ text, variant = 'body', className = '' }: any) => {
      const Tag = variant === 'h1' ? 'h1' : variant === 'h2' ? 'h2' : variant === 'h3' ? 'h3' : 'p';
      const baseStyles = {
        h1: 'text-4xl font-bold mb-4',
        h2: 'text-3xl font-bold mb-3',
        h3: 'text-xl font-bold mb-2 uppercase tracking-wide opacity-70',
        body: 'text-base opacity-80'
      };
      return <Tag className={`${baseStyles[variant as keyof typeof baseStyles]} ${className}`}>{text}</Tag>;
    }
  })),
};

export const getComponent = (type: string) => {
  return componentRegistry[type];
};