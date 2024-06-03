import React, { createContext, ReactNode, useState } from 'react';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

type ThemeContextProviderProps = {
  children: ReactNode;
};

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export { ThemeContext };