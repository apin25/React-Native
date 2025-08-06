import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react-native';

type Props = {
  text: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
};

export default function Input({
  text,
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  const togglePassword = () => setHidePassword(!hidePassword);

  return (
    <View className="w-full mb-4">
      <Text className="text-base font-semibold mb-1">{text}</Text>
      <View
        className={`border rounded-lg px-5 py-3 flex-row items-center bg-white shadow-md shadow-gray-300 ${
          isFocused ? 'border-primary' : 'border-transparent'
        }`}
      >
        <TextInput
          className="flex-1 text-base pr-20"
          placeholder={placeholder}
          placeholderTextColor="#D1D5DB"
          secureTextEntry={hidePassword}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePassword}>
            {hidePassword ? (
              <Eye size={20} color="#6D28D9" />
            ) : (
              <EyeOff size={20} color="#6D28D9" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
