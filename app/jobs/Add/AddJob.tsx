import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { Plus, Edit, ArrowLeft } from 'lucide-react-native';
import { ButtonPrimary } from '@/components/Button';
import { useLocalSearchParams, useRouter } from 'expo-router';
import PopUpWorkplace from '@/components/Job/PopUpWorkplace';
import PopUpType from '@/components/Job/PopUpType';
import { useJobs } from '@/hooks/useJobs';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddJob() {
  const router = useRouter();
  const DRAFT_DESCRIPTION_KEY = 'addjob-draft-description';

  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [description, setDescription] = useState('');
  const [isWorkplacePopupVisible, setWorkplacePopupVisible] = useState(false);
  const [isTypePopupVisible, setTypePopupVisible] = useState(false);

  const params = useLocalSearchParams();
  const selectedJob = params.selectedJob as string;
  const selectedLocation = params.selectedLocation as string;
  const selectedCompany = params.selectedCompany as string;
  const selectedWorkplace = params.selectedWorkplace as string;
  const selectedType = params.selectedType as string;

  const { addJob, loading } = useJobs();
  useEffect(() => {
    const loadDraft = async () => {
      const savedDescription = await AsyncStorage.getItem(DRAFT_DESCRIPTION_KEY);
      if (savedDescription) {
        setDescription(savedDescription);
        setShowDescriptionInput(true);
      }
    };
    loadDraft();
  }, []);
  useEffect(() => {
    AsyncStorage.setItem(DRAFT_DESCRIPTION_KEY, description);
  }, [description]);


  const handleSubmit = async () => {
    if (
      !selectedJob ||
      !selectedWorkplace ||
      !selectedLocation ||
      !selectedCompany ||
      !selectedType ||
      !description
    ) {
      Toast.show({
        type: 'error',
        text1: 'All field must be filled',
        text2: 'Something wrong when add job',
        position: 'bottom',
        props: {}, 
        visibilityTime: 4000,
        autoHide: true,
        bottomOffset: 100,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
        style: {
          alignSelf: 'flex-end',
          marginRight: 20,
        },
      });
      return;
    }

    try {
      await addJob({
        job_position: selectedJob,
        type_of_workplace: selectedWorkplace,
        job_location: selectedLocation,
        company: selectedCompany,
        employment_type: selectedType,
        description,
      });

      await AsyncStorage.removeItem(DRAFT_DESCRIPTION_KEY);

      Toast.show({
        type: 'success',
        text1: 'Add job successfully',
        text2: 'Redirecting to list job',
        position: 'bottom',
        props: {}, 
        visibilityTime: 4000,
        autoHide: true,
        bottomOffset: 100,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
        style: {
          alignSelf: 'flex-end',
          marginRight: 20,
        },
      });

      router.replace("/jobs/ListJob");
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Add job failed',
        text2: 'Something wrong when add job',
        position: 'bottom',
        props: {}, 
        visibilityTime: 4000,
        autoHide: true,
        bottomOffset: 100,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
        style: {
          alignSelf: 'flex-end',
          marginRight: 20,
        },
      });
      console.error(error);
    }
  };
  if (loading) {
      return (
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#7E62F3" />
          <Text className="mt-2 text-gray-500">Loading add job...</Text>
        </View>
      );
    }
  return (
    <ScrollView className='bg-neutral-100 w-screen h-screen pb-24'>
      <Pressable
        className="ml-5 mt-20"
        onPress={async () => {
          await AsyncStorage.removeItem('addjob-draft-description');
          router.replace("/jobs/ListJob");
        }}
      >
        <ArrowLeft size={24} color="#1F2937" />
      </Pressable>
      <Text className='font-bold text-2xl ml-5 mt-5'>Add a Job</Text>
      <View className='justify-center items-center mt-5'>
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-md font-semibold">
              Job Position<Text className="text-red-500">*</Text>
            </Text>
            <Text className="text-sm text-gray-700 mt-1">{selectedJob ?? null}</Text>
          </View>
          <Pressable
            onPress={() => router.push({pathname: '/jobs/Add/JobPosition',params: {
            selectedWorkplace,
            selectedJob, 
            selectedLocation,
            selectedCompany
          },})}
            className="h-8 w-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {selectedJob == null ? <Plus size={16} color="#F59E0B" /> : <Edit size={16} color="#F59E0B" />}
          </Pressable>
        </View>
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center mt-2">
          <View className="flex-1">
            <Text className="text-md font-semibold">
              Type of Workplace<Text className="text-red-500">*</Text>
            </Text>
            <Text className="text-sm text-gray-700 mt-1">
              {selectedWorkplace ? (
                selectedWorkplace
              ) : (
                <Text className="text-gray-400 italic"></Text>
              )}
            </Text>
          </View>
          <Pressable
            onPress={() => setWorkplacePopupVisible(true)}
            className="h-8 w-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {!selectedWorkplace ? <Plus size={16} color="#F59E0B" /> : <Edit size={16} color="#F59E0B" />}
          </Pressable>
        </View>
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center mt-2">
          <View className="flex-1">
            <Text className="text-md font-semibold">
              Location<Text className="text-red-500">*</Text>
            </Text>
            <Text className="text-sm text-gray-700 mt-1">{selectedLocation ?? null}</Text>
          </View>
          <Pressable
            onPress={() => router.push({pathname: '/jobs/Add/Location',params: {
            selectedWorkplace,
            selectedJob, 
            selectedLocation,
            selectedCompany,
            selectedType
          },})}
            className="h-8 w-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {selectedLocation == null ? <Plus size={16} color="#F59E0B" /> : <Edit size={16} color="#F59E0B" />}
          </Pressable>
        </View>
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center mt-2">
          <View className="flex-1">
            <Text className="text-md font-semibold">
              Company<Text className="text-red-500">*</Text>
            </Text>
            <Text className="text-sm text-gray-700 mt-1">{selectedCompany ?? null}</Text>
          </View>
          <Pressable
            onPress={() => router.push({pathname: '/jobs/Add/Company',params: {
            selectedWorkplace,
            selectedJob, 
            selectedLocation,
            selectedCompany,
            selectedType
          },})}
            className="h-8 w-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {selectedCompany == null ? <Plus size={16} color="#F59E0B" /> : <Edit size={16} color="#F59E0B" />}
          </Pressable>
        </View>
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center mt-2">
          <View className="flex-1">
            <Text className="text-md font-semibold">
              Employment Type<Text className="text-red-500">*</Text>
            </Text>
            <Text className="text-sm text-gray-700 mt-1">
              {selectedType ? (
                selectedType
              ) : (
                <Text className="text-gray-400 italic"></Text>
              )}
            </Text>
          </View>
          <Pressable
            onPress={() => setTypePopupVisible(true)}
            className="h-8 w-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {!selectedType ? <Plus size={16} color="#F59E0B" /> : <Edit size={16} color="#F59E0B" />}
          </Pressable>
        </View>
        
        <View className='w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 mb-5 mt-2'>
        <View className="flex flex-row justify-between items-center px-4 py-3">
          <Text className='text-md font-semibold mt-2'>
            Description<Text className='text-red-500'>*</Text>
          </Text>
          <Pressable
            onPress={() => setShowDescriptionInput(!showDescriptionInput)}
            className="h-8 w-8 rounded-full items-center justify-center mt-3"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {showDescriptionInput ? (
              <Edit size={16} color="#F59E0B" />
            ) : (
              <Plus size={16} color="#F59E0B" />
            )}
          </Pressable>
        </View>

        {showDescriptionInput && (
          <View className="px-4 pb-4">
            <TextInput
              className="min-h-24 rounded-lg bg-white p-3 text-gray-800 border border-gray-300"
              placeholder="Enter job description..."
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>
        )}
      </View>

      </View>
      <View className='justify-center items-center mt-16'>
        <ButtonPrimary onPress={handleSubmit} text="Submit" myWidth={380}/>
      </View>
      <PopUpWorkplace
        visible={isWorkplacePopupVisible}
        onClose={() => setWorkplacePopupVisible(false)}
        selected={selectedWorkplace}
        onSelect={(value) => {
          router.setParams({ selectedWorkplace: value });
          setWorkplacePopupVisible(false);
      }}
    />
    <PopUpType
        visible={isTypePopupVisible}
        onClose={() => setTypePopupVisible(false)}
        selected={selectedType}
        onSelect={(value) => {
          router.setParams({ selectedType: value });
          setTypePopupVisible(false);
        }}
    />
    </ScrollView>    
  )
}
