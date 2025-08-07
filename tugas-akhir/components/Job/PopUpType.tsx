import { useLocalSearchParams, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

type PopUpJobProps = {
  visible: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (value: string) => void;
};

const OPTIONS = [
  { label: 'Full time'},
  { label: 'Part time' },
  { label: 'Contract' },
  { label: 'Temporary'},
  { label: 'Volunteer' },
  { label: 'Apprenticeship' },
];

export default function PopUpType({ visible, onClose, selected, onSelect }: PopUpJobProps) {
  const router = useRouter();
  const params = useLocalSearchParams();
  const pathName = usePathname();
   const handleSelect = (value: string) => {
    // Update URL param
    router.replace({
      pathname: pathName,
      params: {
        ...params,
        selectedType: value, 
      },
    });

    onSelect(value);  
    onClose();        
  };
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <View className="bg-white rounded-t-2xl px-4 py-6">
          <Text className="font-bold text-lg text-center">
            Choose Job Type
          </Text>
          <Text className="font-normal text-md mb-4 text-center" numberOfLines={2}>
            Determine and choose the type of work according to what you want
          </Text>
          {OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.label}
              onPress={() => handleSelect(option.label)}
              className="flex-row items-center my-2"
            >
              <View className="h-4 w-4 rounded-full border-2 border-yellow-500 items-center justify-center mr-3">
                {selected === option.label && (
                  <View className="h-2 w-2 rounded-full bg-yellow-500" />
                )}
              </View>
              <View>
                <Text className="font-medium text-base">{option.label}</Text>
                <Text className="text-xs text-gray-500">{option.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity onPress={onClose} className="mt-6">
            <Text className="text-center text-yellow-500 font-semibold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
