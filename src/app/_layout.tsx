<<<<<<< HEAD
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
=======
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="member1" />
        <Stack.Screen name="member2" />
        <Stack.Screen name="member3" />
        <Stack.Screen name="member4" />
        <Stack.Screen name="member5" />
        <Stack.Screen name="member6" />
      </Stack>
    </ThemeProvider>
>>>>>>> 7c9249d161628b965147dd0380b39c2095dce8d9
  );
}
