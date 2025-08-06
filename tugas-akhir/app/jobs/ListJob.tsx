import Card from "@/components/Card";
import React, { useMemo } from "react";
import { View, ScrollView, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Input from '@/components/Input';
import { Filter, Search } from 'lucide-react-native';
import BottomNavbar from "@/components/BottomNavbar";

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
     const randomBg = useMemo(() => {
          const i = Math.floor(Math.random() * colors.length);
          return colors[i];
     }, []);
  return (
     <>
    <ScrollView>
      <LinearGradient
        colors={['#A38EFF','#7E62F3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full h-52 rounded-b-3xl shadow-md shadow-primary"
      >
        <View className="flex flex-row justify-between items-end">
          <Text className="font-medium mb-2 text-xl text-white ml-5">Welcome, Ayam</Text>
               <View className={`w-10 h-10 rounded-full ${randomBg} justify-center items-center mr-5 mt-5`}>
                    <Text className="text-white font-bold text-lg">
                    A
                    </Text>
               </View>
        </View>
        <Text className="mt-1 ml-5 font-semibold text-lg text-white mr-5" numberOfLines={2}>Find a job you've always dreamed of in here</Text>
        <View className="flex flex-row items-center px-5 space-x-3 mt-1">
          <View className="flex-1">
               <Input
                    text=""
                    placeholder="Search"
                    iconRight={<Search size={20} color="#7E62F3" />}

               />
               
          </View>
          <View className="px-4 py-4 bg-secondary rounded-lg mb-2">
               <View className="text-white font-bold"><Filter size={20} color="white" /></View>
          </View>
          </View>

      </LinearGradient>
      <View className="items-center mt-6">
        <Card
          id="1"
          type_of_workplace="Full Time"
          job_location="Jakarta, Indonesia"
          job_position="Senior"
          company="PT KerjaKu Indo"
          employment_type="Full time"
          description="buat kamu yang mau melamar sebagai lalalallala maka lalalalalalalal"
          close_at={new Date('2022-01-22')}
        />
      </View>
    </ScrollView>
    <BottomNavbar/>
</>
  );
}
