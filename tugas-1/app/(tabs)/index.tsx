import { Text, View, StyleSheet, Image, FlatList } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { green } from 'react-native-reanimated/lib/typescript/Colors';
import Card from '@/components/Card';

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

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
        <View style={{padding:16}}>
      <FlatList
        data={jobs}
        renderItem={({ item }) => (
          <Card
            role={item.role}
            company={item.company}
            location={item.location}
            logo={item.logo}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
