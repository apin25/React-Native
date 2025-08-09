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
  const [selectedWorkplace, setSelectedWorkplace] = useState<string | null>(null);
  const [selectedEmployment, setSelectedEmployment] = useState<string | null>(null);

  const applyFilter = () => {
    onApply(selectedWorkplace, selectedEmployment);
    onClose();
  };

  // Komponen RadioButton sederhana
  const RadioButton = ({
    label,
    selected,
    onPress,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      activeOpacity={0.7}
    >
      <View
        style={{
          height: 20,
          width: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: selected ? "#4F46E5" : "#999",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selected ? (
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: "#4F46E5",
            }}
          />
        ) : null}
      </View>
      <Text style={{ marginLeft: 12, fontSize: 16 }}>{label}</Text>
    </TouchableOpacity>
  );

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
            <RadioButton
              key={option}
              label={option}
              selected={selectedWorkplace === option}
              onPress={() => setSelectedWorkplace(option)}
            />
          ))}

          <Text className="text-lg font-semibold mt-4 mb-2">Employment Type</Text>
          {employmentTypeOptions.map((option) => (
            <RadioButton
              key={option}
              label={option}
              selected={selectedEmployment === option}
              onPress={() => setSelectedEmployment(option)}
            />
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
