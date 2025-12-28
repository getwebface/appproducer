export interface SDUIComponent {
  id: string;
  type: string; // Maps to keys in componentRegistry
  props: Record<string, any>;
  children?: SDUIComponent[]; // Recursive children
}

export interface ThemeConfig {
  preset: string; // e.g. 'cupcake', 'business', 'luxury'
  radius?: string; // e.g. 'rounded-lg'
  font?: string; // e.g. 'font-sans'
  overrides?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    neutral?: string;
    base100?: string;
  };
}

export interface AppConfig {
  theme_config?: ThemeConfig;
  layout: SDUIComponent[]; // Root level components
}

export interface AppRegistryRow {
  domain: string;
  internal_id: string;
  config: AppConfig;
}
