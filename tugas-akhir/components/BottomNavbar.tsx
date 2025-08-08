import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Home, Bell, User, Plus, BriefcaseBusiness } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function BottomNavbar() {
  const router = useRouter();
  return (
    <View className="bg-white border-t border-gray-200 flex-row justify-between items-center px-8 py-5 relative">
      
      <TouchableOpacity className="items-center">
        <Home size={24} color="#7E62F3" />
        <Text className="text-xs text-primary">Home</Text>
      </TouchableOpacity>
    <TouchableOpacity className="items-center">
        <BriefcaseBusiness size={24} color="#7E62F3" />
        <Text className="text-xs text-gray-400">Applications</Text>
    </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.replace('/jobs/Add/AddJob')}
        activeOpacity={0.8}
        className="w-20 h-20 rounded-full -mt-16 shadow-lg shadow-primary-light overflow-hidden"
        >
        <LinearGradient
            colors={['#7E62F3', '#A38EFF']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="flex-1 justify-center items-center rounded-full"
        >
        <Plus size={40} color="white" />
        </LinearGradient>
        </TouchableOpacity>
    <TouchableOpacity className="items-center">
        <Bell size={24} color="#7E62F3" />
        <Text className="text-xs text-gray-400">Notifications</Text>
    </TouchableOpacity>

      {/* Icon kanan */}
      <TouchableOpacity className="items-center">
        <User size={24} color="#7E62F3" />
        <Text className="text-xs text-gray-400">Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
