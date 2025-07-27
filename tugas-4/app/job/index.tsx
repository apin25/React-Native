import { Pressable, View, StyleSheet, Text, FlatList } from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const jobs = [
  {
    id: '1',
    company: 'Google Inc',
    role: 'UI/UX Designer',
    location: 'California, USA',
    logo: 'https://cdn-icons-png.flaticon.com/512/281/281764.png',
    salary: '$15K/mo',
  },
  {
    id: '2',
    company: 'Dribbble Inc',
    role: 'Lead Designer',
    location: 'California, USA',
    logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111370.png',
    salary: '$20K/mo',
  },
  {
    id: '3',
    company: 'Twitter Inc',
    role: 'UX Researcher',
    location: 'California, USA',
    logo: 'https://cdn-icons-png.flaticon.com/512/733/733579.png',
    salary: '$12K/mo',
  },
];

export default function JobScreen() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
        <View style={{padding:16}}>
          <FlatList
          data={jobs}
          renderItem={({ item }) => (
          <Pressable onPress={() => router.push({ pathname: '/job/[id]', params: { id: item.id } })}>
              <Card
                role={item.role}
                company={item.company}
                location={item.location}
                logo={item.logo}
                isSelected={selectedJobId === item.id}
              />
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
        
    </View>
    <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
      <Pressable
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={({ pressed }) => [
          {paddingHorizontal:24, paddingVertical:12, borderRadius:8},
          { backgroundColor: isPressed ? 'green' : '#ccc' },
        ]}
      >
        <Text style={{color:"#000", fontWeight:"bold"}}>Tekan Saya</Text>
      </Pressable>
    </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
