import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Modal from "react-native-modal";

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: (workplace: string | null, employment: string | null) => void;
};

const typeOfWorkplaceOptions = ["On Site", "Remote", "Hybrid"];
const employmentTypeOptions = ["Full time", "Part time", "Internship", "Contract", "Temporary", "Volunteer", "Apprenticeship"];

export default function PopUpFilter({ visible, onClose, onApply }: Props) {
  const [selectedWorkplace, setSelectedWorkplace] = useState<string[]>([]);
  const [selectedEmployment, setSelectedEmployment] = useState<string[]>([]);

  const toggleSelection = (
    value: string,
    setFunc: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setFunc((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    onApply(
      selectedWorkplace.length ? selectedWorkplace[0] : null,
      selectedEmployment.length ? selectedEmployment[0] : null
    );
    onClose();
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View className="bg-white w-4/5 h-full ml-auto p-5">
        <Text className="text-xl font-bold mb-4">Filter Jobs</Text>
        <ScrollView>
          <Text className="text-lg font-semibold mb-2">Type of Workplace</Text>
          {typeOfWorkplaceOptions.map((option) => (
            <TouchableOpacity
              key={option}
              className="flex-row items-center mb-2"
              onPress={() => toggleSelection(option, setSelectedWorkplace)}
            >
              <View
                className={`w-5 h-5 mr-3 border rounded ${
                  selectedWorkplace.includes(option) ? "bg-primary" : "bg-white"
                }`}
              />
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}

          {/* Employment Type */}
          <Text className="text-lg font-semibold mt-4 mb-2">Employment Type</Text>
          {employmentTypeOptions.map((option) => (
            <TouchableOpacity
              key={option}
              className="flex-row items-center mb-2"
              onPress={() => toggleSelection(option, setSelectedEmployment)}
            >
              <View
                className={`w-5 h-5 mr-3 border rounded ${
                  selectedEmployment.includes(option) ? "bg-primary" : "bg-white"
                }`}
              />
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={applyFilter}
          className="mt-5 bg-primary p-3 rounded-lg items-center"
        >
          <Text className="text-white font-bold">Apply</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
