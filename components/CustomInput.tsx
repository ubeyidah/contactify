import {
  View,
  TextInput,
  KeyboardTypeOptions,
  Image,
  ImageProps,
  Text,
} from "react-native";
import React from "react";

type Prop = {
  className?: string;
  placeholder: string;
  type?: KeyboardTypeOptions;
  icon?: ImageProps;
  value: string;
  name: string;
  onChange: (value: string, name: string) => void;
  error?: string;
};
const CustomInput = ({
  className,
  placeholder,
  type = "default",
  icon,
  value,
  onChange,
  name,
  error,
}: Prop) => {
  return (
    <View className="relative">
      {icon && (
        <Image
          source={icon}
          resizeMode="contain"
          className="w-5 h-5 opacity-40 absolute top-[50%] -translate-y-1/2 left-4"
          tintColor="#CDCDE0"
        />
      )}
      <TextInput
        className={`${className} w-full bg-slate-400/10 text-lg px-3 ${
          icon ? "pl-12" : ""
        } py-4 rounded-lg placeholder:text-gray-300/40 border border-gray-200/20 focus:border-secondary-100/30 ${
          true ? "text-gray-100" : ""
        }  ${error ? "border-red-700  focus:border-red-500/70" : ""}`}
        cursorColor="#ccc"
        placeholder={placeholder}
        keyboardType={type}
        defaultValue={value}
        onChangeText={(val) => onChange(val, name)}
      />
      {error && (
        <Text className="text-xs text-red-600 mt-1  absolute -bottom-5">
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;
