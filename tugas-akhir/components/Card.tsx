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
  close_at,
}: JobResponse) {
  const router = useRouter();
  const randomBg = useMemo(() => {
    const i = Math.floor(Math.random() * colors.length);
    return colors[i];
  }, []);
  return (
   <Pressable
  onPress={() => router.push(`/jobs/${id}`)}
  className="bg-white rounded-2xl px-4 py-4 mb-4 shadow-md self-center w-[92%]"
>
  <View className="flex-row items-center mb-2">
    <View className={`w-9 h-9 rounded-full ${randomBg} justify-center items-center mr-3`}>
      <Text className="text-white font-bold text-lg">
        {company?.charAt(0).toUpperCase()}
      </Text>
    </View>
    <View className="flex-1">
      <Text className="text-base font-semibold text-black">{job_position}</Text>
      <Text className="text-sm text-gray-600">{company} - {job_location}</Text>
    </View>
  </View>

  <Text className="text-sm text-gray-700 mb-2" numberOfLines={1}>
    {description}
  </Text>

  <View className="flex flex-row flex-wrap gap-2 justify-end">
    <View className="px-3 py-1 bg-orange-50 rounded-md">
      <Text className="text-sm text-orange-500">{type_of_workplace}</Text>
    </View>
    <View className="px-3 py-1 bg-orange-50 rounded-md">
      <Text className="text-sm text-orange-500">{employment_type}</Text>
    </View>
  </View>
    <Text className="text-xs text-gray-400">
    Close At: {close_at.toLocaleDateString()}
  </Text>
</Pressable>
  );
}