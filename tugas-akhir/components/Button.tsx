import { Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

type Props = {
  text: string;
  onPress?: () => void;
  myWidth:number
};

export function ButtonPrimary({ text, onPress, myWidth }: Props) {
  const { width } = useWindowDimensions(); 

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        className='shadow-md shadow-primary'
        colors={['#7E62F3', '#A38EFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 12,
          minWidth: myWidth,
          width: width * 0.8, 
          maxWidth: 480,
        }}
      >
        <Text className="text-white text-center font-semibold">
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function ButtonSecondary({ text, onPress }: Props) {
  const { width } = useWindowDimensions(); 

  return (
    <TouchableOpacity
      className='bg-secondary' 
      onPress={onPress} 
      activeOpacity={0.8} 
      style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 12,
          minWidth: 320,
          width: width * 0.8, 
          maxWidth: 480,
        }}>
        <Text className="text-white text-center font-semibold">
          {text}
        </Text>
    </TouchableOpacity>
  );
}
