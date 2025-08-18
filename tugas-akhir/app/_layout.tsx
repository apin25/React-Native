import { Stack } from 'expo-router';
import '../global.css';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const hideSplash = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn('Error hiding splash screen:', error);
      }
    };
  
    setTimeout(hideSplash, 100);
  }, []);

  return (
    <>
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName="splash"
      >
        <Stack.Screen name="splash" />
        <Stack.Screen name="auth/Login" />
        <Stack.Screen name="jobs/ListJob" />
      </Stack>
      <Toast />
    </>
  );
}