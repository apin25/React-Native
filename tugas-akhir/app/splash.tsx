import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreenPage() {
  const router = useRouter();

  useEffect(() => {
    const prepare = async () => {
      try {
        // Check for authentication token
        const token = await AsyncStorage.getItem('token');
        
        // Small delay for better UX
        setTimeout(() => {
          if (token) {
            router.replace('/jobs/ListJob');
          } else {
            router.replace('/auth/Login');
          }
        }, 5000);
        
      } catch (error) {
        console.error('Error during splash screen:', error);
        router.replace('/auth/Login');
      }
    };

    prepare();
  }, [router]);

  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <Text className="ml-6 text-white font-extrabold text-3xl">KerjApin™️</Text>
    </View>
  );
}