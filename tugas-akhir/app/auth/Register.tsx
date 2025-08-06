import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
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
    });
    return;
  }

  const success = await register({ username, password });

  if (success) {
    Toast.show({
      type: 'success',
      text1: 'Register Success',
      text2: 'Please login first',
    });
    router.replace('/auth/LoginScreen');
  } else {
    Toast.show({
      type: 'error',
      text1: 'Register failed',
      text2: 'Something wrong when register',
    });
  }
};


  return (
    <>
    <View className="flex-1 justify-center items-center px-4 bg-neutral-50">
        <View className="justify-center items-center">
            <Text className='font-extrabold text-3xl mb-12 text-primary ml-8'>KerjAPIN™️</Text>
            <View className="justify-center items-center mb-10">
                <Text className="font-bold text-2xl mb-1">Create an Account</Text>
                <Text className="text-center text-neutral-500 font-semibold">
                    Please insert your username and password for register
                </Text>
            </View>
        </View>
        <View className="justify-center items-center bg-neutral-50 mb-20">
            <View className="flex-1 justify-center items-center px-6">
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
               <Text className='font-medium text-neutral-500 mb-12'>Have an acount? <Pressable onPress={() => router.replace('/auth/Login')}><Text className="font-bold text-primary">Sign In</Text></Pressable></Text> 
            </View>
            <ButtonPrimary text="Sign Up" onPress={handleRegister} />
        </View>
    </View>
    </>
  );
}