import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';

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

export default function JobDetailScreen() {
  const  router  =useRouter()
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const job = jobs.find((j) => j.id === id);

  useEffect(() => {
    if (job) {
      navigation.setOptions({
        title: job.role, 
      });
    }
  }, [job]);

  if (!job) {
    return (
      <View style={{ flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Job not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{ uri: job.logo }} style={{ width: 100, height: 100, marginBottom: 20 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{job.role}</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>{job.company}</Text>
      <Text>{job.location}</Text>
      <Text style={{ fontSize: 20, color: 'green', marginTop: 10 }}>{job.salary}</Text>
    </View>
  );
}

