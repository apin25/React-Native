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

export default function Location() {
  const navigation = useNavigation();
  const router = useRouter();
    const params = useLocalSearchParams()

  const locations = [
    'Jakarta',
    'Bogor',
    'Depok',
    'Tangerang',
    'Bekasi',
    'Semarang',
    'Purwokerto',
    'Yogyakarta',
    'Surabaya',
    'Malang',
  ];

  const [search, setSearch] = useState('');

  const filteredLocations = locations.filter((e) =>
    e.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (loc: string) => {

    router.push({
  pathname: `/jobs/Edit/${params.id}`,
  params: {
    ...params, 
    selectedLocation: loc,
  },
});

  };

  return (
    <View className="flex-1 bg-white px-4 pt-14">
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
        data={filteredLocations}
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
