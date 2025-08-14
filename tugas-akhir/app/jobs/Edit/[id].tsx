import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { Plus, Edit, ArrowLeft } from 'lucide-react-native';
import { ButtonPrimary } from '@/components/Button';
import { useLocalSearchParams, useRouter } from 'expo-router';
import PopUpWorkplace from '@/components/Job/PopUpWorkplace';
import PopUpType from '@/components/Job/PopUpType';
import { useJobs } from '@/hooks/useJobs';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditJob() {
  const router = useRouter();
  const { job, getJobDetail, updateJob } = useJobs();
  const [showDescriptionInput, setShowDescriptionInput] = useState(true);
  const [description, setDescription] = useState('');
  const [isWorkplacePopupVisible, setWorkplacePopupVisible] = useState(false);
  const [isTypePopupVisible, setTypePopupVisible] = useState(false);
  const params = useLocalSearchParams();
  const selectedJob = params.selectedJob as string;
  const selectedLocation = params.selectedLocation as string;
  const selectedCompany = params.selectedCompany as string;
  const selectedWorkplace = params.selectedWorkplace as string;
  const selectedType = params.selectedType as string;
useEffect(() => {
  const initJobData = async () => {
    if (!job?.id && params?.id) {
      const jobData = await getJobDetail(params.id);
      fillJobFields(jobData);
    } else if (job) {
      fillJobFields(job);
    }
  };

  const fillJobFields = (jobData) => {
    router.setParams({
      selectedJob: selectedJob || jobData.job_position,
      selectedWorkplace: selectedWorkplace || jobData.type_of_workplace,
      selectedLocation: selectedLocation || jobData.job_location,
      selectedCompany: selectedCompany || jobData.company,
      selectedType: selectedType || jobData.employment_type,
    });
  };

  initJobData();
}, [params?.id, job]);

  const goToEditField = (path: string, extraParams?: Record<string, string>) => {
    router.push({
      pathname: path,
      params: {
        id: params?.id,
        selectedJob: selectedJob || job?.job_position,
        selectedWorkplace: selectedWorkplace || job?.type_of_workplace,
        selectedLocation: selectedLocation || job?.job_location,
        selectedCompany: selectedCompany || job?.company,
        selectedType: selectedType || job?.employment_type,
        ...extraParams,
      },
    });
  };

useEffect(() => {
  const initDescription = async () => {
    if (params?.fromDetail === 'true') {
      await AsyncStorage.removeItem(`job-desc-${params?.id}`);

      if (params?.description) {
        setDescription(params.description as string);
      }

      const jobData = await getJobDetail(params?.id);
      if (jobData?.description) {
        setDescription(jobData.description);
      }
      return;
    }

    const savedDescription = await AsyncStorage.getItem(`job-desc-${params?.id}`);
    if (savedDescription) {
      setDescription(savedDescription);
      return;
    }

    const jobData = await getJobDetail(params?.id);
    if (jobData?.description) {
      setDescription(jobData.description);
    }
  };

  if (params?.id) {
    initDescription();
  }
}, [params?.id]);

  const handleDescriptionChange = async (text: string) => {
    setDescription(text);
    await AsyncStorage.setItem(`job-desc-${params?.id}`, text);
  };

  const handleSubmit = async (id: string) => {
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
      router.replace('/jobs/ListJob');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Update job failed',
        text2: 'Something wrong when update job',
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

  return (
    <ScrollView className="bg-neutral-100 w-screen h-screen pb-24">
      <Pressable
  className="ml-5 mt-20"
  onPress={async () => {
    await AsyncStorage.removeItem(`job-desc-${params.id}`);
    router.replace(`/jobs/${params.id}`);
  }}
>
  <ArrowLeft size={24} color="#1F2937" />
</Pressable>
      <Text className="font-bold text-2xl ml-5 mt-5">Edit a Job</Text>

      <View className="justify-center items-center mt-5 space-y-4">
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-md font-semibold mt-2">
              Job Position<Text className="text-red-500">*</Text>
            </Text>
            <Text className="text-sm text-gray-700 mt-1">{selectedJob ?? job?.job_position}</Text>
          </View>
          <Pressable
            onPress={() => goToEditField('/jobs/Edit/JobPosition')}
            className="h-8 w-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {selectedJob ? <Edit size={16} color="#F59E0B" /> : <Plus size={16} color="#F59E0B" />}
          </Pressable>
        </View>

        {/* Type of Workplace */}
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center mt-2">
          <View className="flex-1">
            <Text className="text-md font-semibold mt-2">
              Type of Workplace<Text className="text-red-500">*</Text>
            </Text>
            <Text className="text-sm text-gray-700 mt-1">
              {selectedWorkplace || <Text className="text-gray-400 italic">{job?.type_of_workplace}</Text>}
            </Text>
          </View>
          <Pressable
            onPress={() => setWorkplacePopupVisible(true)}
            className="h-8 w-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {selectedWorkplace ? <Edit size={16} color="#F59E0B" /> : <Plus size={16} color="#F59E0B" />}
          </Pressable>
        </View>

        {/* Location */}
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center mt-2">
          <View className="flex-1">
            <Text className="text-md font-semibold mt-2">
              Location<Text className="text-red-500">*</Text>
            </Text>
            <Text className="text-sm text-gray-700 mt-1">{selectedLocation ?? job?.job_location}</Text>
          </View>
          <Pressable
            onPress={() => goToEditField('/jobs/Edit/Location')}
            className="h-8 w-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {selectedLocation ? <Edit size={16} color="#F59E0B" /> : <Plus size={16} color="#F59E0B" />}
          </Pressable>
        </View>

        {/* Company */}
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center mt-2">
          <View className="flex-1">
            <Text className="text-md font-semibold mt-2">
              Company<Text className="text-red-500">*</Text>
            </Text>
            <Text className="text-sm text-gray-700 mt-1">{selectedCompany ?? job?.company}</Text>
          </View>
          <Pressable
            onPress={() => goToEditField('/jobs/Edit/Company')}
            className="h-8 w-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {selectedCompany ? <Edit size={16} color="#F59E0B" /> : <Plus size={16} color="#F59E0B" />}
          </Pressable>
        </View>

        {/* Employment Type */}
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 px-5 py-3 flex-row justify-between items-center mt-2">
          <View className="flex-1">
            <Text className="text-md font-semibold mt-2">
              Employment Type<Text className="text-red-500">*</Text>
            </Text>
            <Text className="text-sm text-gray-700 mt-1">
              {selectedType || <Text className="text-gray-400 italic">{job?.employment_type}</Text>}
            </Text>
          </View>
          <Pressable
            onPress={() => setTypePopupVisible(true)}
            className="h-8 w-8 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {selectedType ? <Edit size={16} color="#F59E0B" /> : <Plus size={16} color="#F59E0B" />}
          </Pressable>
        </View>

        {/* Description */}
        <View className="w-[92%] min-h-20 rounded-lg bg-white shadow-md shadow-gray-300 mb-5 mt-2">
          <View className="flex flex-row justify-between items-center px-4 py-3">
            <Text className="text-md font-semibold mt-2">
              Description<Text className="text-red-500">*</Text>
            </Text>
            <Pressable
              onPress={() => setShowDescriptionInput(!showDescriptionInput)}
              className="h-8 w-8 rounded-full items-center justify-center mt-3"
              style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
            >
              {showDescriptionInput ? <Edit size={16} color="#F59E0B" /> : <Plus size={16} color="#F59E0B" />}
            </Pressable>
          </View>
          {showDescriptionInput && (
            <View className="px-4 pb-4">
              <TextInput
                className="min-h-24 rounded-lg bg-white p-3 text-gray-800 border border-gray-300"
                multiline
                value={description}
                onChangeText={handleDescriptionChange}
              />
            </View>
          )}
        </View>
      </View>

      <View className="justify-center items-center mt-16">
        <ButtonPrimary text="Submit" myWidth={380} onPress={() => handleSubmit(job?.id)} />
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
  );
}
