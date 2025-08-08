import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, View, Text } from "react-native";
import { JobResponse } from "@/interface/job";

const colors = [
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-violet-500',
  'bg-purple-500'
];
export default function Card({
  id,
  type_of_workplace,
  job_location,
  job_position,
  company,
  employment_type,
  description,
}: JobResponse) {
  const router = useRouter();
  const randomBg = useMemo(() => {
    const i = Math.floor(Math.random() * colors.length);
    return colors[i];
  }, []);
  return (
   <Pressable
  onPress={() => router.push(`/jobs/${id}`)}
  className="bg-white rounded-3xl px-8 py-6 mb-4 w-full shadow-md self-center h-auto"
>
  <View className="flex-row items-center mb-4">
    <View className={`w-12 h-12 rounded-full ${randomBg} justify-center items-center mr-4`}>
      <Text className="text-white font-bold text-xl">
        {company?.charAt(0).toUpperCase()}
      </Text>
    </View>
    <View className="flex-1">
      <Text className="font-bold text-2xl text-black">{job_position}</Text>
      <Text className="font-semibold text-lg text-gray-600">{company} - {job_location}</Text>
    </View>
  </View>

  <Text className="text-md text-gray-700 mb-2" numberOfLines={2}>
    {description}
  </Text>

  <View className="flex flex-row flex-wrap gap-2 justify-end mt-2">
    <View className="px-5 py-2 bg-orange-50 rounded-md">
      <Text className="text-md text-secondary">{type_of_workplace}</Text>
    </View>
    <View className="px-5 py-2 bg-orange-50 rounded-md">
      <Text className="text-md text-secondary">{employment_type}</Text>
    </View>
  </View>
</Pressable>
  );
}