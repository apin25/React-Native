// app/splash.tsx
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      setTimeout(() => {
        if (token) {
          router.replace('/jobs/ListJob');       
        } else {
          router.replace('/auth/Login');   
        }
      }, 2000); 
    };

    checkAuth();
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <Text className="ml-6 text-white font-extrabold text-3xl">KerjApin™️</Text>
    </View>
  );
}
