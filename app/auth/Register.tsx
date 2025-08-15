import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { ButtonPrimary } from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import Toast from 'react-native-toast-message';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !password) {
      Toast.show({
        type: 'error',
        text1: 'Username and password must be filled',
        text2: 'Something wrong when register',
        position: 'bottom',
        props: {}, 
        visibilityTime: 4000,
        autoHide: true,
        bottomOffset: 100,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
        style: {
          alignSelf: 'flex-end',
          marginRight: 20,
        },
      });
      return;
    }

    const success = await register({ username, password });

    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Register Success',
        text2: 'Please login first',
        position: 'bottom',
        props: {}, 
        visibilityTime: 4000,
        autoHide: true,
        bottomOffset: 100,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
        style: {
          alignSelf: 'flex-end',
          marginRight: 20,
        },
      });
      router.replace('/auth/Login');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Register failed',
        text2: 'Something wrong when register',
        position: 'bottom',
        props: {}, 
        visibilityTime: 4000,
        autoHide: true,
        bottomOffset: 100,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
        style: {
          alignSelf: 'flex-end',
          marginRight: 20,
        },
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 justify-center">
            <View className="items-center mb-10">
              <Text className="font-extrabold text-3xl text-primary">KerjAPIN™️</Text>
            </View>

            <View className="mb-10">
              <Text className="font-bold text-2xl text-center mb-2">Create an Account</Text>
              <Text className="text-center text-neutral-500 font-semibold">
                Please insert your username and password for register
              </Text>
            </View>

            <View className="gap-4 mb-6">
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
            <View className="flex-row justify-center items-center mb-8">
              <Text className="font-medium text-neutral-500">Already have an account? </Text>
              <Pressable onPress={() => router.replace('/auth/Login')}>
                <Text className="font-bold text-primary">Sign In</Text>
              </Pressable>
            </View>
            <ButtonPrimary text="Sign Up" myWidth={360} onPress={handleRegister} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
