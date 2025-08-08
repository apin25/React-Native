import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { getItem } from '@/utils/storage';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const segments = useSegments(); 
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getItem('token');
      setIsLoggedIn(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const currentRootSegment = segments[0];

      const inAuth = currentRootSegment === 'auth';

      if (!isLoggedIn && !inAuth) {
        router.replace('/auth/Login');
      } else if (isLoggedIn && inAuth) {
        router.replace('/jobs/ListJob');
      }
    }
  }, [segments, isLoading, isLoggedIn]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
