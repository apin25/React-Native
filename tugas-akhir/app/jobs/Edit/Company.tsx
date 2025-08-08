import React, { useMemo, useState } from 'react';
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

export default function Company() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams()
  const colors = [
  'bg-pink-300',
  'bg-cyan-300',
  'bg-yellow-300',
  'bg-rose-300',
  'bg-sky-300',
  'bg-amber-300',
  'bg-emerald-300',
];
  const companies = [
    'Google',
    'Tokopedia',
    'Grab',
    'Tiket',
    'Traveloka',
    'Suitmedia',
    'OpenWay',
    'CyberTrend',
    'Dieng Cyber',
    'ASTRA',
  ];

  const [search, setSearch] = useState('');

  const filteredCompanies = companies.filter((e) =>
    e.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (com: string) => {
  router.push({
  pathname: `/jobs/Edit/${params.id}`,
  params: {
    ...params, 
    selectedCompany: com,
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

      {/* Search Box */}
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
        data={filteredCompanies}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
        const bgColor = colors[index % colors.length]; 

        return (
            <TouchableOpacity
            className="py-3 px-2 flex-row items-center space-x-4"
            onPress={() => handleSelect(item)}
            >
            <View className={`w-9 h-9 rounded-full justify-center items-center ${bgColor}`}>
                <Text className="text-white font-semibold text-base">
                {item.charAt(0).toUpperCase()}
                </Text>
            </View>

            <Text className="text-base text-gray-700 ml-2">{item}</Text>
            </TouchableOpacity>
        );
        }}
      />
    </View>
  );
}
