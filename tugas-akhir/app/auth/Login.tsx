import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

import { ButtonPrimary } from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Toast.show({
        type: 'error',
        text1: 'Username and password must be filled',
        text2: 'Something wrong when login',
      });
      return;
    }

    const success = await login({ username, password });
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Login Success',
        text2: 'Welcome Back',
      });
      router.replace('/jobs/ListJob');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: 'Username or password incorrect',
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center items-center px-6 py-8">
            <Text className="font-extrabold text-3xl mb-12 text-primary">
              KerjAPIN™️
            </Text>

            <View className="justify-center items-center mb-10">
              <Text className="font-bold text-2xl mb-1">Welcome!!</Text>
              <Text className="text-center text-neutral-500 font-semibold">
                Please insert your username and password for logging in
              </Text>
            </View>

            <View className="w-full gap-y-4 mb-6">
              <Input
                text="Username"
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
              />
              <Input
                text="Password"
                placeholder="Enter your password"
                secureTextEntry={hidePassword}
                onPress={() => setHidePassword(!hidePassword)}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View className="flex-row justify-center items-center mb-9">
                <Text className="font-medium text-neutral-500">
                    Don't have an account?{' '}
                </Text>
                <Pressable onPress={() => router.replace('/auth/Register')}>
                    <Text className="font-bold text-primary">Sign Up</Text>
                </Pressable>
            </View>


            <ButtonPrimary text="Sign In" myWidth={360} onPress={handleLogin} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
