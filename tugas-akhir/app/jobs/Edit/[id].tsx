import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { Plus, Edit, ArrowLeft } from 'lucide-react-native';
import { ButtonPrimary } from '@/components/Button';
import { useLocalSearchParams, useRouter } from 'expo-router';
import PopUpWorkplace from '@/components/Job/PopUpWorkplace';
import PopUpType from '@/components/Job/PopUpType';
import { useJobs } from '@/hooks/useJobs';
import Toast from 'react-native-toast-message';

export default function EditJob() {
  const router = useRouter();
  const { job, getJobDetail, updateJob } = useJobs();
  const [showDescriptionInput, setShowDescriptionInput] = useState(true);
  const [description, setDescription] = useState(job?.description ?? '');
  const [isWorkplacePopupVisible, setWorkplacePopupVisible] = useState(false);
  const [isTypePopupVisible, setTypePopupVisible] = useState(false);
  const params = useLocalSearchParams();
  const selectedJob = params.selectedJob as string;
  const selectedLocation = params.selectedLocation as string;
  const selectedCompany = params.selectedCompany as string;
  const selectedWorkplace = params.selectedWorkplace as string;
  const selectedType = params.selectedType as string;

  useEffect(() => {
    getJobDetail(params?.id);
  }, []);
useEffect(() => {
  if (job?.description) {
    setDescription(job.description);
  }
}, [job?.description]);

const handleSubmit = async (id : string) => {
  try {
    await updateJob(id, {
      job_position: selectedJob || job?.job_position,
      type_of_workplace: selectedWorkplace || job?.type_of_workplace,
      job_location: selectedLocation || job?.job_location,
      company: selectedCompany || job?.company,
      employment_type: selectedType || job?.employment_type,
      description: description || job?.description,
    });
    Toast.show({
      type: 'success',
      text1: 'Update job successfully',
      text2: 'Redirecting to list job',
    });
    router.replace("/jobs/ListJob");
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Update job failed',
      text2: 'Something wrong when update job',
    });
    console.error(error);
  }
};

  return (
    <ScrollView className='bg-neutral-100 w-screen h-screen pb-24'>
      <Pressable className="ml-5 mt-20" onPress={() => router.replace(`/jobs/${params.id}`)}>
          <ArrowLeft size={24} color="#1F2937" />
      </Pressable>
      <Text className='font-bold text-2xl ml-5 mt-5'>Edit a Job</Text>
      <View className='justify-center items-center mt-5 space-y-4'>
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-md font-semibold mt-2">
              Job Position<Text className="text-red-500">*</Text>
            </Text>
            <Text className="text-sm text-gray-700 mt-1">{selectedJob ?? job?.job_position}</Text>
          </View>
          <Pressable
            onPress={() => router.push({pathname: '/jobs/Edit/JobPosition',params: {
            id: job?.id,
            selectedWorkplace,
            selectedJob, 
            selectedLocation,
            selectedCompany
          },})}
            className="h-8 w-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {selectedJob === null || job?.job_position === null ? <Plus size={16} color="#F59E0B" /> : <Edit size={16} color="#F59E0B" />}
          </Pressable>
        </View>
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center mt-2">
          <View className="flex-1">
            <Text className="text-md font-semibold mt-2">
              Type of Workplace<Text className="text-red-500">*</Text>
            </Text>
            <Text className="text-sm text-gray-700 mt-1">
              {selectedWorkplace ? (
                selectedWorkplace
              ) : (
                <Text className="text-gray-400 italic">{job?.type_of_workplace}</Text>
              )}
            </Text>
          </View>
          <Pressable
            onPress={() => setWorkplacePopupVisible(true)}
            className="h-8 w-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {selectedWorkplace === null || job?.type_of_workplace === null ? <Plus size={16} color="#F59E0B" /> : <Edit size={16} color="#F59E0B" />}
          </Pressable>
        </View>
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center mt-2">
          <View className="flex-1">
            <Text className="text-md font-semibold mt-2">
              Location<Text className="text-red-500">*</Text>
            </Text>
            <Text className="text-sm text-gray-700 mt-1">{selectedLocation ?? job?.job_location}</Text>
          </View>
          <Pressable
            onPress={() => router.push({pathname: '/jobs/Edit/Location',params: {
            id: job?.id,
            selectedWorkplace,
            selectedJob, 
            selectedLocation,
            selectedCompany,
            selectedType
          },})}
            className="h-8 w-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {selectedLocation === null || job?.job_location === null ? <Plus size={16} color="#F59E0B" /> : <Edit size={16} color="#F59E0B" />}
          </Pressable>
        </View>
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center mt-2">
          <View className="flex-1">
            <Text className="text-md font-semibold mt-2">
              Company<Text className="text-red-500">*</Text>
            </Text>
            <Text className="text-sm text-gray-700 mt-1">{selectedCompany ?? job?.company}</Text>
          </View>
          <Pressable
            onPress={() => router.push({pathname: '/jobs/Edit/Company',params: {
            id: params?.id,
            selectedWorkplace,
            selectedJob, 
            selectedLocation,
            selectedCompany,
            selectedType
          },})}
            className="h-8 w-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {selectedLocation === null || job?.job_location === null ? <Plus size={16} color="#F59E0B" /> : <Edit size={16} color="#F59E0B" />}
          </Pressable>
        </View>
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center mt-2">
          <View className="flex-1">
            <Text className="text-md font-semibold mt-2">
              Employment Type<Text className="text-red-500">*</Text>
            </Text>
            <Text className="text-sm text-gray-700 mt-1">
              {selectedType ? (
                selectedType
              ) : (
                <Text className="text-gray-400 italic">{job?.employment_type}</Text>
              )}
            </Text>
          </View>
          <Pressable
            onPress={() => setTypePopupVisible(true)}
            className="h-8 w-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {selectedType === null || job?.employment_type === null ? <Plus size={16} color="#F59E0B" /> : <Edit size={16} color="#F59E0B" />}
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
            {showDescriptionInput === null || job?.description === null ? (
              <Plus size={16} color="#F59E0B" />
            ) : (
              <Edit size={16} color="#F59E0B" />
            )}
          </Pressable>
        </View>
      {showDescriptionInput && (
        <View className="px-4 pb-4">
          <TextInput
            className="min-h-24 rounded-lg bg-white p-3 text-gray-800 border border-gray-300"
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>
      )}
    </View>
      </View>
      <View className='justify-center items-center mt-16'>
        <ButtonPrimary text="Submit" myWidth={380} onPress={() => handleSubmit(job?.id)}/>
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
