import { View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 20 }}>Login</Text>
      <TextInput
        placeholder="Username"
        style={{ borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 20 }}
        value={username}
        onChangeText={setUsername}
      />
      <Pressable
        style={{ backgroundColor: 'blue', padding: 15, borderRadius: 8 }}
        onPress={() => router.replace('/home')}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Login</Text>
      </Pressable>
    </View>
  );
}

