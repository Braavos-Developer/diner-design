import { useState, useEffect } from 'react';

export interface ThemeColors {
  primary: string;
  accent: string;
  secondary: string;
  success: string;
  warning: string;
  destructive: string;
  background: string;
  foreground: string;
  card: string;
  border: string;
}

const defaultColors: ThemeColors = {
  primary: '#B05E27',
  accent: '#FFD180', 
  secondary: '#E3D9CC',
  success: '#4E6B47',
  warning: '#FFD180',
  destructive: '#DC2626',
  background: '#F1F1F1',
  foreground: '#2A2A2A',
  card: '#FFFFFF',
  border: '#7A6240'
};

function hexToHsl(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse RGB values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

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

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function useThemeCustomization() {
  const [colors, setColors] = useState<ThemeColors>(() => {
    const saved = localStorage.getItem('theme-colors');
    return saved ? JSON.parse(saved) : defaultColors;
  });

  const updateColor = (colorKey: keyof ThemeColors, value: string) => {
    setColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
  };

  const resetToDefault = () => {
    setColors(defaultColors);
  };

  const applyTheme = () => {
    const root = document.documentElement;
    
    // Convert hex colors to HSL and apply to CSS variables
    root.style.setProperty('--primary', hexToHsl(colors.primary));
    root.style.setProperty('--accent', hexToHsl(colors.accent));
    root.style.setProperty('--secondary', hexToHsl(colors.secondary));
    root.style.setProperty('--success', hexToHsl(colors.success));
    root.style.setProperty('--warning', hexToHsl(colors.warning));
    root.style.setProperty('--destructive', hexToHsl(colors.destructive));
    root.style.setProperty('--background', hexToHsl(colors.background));
    root.style.setProperty('--foreground', hexToHsl(colors.foreground));
    root.style.setProperty('--card', hexToHsl(colors.card));
    root.style.setProperty('--border', hexToHsl(colors.border));
    
    // Update gradients
    root.style.setProperty('--gradient-brand', `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`);
    root.style.setProperty('--gradient-warm', `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`);
    root.style.setProperty('--gradient-subtle', `linear-gradient(180deg, ${colors.card}, ${colors.secondary})`);
  };

  useEffect(() => {
    localStorage.setItem('theme-colors', JSON.stringify(colors));
    applyTheme();
  }, [colors]);

  return {
    colors,
    updateColor,
    resetToDefault,
    applyTheme
  };
}