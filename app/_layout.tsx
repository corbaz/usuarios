import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Platform } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  console.log('Current Platform:', Platform.OS);
  console.log('Is iOS?:', Platform.OS === 'ios');

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!loaded) return;

    async function prepare() {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        await SplashScreen.hideAsync();

        const currentSegment = segments[0] as string;
        
        if (!userToken) {
          router.replace('/login');
        } else if (currentSegment === '(auth)') {
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
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.gradient} />
          <View style={styles.content}>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <Slot />
          </View>
        </View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: Platform.select({
    web: {
      flex: 1,
      height: '100vh'
    },
    default: {
      flex: 1
    }
  }) as any,
  container: {
    flex: 1
  },
  gradient: Platform.OS === 'ios' 
    ? {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'yellow'
      }
    : Platform.OS === 'android'
    ? {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'red'
      }
    : {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'pink'
      },
  content: {
    flex: 1,
    position: 'relative',
    zIndex: 1
  }
});
