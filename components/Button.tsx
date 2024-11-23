import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
type Prop = {
  text: string;
  className?: string;
  textClass?: string;
  onPress: () => void;
  loading?: boolean;
};
const Button = ({ text, className, onPress, textClass, loading }: Prop) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${className} ${
        loading ? "opacity-35 py-3" : ""
      } w-full bg-secondary-100 rounded-lg flex items-center justify-center py-5`}
      activeOpacity={0.6}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#ccc" />
      ) : (
        <Text className={`${textClass} font-bold text-lg`}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
