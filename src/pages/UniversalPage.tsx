import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import DynamicRenderer from '../components/Core/DynamicRenderer';
import ThemeWrapper from '../components/Core/ThemeWrapper';
import { AppRegistryRow, AppConfig } from '../../types';

// The "Ghost Protocol" Default Configuration
const DEFAULT_GHOST_CONFIG: AppConfig = {
  theme_config: {
    preset: "luxury",
    font: "font-sans",
    radius: "rounded-xl",
    overrides: {
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
               { label: "Settings", path: "/settings", icon: "settings" }
            ]
          },
          {
            title: "Lab",
            items: [
               { label: "Data Stream", path: "/data", icon: "layers" }
            ]
          }
        ]
      },
      children: [
        {
          id: "main_router",
          type: "PageRouter",
          props: {
            routes: [
              // 1. DASHBOARD ROUTE (/)
              {
                path: "/",
                exact: true,
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
                  }
                ]
              },
              // 2. SETTINGS ROUTE (/settings)
              {
                path: "/settings",
                children: [
                   {
                     id: "settings_panel",
                     type: "SettingsPanel",
                     props: { initial_tab: "general" }
                   }
                ]
              },
              // 3. DATA LAB ROUTE (/data) - The Loop
              {
                path: "/data",
                children: [
                  { id: "data_header", type: "Typography", props: { text: "Data Lab", variant: "h1" } },
                  { id: "data_sub", type: "Typography", props: { text: "Test the input/output loop. Submissions on the left appear on the right.", variant: "body", className: "mb-8" } },
                  {
                    id: "data_cols",
                    type: "Container",
                    props: { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start" },
                    children: [
                      // LEFT: The Input
                      {
                        id: "input_col",
                        type: "Container",
                        props: { className: "lg:col-span-1" },
                        children: [
                           {
                             id: "demo_form",
                             type: "DynamicForm",
                             props: {
                               form_id: "demo_loop",
                               title: "Add New Node",
                               submit_label: "Inject Data",
                               fields: [
                                 { name: "node_name", label: "Node Name", type: "text", required: true, placeholder: "e.g. Alpha Centauri" },
                                 { name: "status", label: "Status", type: "text", required: true, placeholder: "e.g. Online" },
                                 { name: "latency", label: "Latency (ms)", type: "number", required: true }
                               ]
                             }
                           }
                        ]
                      },
                      // RIGHT: The Output
                      {
                        id: "output_col",
                        type: "Container",
                        props: { className: "lg:col-span-2" },
                        children: [
                          {
                            id: "demo_table",
                            type: "DataTable",
                            props: {
                              title: "Live Data Feed",
                              query_key: "demo_loop", // Matches form_id
                              columns: ["node_name", "status", "latency", "submitted_at"]
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};

const UniversalPage: React.FC = () => {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
          .maybeSingle(); 

        // 2. Fallback Logic
        if (dbError || !data) {
          console.warn("Universal App: No specific config found. Loading Ghost Protocol.");
          setConfig(DEFAULT_GHOST_CONFIG);
          setLoading(false);
          return;
        }

        const appData = data as AppRegistryRow;
        if (!appData.config) throw new Error('Invalid configuration data structure.');
        setConfig(appData.config);

      } catch (err: any) {
        console.error("Config Load Error:", err);
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