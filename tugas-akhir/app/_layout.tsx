import { Stack } from 'expo-router';
import '../global.css';
import React from 'react';
import Toast from 'react-native-toast-message'; 

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName="splash"
      />
      <Toast />
    </>
  );
}
