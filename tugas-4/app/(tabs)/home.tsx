import { Pressable, View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 16, alignItems:'center'}}>
          <Text style={{ fontSize: 24 }}>🏠</Text>
          <Text style={{marginTop:4}}>Ini Home Page</Text>
            <Pressable
              style={{ backgroundColor: 'blue', padding: 12, borderRadius: 8, marginTop:12 }}
              onPress={() => router.push('/job')}
            >
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>List Job</Text>
            </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
