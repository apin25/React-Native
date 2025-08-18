import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react-native';

type Props = {
  text: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  iconRight?: React.ReactNode;
  onIconRightPress?: () => void;
};

export default function Input({
  text,
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  iconRight,
  onIconRightPress,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  const togglePassword = () => setHidePassword(!hidePassword);

  const renderIconRight = () => {
    if (secureTextEntry) {
      return (
        <TouchableOpacity onPress={togglePassword}>
          {hidePassword ? (
            <Eye size={20} color="#7E62F3" />
          ) : (
            <EyeOff size={20} color="#7E62F3" />
          )}
        </TouchableOpacity>
      );
    } else if (iconRight) {
      return (
        <TouchableOpacity onPress={onIconRightPress}>
          {iconRight}
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View className="w-full mb-4">
      <Text className="text-base font-semibold mb-1">{text}</Text>
      <View className="relative">
        <TextInput
          className={`border rounded-lg px-5 pr-32 py-3 text-base bg-white shadow-md shadow-gray-300 ${
            isFocused ? 'border-primary' : 'border-transparent'
          }`}
          placeholder={placeholder}
          placeholderTextColor="#D1D5DB"
          secureTextEntry={hidePassword}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <View className="absolute right-4 top-1/2 -translate-y-1/2">
          {renderIconRight()}
        </View>
      </View>
    </View>
  );
}
