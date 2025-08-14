import { ActivityIndicator, Alert, Linking, Pressable,  ScrollView,  Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useJobs } from '@/hooks/useJobs';
import { ArrowLeft, Trash } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';
import { ButtonSecondary } from '@/components/Button';
import Toast from 'react-native-toast-message';

const colors = [
  'bg-pink-300',
  'bg-cyan-300',
  'bg-yellow-300',
  'bg-rose-300',
  'bg-sky-300',
  'bg-amber-300',
  'bg-emerald-300',
];

export default function DetailJob() {
  const router = useRouter();
    const params = useLocalSearchParams();
    const { job, getJobDetail, loading, deleteJob } = useJobs();
    const navigation = useNavigation();
    const randomBg = useMemo(() => {
      const i = Math.floor(Math.random() * colors.length);
      return colors[i];
    }, []);
    const latitude = -6.200000;
    const longitude = 106.816666;

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };
    useEffect(() => {
      getJobDetail(params?.id);
    }, []);

const handleDelete = (id: string) => {
  Alert.alert(
    "Delete Job",
    "Are you sure want to delete this job?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteJob(id);
            Toast.show({
              type: 'success',
              text1: 'Delete job successfully',
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
              text1: 'Delete job failed',
              text2: 'Something wrong when delete job',
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
        },
      },
    ]
  );
};
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#7E62F3" />
        <Text className="mt-2 text-gray-500">Loading job detail...</Text>
      </View>
    );
  }
  return (
    <>
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>     
    <LinearGradient
      colors={['#A38EFF', '#7E62F3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 24 }} 
      className="w-full justify-center h-[240px] shadow-md shadow-primary"
      >
        <View className="flex-row items-center mb-24 px-5">
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#1F2937" />
          </Pressable>
          <View className="flex-1 items-center mr-7 mt-32">
            <View className={`w-16 h-16 rounded-full ${randomBg} justify-center items-center`}>
              <Text className="text-white font-bold text-3xl">
                {job?.company.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className='mt-3 text-2xl font-bold text-white'>{job?.job_position}</Text>
            <View className="flex flex-row flex-wrap gap-2 justify-center mt-2">
              <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.20)', paddingHorizontal: 20, paddingVertical: 8 }} className='rounded-md'>
                  <Text className="text-md text-white">{job?.type_of_workplace}</Text>
                </View>
              <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.20)', paddingHorizontal: 20, paddingVertical: 8 }} className='rounded-md'>
                <Text className="text-md text-white">{job?.employment_type}</Text>
              </View>
              <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.20)', paddingHorizontal: 20, paddingVertical: 8 }} className='rounded-md'>
                <Text className="text-md text-white">{job?.is_deleted === false ? "Open" :"Close"}</Text>
              </View>
            </View>
          </View>
        </View>
    </LinearGradient>
    <View className='ml-7 mt-4'>
      <Text className='text-xl font-bold'>Company</Text>
      <Text className='text-base font-medium'>{job?.company}</Text>
      <Text className='text-xl font-bold mt-4'>Description</Text>
      <Text className='text-base font-medium'>{job?.description}</Text>
      <Text className='text-xl font-bold mt-4'>Location</Text>
      <Text className='text-base font-medium'>{job?.job_location}</Text>
      <View className="mt-4 mx-auto mr-8 border-primary border h-60 overflow-hidden w-[96%] rounded-lg">
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title={job?.company}
            description={job?.job_location}
            onPress={openInGoogleMaps} 
          />
        </MapView>
        <TouchableOpacity className='w-full h-full absolute'
          onPress={openInGoogleMaps}
        />
      </View>
    </View>
    </ScrollView>
    <View className='flex flex-row absolute bottom-0 bg-white shadow-gray-100 shadow-md h-28 w-full rounded-t-3xl p-3 right-0 left-0 items-center'>
      <Pressable
        className="px-3 py-3 bg-pink-300 rounded-lg mr-3 mb-3"
        onPress={() => handleDelete(job?.id)}
      >
        <Trash size={24} color="white" />
      </Pressable>

      <View className='mb-3'>
          <ButtonSecondary
            text="Update Job"
            myWidth={300}
            onPress={() =>
              router.replace({
                pathname: `/jobs/Edit/${job?.id}`,
                params: { 
                  fromDetail: 'true',
                  description: job?.description || ''
                }
              })
            }
          />
      </View>
    </View>
    </>
  )
}