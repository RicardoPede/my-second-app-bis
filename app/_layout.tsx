import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect } from 'react';
import 'react-native-reanimated';
import React, { createContext, ReactNode, useState } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Layout = () => {

  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      console.log('hideLoad');
      
    }
  }, [loaded]);

  useEffect(() => {
    if (!isAuthenticated) {
      SplashScreen.hideAsync();
      console.log('hideAuth');
      
    } else {
      SplashScreen.preventAutoHideAsync();
      console.log('prevent');
    }
  }, [isAuthenticated]);

  if (!loaded) {
    return null;
  }

  console.log('colorScheme', colorScheme);
  console.log('isAuthenticated', isAuthenticated);
  
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="auth"/>
            <Stack.Screen name="+not-found" />
          </>
        ) : (
          <Stack.Screen name="login" />
        )}
      </Stack>
    </ThemeProvider>
  );
}

export default Layout;

// // Path: app/_layout.tsx
// // Compare this snippet from app/context/AuthContext.tsx:

type AuthContextType = {
  isAuthenticated: boolean;
  toggleAuth: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  toggleAuth: () => { },
});

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, toggleAuth }}>{children}
    </AuthContext.Provider>
  );
}

export { AuthContext };