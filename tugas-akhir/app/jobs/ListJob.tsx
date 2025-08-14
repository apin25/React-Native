import Card from "@/components/Card";
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Input from '@/components/Input';
import { Filter, Search } from 'lucide-react-native';
import BottomNavbar from "@/components/BottomNavbar";
import { useAuth } from "@/hooks/useAuth";
import { useJobs } from "@/hooks/useJobs";
import PopUpFilter from "@/components/Job/PopUpFilter";
import Modal from 'react-native-modal';

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
  const { me, user, logout } = useAuth();  
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);
  const { jobs, fetchJobs, loading } = useJobs();
  const randomBg = useMemo(() => {
      const i = Math.floor(Math.random() * colors.length);
      return colors[i];
  }, []);
  useEffect(() => {
    me();
  }, []);

  useEffect(() => {
    fetchJobs(null, null, null);
  }, []);


  const handleApplyFilter = (workplace: string | null, employment: string | null) => {
    fetchJobs(null, workplace, employment);
  };

  const handleSearch = () => {
    const trimmed = searchText.trim();

    if (!trimmed) {
      fetchJobs(null, null, null);
      return;
    }
    fetchJobs(trimmed, null, null);
  };
  
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
            <Pressable
            onPress={() => setMenuVisible(true)}
            className={`w-10 h-10 rounded-full ${randomBg} justify-center items-center mr-5 mt-5`}
          >
            <Text className="text-white font-bold text-lg">
              {user?.username?.charAt(0).toUpperCase()}
            </Text>
          </Pressable>
          <Modal
            isVisible={isMenuVisible}
            onBackdropPress={() => setMenuVisible(false)}
            backdropOpacity={0.3}
            animationIn="fadeIn"
            animationOut="fadeOut"
            style={{ margin: 0 }} 
            className="justify-start items-end"
          >
            <View className="absolute top-10 right-5 bg-white rounded-lg p-2">
              <TouchableOpacity
                onPress={() => {
                  setMenuVisible(false)
                  logout()
                }}
              >
                <Text className="text-base p-2">Logout</Text>
              </TouchableOpacity>
            </View>
          </Modal>

        </View>
        <Text className="mt-1 ml-5 font-semibold text-lg text-white mr-5" numberOfLines={2}>Find a job you've always dreamed of in here</Text>
        <View className="flex flex-row items-center px-6 space-x-3 mt-1">
          <View className="flex-1">
            <Input
              text={searchText}
              onChangeText={setSearchText}
              placeholder="Search position or company"
              iconRight={
                <TouchableOpacity onPress={handleSearch}>
                  <Search size={20} color="#7E62F3" />
                </TouchableOpacity>
              }
            />
          </View>
          <TouchableOpacity
        onPress={() => setFilterVisible(true)}
        className="px-4 py-4 ml-2 mt-5 bg-secondary rounded-lg mb-2"
      >
        <Filter size={20} color="white" />
      </TouchableOpacity>
        </View>
      </LinearGradient>
      <View className="items-center mt-4 px-4 flex-1">
        {loading &&  (
        <View className="items-center py-3">
          <ActivityIndicator size="small" color="#7E62F3" />
          <Text className="text-gray-500 mt-1">Loading...</Text>
        </View>
      )}
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
      <PopUpFilter
        visible={isFilterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={handleApplyFilter}
      />
</>
  );
}
