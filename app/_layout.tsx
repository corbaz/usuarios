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
import { LinearGradient } from 'expo-linear-gradient';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  console.log('Current Platform:', Platform.OS);
  
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
          {Platform.OS === 'web' ? (
            <View style={styles.gradient} />
          ) : Platform.OS === 'ios' ? (
            <LinearGradient
              style={StyleSheet.absoluteFill}
              colors={['green', 'blue', 'red']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          ) : (
            <LinearGradient
              style={StyleSheet.absoluteFill}
              colors={['cyan', 'yellow', 'white']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          )}
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
  gradient: Platform.select({
    web: {
      ...StyleSheet.absoluteFillObject,
      backgroundImage: 'linear-gradient(45deg, blue 0%, red 50%, yellow 100%)'
    },
    default: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'blue'
    }
  }) || {},
  content: {
    flex: 1,
    position: 'relative',
    zIndex: 1
  }
});
