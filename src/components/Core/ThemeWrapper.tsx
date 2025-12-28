import React, { useEffect } from 'react';
import { AppConfig } from '../../types';

interface ThemeWrapperProps {
  config: AppConfig;
  children: React.ReactNode;
}

// Helper to convert Hex to HSL for DaisyUI variable overrides
const hexToHsl = (hex: string): string | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Return formatted for DaisyUI CSS variables (Hue Sat% Light%)
  // Note: DaisyUI 4 often uses oklch but falls back or supports HSL in some versions.
  // For standard CSS var overrides in this context, H S% L% is standard.
  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
};

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ config, children }) => {
  const { theme_config } = config;
  const preset = theme_config?.preset || 'light';
  const font = theme_config?.font || 'font-sans';
  const radius = theme_config?.radius || '';

  useEffect(() => {
    // 1. Apply the DaisyUI Theme Preset
    document.documentElement.setAttribute('data-theme', preset);
  }, [preset]);

  // 2. Compute CSS Variable Overrides
  const styleOverrides: React.CSSProperties = {};
  if (theme_config?.overrides) {
    if (theme_config.overrides.primary) {
      const hsl = hexToHsl(theme_config.overrides.primary);
      if (hsl) {
        (styleOverrides as any)['--p'] = hsl; // Primary
        (styleOverrides as any)['--pa'] = hsl; // Primary Active/Focus? DaisyUI uses complex calc usually but this is a rough patch
      }
    }
    if (theme_config.overrides.secondary) {
      const hsl = hexToHsl(theme_config.overrides.secondary);
      if (hsl) (styleOverrides as any)['--s'] = hsl;
    }
    if (theme_config.overrides.accent) {
      const hsl = hexToHsl(theme_config.overrides.accent);
      if (hsl) (styleOverrides as any)['--a'] = hsl;
    }
    if (theme_config.overrides.neutral) {
      const hsl = hexToHsl(theme_config.overrides.neutral);
      if (hsl) (styleOverrides as any)['--n'] = hsl;
    }
  }

  return (
    <div 
      className={`min-h-screen bg-base-100 text-base-content ${font} ${radius}`}
      style={styleOverrides}
    >
      {children}
    </div>
  );
};

export default ThemeWrapper;
