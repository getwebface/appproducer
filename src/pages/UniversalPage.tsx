import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import DynamicRenderer from '../components/Core/DynamicRenderer';
import ThemeWrapper from '../components/Core/ThemeWrapper';
import { AppRegistryRow, AppConfig } from '../../types';

// The "Ghost Protocol" Default Configuration
// This is what renders if no specific domain config is found in Supabase.
const DEFAULT_GHOST_CONFIG: AppConfig = {
  theme_config: {
    preset: "luxury",
    font: "font-sans",
    radius: "rounded-xl",
    overrides: {
       // Deep Space styling
       primary: "#793ef9",
       secondary: "#2a303c",
       base100: "#0f1729"
    }
  },
  layout: [
    {
      id: "root_sidebar",
      type: "SidebarLayout",
      props: {
        workspace_name: "Ghost Protocol",
        menu_groups: [
          {
            title: "Command",
            items: [
               { label: "Dashboard", path: "/", icon: "dashboard" },
               { label: "Intelligence", path: "/intel", icon: "chart" }
            ]
          },
          {
            title: "Operations",
            items: [
               { label: "Projects", path: "/projects", icon: "briefcase" },
               { label: "Data Stream", path: "/data", icon: "layers" }
            ]
          },
          {
            title: "System",
            items: [
               { label: "Settings", path: "/settings", icon: "settings" }
            ]
          }
        ]
      },
      children: [
        {
          id: "main_container",
          type: "Container",
          props: { className: "space-y-8 animate-in fade-in duration-700" },
          children: [
            {
               id: "profile_header",
               type: "ProfileDashboard",
               props: {
                 banner_url: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop",
                 show_badges: true
               }
            },
            {
               id: "bento_stats",
               type: "BentoGrid",
               props: {
                 title: "System Capacity",
                 items: [
                   { title: "Active Nodes", content: "Operational", type: "stat", statValue: "42", colSpan: 1 },
                   { title: "Network Load", content: "Optimal", type: "stat", statValue: "12%", colSpan: 1 },
                   { title: "Security Level", content: "Maximum", type: "image", imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", colSpan: 2 }
                 ]
               }
            },
            {
              id: "data_section",
              type: "Section",
              props: { className: "grid grid-cols-1 lg:grid-cols-2 gap-8" },
              children: [
                {
                   id: "ghost_table_container",
                   type: "Container",
                   props: { className: "space-y-4" },
                   children: [
                      { id: "table_header", type: "Typography", props: { text: "Incoming Data Stream", variant: "h3" } },
                      { id: "actual_ghost", type: "GhostTable", props: {} }
                   ]
                },
                {
                   id: "settings_preview",
                   type: "SettingsPanel",
                   props: { initial_tab: "api" }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const UniversalPage: React.FC = () => {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppConfig = async () => {
      try {
        setLoading(true);
        const hostname = window.location.hostname;
        console.log(`Detecting app for domain: ${hostname}`);

        // 1. Attempt Query
        const { data, error: dbError } = await supabase
          .from('app_registry')
          .select('*')
          .eq('domain', hostname)
          .maybeSingle(); // Use maybeSingle to avoid 406 error on empty result

        // 2. Fallback Logic: If no data or DB error (likely local or new setup), use Ghost Config
        if (dbError || !data) {
          console.warn("Universal App: No specific config found for this domain. Loading Ghost Protocol Default.");
          // In a real prod environment, you might want to show a 404 here, 
          // but for the "Universal Factory" demo, we want to show off the capabilities immediately.
          setConfig(DEFAULT_GHOST_CONFIG);
          setLoading(false);
          return;
        }

        const appData = data as AppRegistryRow;

        if (!appData.config) {
          throw new Error('Invalid configuration data structure.');
        }

        setConfig(appData.config);
      } catch (err: any) {
        console.error("Config Load Error:", err);
        // Even on crash, try to render the ghost app so the UI isn't dead
        setConfig(DEFAULT_GHOST_CONFIG);
      } finally {
        setLoading(false);
      }
    };

    fetchAppConfig();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );
  }

  // We should rarely hit this now due to the fallback
  if (!config) return null;

  return (
    <ThemeWrapper config={config}>
      {config.layout.map((componentConfig) => (
        <DynamicRenderer key={componentConfig.id} config={componentConfig} />
      ))}
    </ThemeWrapper>
  );
};

export default UniversalPage;