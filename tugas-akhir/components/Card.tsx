import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View, Text } from "react-native";
import { JobResponse } from "@/interface/job";

export default function Card({
  id,
  title,
  job_position,
  company,
  employment_type,
  description,
  close_at,
}: JobResponse) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push('/')}
      className="bg-white rounded-2xl p-4 mb-3 shadow-md"
    >
      <View className="flex-row items-center mb-2">
        <View className="w-10 h-10 rounded-full bg-gray-300 justify-center items-center mr-3">
            <Text className="text-white font-bold text-lg">
                {company?.charAt(0).toUpperCase()}
            </Text>
        </View>
        <View>
          <Text className="text-base font-semibold text-black">{job_position}</Text>
          <Text className="text-sm text-gray-600">{company}</Text>
        </View>
      </View>

      <Text className="text-sm text-gray-500 mb-1">{employment_type}</Text>
      <Text className="text-sm text-gray-700 mb-2" numberOfLines={2}>{description}</Text>
      <Text className="text-xs text-gray-400">Tutup pada: {close_at.toLocaleDateString()}</Text>
    </Pressable>
  );
}