import Card from "@/components/Card";
import React, { useEffect, useMemo } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Input from '@/components/Input';
import { Filter, Search } from 'lucide-react-native';
import BottomNavbar from "@/components/BottomNavbar";
import { useAuth } from "@/hooks/useAuth";
import { useJobs } from "@/hooks/useJobs";

const colors = [
  'bg-pink-300',
  'bg-cyan-300',
  'bg-yellow-300',
  'bg-rose-300',
  'bg-sky-300',
  'bg-amber-300',
  'bg-emerald-300',
];
export default function ListJob() {
  const { me, user } = useAuth();
  const { jobs, fetchJobs, loading } = useJobs();
  const randomBg = useMemo(() => {
      const i = Math.floor(Math.random() * colors.length);
      return colors[i];
  }, []);
  useEffect(() => {
    me();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, []);
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#7E62F3" />
        <Text className="mt-2 text-gray-500">Loading List Job...</Text>
      </View>
    );
  }
  return (
     <>
      <LinearGradient
        colors={['#A38EFF', '#7E62F3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 24 }} 
        className="w-full justify-center h-64 shadow-md shadow-primary"
      >
        <View className="flex flex-row justify-between items-end mt-4">
          <Text className="font-bold mb-2 text-2xl text-white ml-5">Welcome, {user?.username}</Text>
            <View className={`w-10 h-10 rounded-full ${randomBg} justify-center items-center mr-5 mt-5`}>
              <Text className="text-white font-bold text-lg">
              {user?.username.charAt(0).toUpperCase()}
              </Text>
            </View>
        </View>
        <Text className="mt-1 ml-5 font-semibold text-lg text-white mr-5" numberOfLines={2}>Find a job you've always dreamed of in here</Text>
        <View className="flex flex-row items-center px-6 space-x-3 mt-1">
          <View className="flex-1">
            <Input
                text=""
                placeholder="Search"
                iconRight={<Search size={20} color="#7E62F3" />}

            /> 
          </View>
          <View className="px-4 py-4 ml-2 mt-5 bg-secondary rounded-lg mb-2">
            <View className="text-white font-bold"><Filter size={20} color="white" /></View>
          </View>
        </View>
      </LinearGradient>
      <View className="items-center mt-4 px-4 flex-1">
        <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            type_of_workplace={item.type_of_workplace}
            job_location={item.job_location}
            job_position={item.job_position}
            company={item.company}
            employment_type={item.employment_type}
            description={item.description}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
      </View>
    <View className="absolute bottom-0 right-0 left-0">
        <BottomNavbar />
      </View>
</>
  );
}
