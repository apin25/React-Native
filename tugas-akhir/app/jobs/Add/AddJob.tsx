import React, { useState } from 'react'
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { Plus, Edit, ArrowLeft } from 'lucide-react-native';
import { ButtonPrimary } from '@/components/Button';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import PopUpWorkplace from '@/components/Job/PopUpWorkplace';
import PopUpType from '@/components/Job/PopUpType';

export default function AddJob() {
  const router = useRouter();
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [description, setDescription] = useState('');
  const [isWorkplacePopupVisible, setWorkplacePopupVisible] = useState(false);
  const [isTypePopupVisible, setTypePopupVisible] = useState(false);
  const params = useLocalSearchParams();
  const selectedJob = params.selectedJob;
  const selectedLocation = params.selectedLocation;
  const selectedCompany = params.selectedCompany;
  const selectedWorkplace = params.selectedWorkplace as string;
  const selectedType = params.selectedType as string;
  const [showCloseDateInput, setShowCloseDateInput] = useState(false);
  const [closeDate, setCloseDate] = useState('');

  return (
    <ScrollView className='bg-neutral-100 w-screen h-screen pb-24'>
      <Pressable className="ml-5 mt-6" onPress={() => router.replace("/jobs/ListJob")}>
          <ArrowLeft size={24} color="#1F2937" />
      </Pressable>
      <Text className='font-bold text-2xl ml-5 mt-5'>Add a Job</Text>
      <View className='justify-center items-center mt-5 space-y-4'>
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
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center">
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
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center">
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
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center">
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
            {selectedLocation == null ? <Plus size={16} color="#F59E0B" /> : <Edit size={16} color="#F59E0B" />}
          </Pressable>
        </View>
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center">
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
        
        <View className='w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 mb-5'>
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
        <ButtonPrimary text="Submit" myWidth={380}/>
      </View>
      <PopUpWorkplace
        visible={isWorkplacePopupVisible}
        onClose={() => setWorkplacePopupVisible(false)}
        selected={selectedWorkplace}
        onSelect={(value) => {
        router.setParams({ Type: value });
        setWorkplacePopupVisible(false);
      }}
    />
    <PopUpType
        visible={isTypePopupVisible}
        onClose={() => setTypePopupVisible(false)}
        selected={selectedType}
        onSelect={(value) => {
        router.setParams({ Type: value });
        setTypePopupVisible(false);
      }}
    />
    </ScrollView>    
  )
}
