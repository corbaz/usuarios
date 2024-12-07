import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!loaded) return;

    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        const userToken = await AsyncStorage.getItem('userToken');
        
        // Ocultar el splash screen después de cargar los recursos
        await SplashScreen.hideAsync();

        // Navegar según el estado de autenticación
        // Use type assertion or broader type checking
        const currentSegment = segments[0] as string;
        
        if (!userToken) {
          router.replace('/login');
        } else if (currentSegment === '(auth)') {
          // Handle auth-related segments specifically
          router.replace('/home');
        } else {
          router.replace('/home');
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, [loaded, segments]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
