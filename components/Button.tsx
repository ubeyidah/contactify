import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
type Prop = {
  text: string;
  className?: string;
  textClass?: string;
  onPress: () => void;
};
const Button = ({ text, className, onPress, textClass }: Prop) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${className} w-full bg-secondary-100 rounded-lg flex items-center justify-center py-5`}
      activeOpacity={0.6}
    >
      <Text className={`${textClass} font-bold text-lg`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
