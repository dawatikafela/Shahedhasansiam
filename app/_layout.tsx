import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { useFonts } from 'expo-font';
import { NotoSansBengali_400Regular, NotoSansBengali_500Medium, NotoSansBengali_600SemiBold, NotoSansBengali_700Bold } from '@expo-google-fonts/noto-sans-bengali';
import { SplashScreen } from 'expo-router';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'NotoSansBengali-Regular': NotoSansBengali_400Regular,
    'NotoSansBengali-Medium': NotoSansBengali_500Medium,
    'NotoSansBengali-SemiBold': NotoSansBengali_600SemiBold,
    'NotoSansBengali-Bold': NotoSansBengali_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null until fonts are loaded
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(_auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
          <Stack.Screen name="member-details" options={{ headerShown: true, presentation: 'card' }} />
          <Stack.Screen name="chat-screen" options={{ headerShown: true, presentation: 'card' }} />
          <Stack.Screen name="yanat" options={{ headerShown: true, presentation: 'card' }} />
          <Stack.Screen name="payment-confirmation" options={{ headerShown: true, presentation: 'card' }} />
        </Stack>
        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  );
}