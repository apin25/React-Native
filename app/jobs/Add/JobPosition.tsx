import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Search, X } from 'lucide-react-native';
import Input from '@/components/Input';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function JobPosition() {
  const navigation = useNavigation();
  const router = useRouter();
    const params = useLocalSearchParams()

  const jobs = [
    'Assistant',
    'Associate',
    'Administrative Assistant',
    'Account Manager',
    'Assistant Manager',
    'Commission Sales Associate',
    'Sales Attendant',
    'Accountant',
    'Sales Advocate',
    'Analyst',
  ];

  const [search, setSearch] = useState('');

  const filteredJobs = jobs.filter((job) =>
    job.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (job: string) => {

    router.push({
  pathname: '/jobs/Add/AddJob',
  params: {
    ...params, 
    selectedJob: job,
  },
});

  };

  return (
    <View className="flex-1 bg-white px-4 pt-14 mt-5">
      <View className="flex-row items-center mb-6">
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#1F2937" />
        </Pressable>
        <Text className="text-lg font-semibold ml-4">Job Position</Text>
      </View>

      <View className="mb-4">
         <Input
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
            iconRight={<Search size={20} color="#7E62F3" />}

        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <X size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="py-3 px-2"
            onPress={() => handleSelect(item)}
          >
            <Text className="text-base text-gray-700">{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
