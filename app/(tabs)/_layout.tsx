import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { getItem, removeItem } from '@/utils/storage';
import { subscribeStorageChange } from '@/utils/storageListener';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const segments = useSegments();
  const router = useRouter();

  const checkAuth = async () => {
    const token = await getItem('token');
    setIsLoggedIn(!!token);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();

    // Subscribe ke event perubahan storage
    const unsubscribe = subscribeStorageChange(() => {
      checkAuth();
    });

    return () => unsubscribe();
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
    <Stack screenOptions={{ headerShown: false }} />
  );
}
