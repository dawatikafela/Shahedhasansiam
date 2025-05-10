import React, { createContext, useState, useEffect } from 'react';
import { Appearance, ColorSchemeName, Platform } from 'react-native';

// Define theme colors
const lightTheme = {
  primary: '#0B8457',
  primaryLight: '#0B845720',
  secondary: '#1A5D8D',
  secondaryLight: '#1A5D8D20',
  accent: '#D4AF37',
  accentLight: '#D4AF3720',
  background: '#F7F7F9',
  card: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  border: '#E1E1E8',
  success: '#28A745',
  successLight: '#28A74520',
  warning: '#FFC107',
  warningLight: '#FFC10720',
  error: '#DC3545',
  errorLight: '#DC354520',
  white: '#FFFFFF',
  black: '#000000',
};

const darkTheme = {
  primary: '#0FA772',
  primaryLight: '#0FA77220',
  secondary: '#2E7AB0',
  secondaryLight: '#2E7AB020',
  accent: '#E7C347',
  accentLight: '#E7C34720',
  background: '#121214',
  card: '#1E1E24',
  text: '#F7F7F9',
  textLight: '#A7A7A7',
  border: '#323236',
  success: '#34C759',
  successLight: '#34C75920',
  warning: '#FFCC00',
  warningLight: '#FFCC0020',
  error: '#FF3B30',
  errorLight: '#FF3B3020',
  white: '#FFFFFF',
  black: '#000000',
};

export type ThemeColors = typeof lightTheme;

export interface ThemeContextType {
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(Appearance.getColorScheme());
  const isDark = colorScheme === 'dark';
  const colors = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });

    return () => {
      if (Platform.OS !== 'web') {
        subscription.remove();
      }
    };
  }, []);

  const toggleTheme = () => {
    setColorScheme(prevScheme => (prevScheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};