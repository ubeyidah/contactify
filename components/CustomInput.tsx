import { View, TextInput, KeyboardTypeOptions } from "react-native";
import React from "react";
type Prop = {
  className?: string;
  placeholder: string;
  type?: KeyboardTypeOptions;
};
const CustomInput = ({ className, placeholder, type = "default" }: Prop) => {
  return (
    <View>
      <TextInput
        className={`${className} w-full bg-slate-400/10 text-lg px-3 py-4 rounded-lg placeholder:text-gray-300/40 border border-gray-200/20 focus:border-secondary-100/30 ${
          true ? "text-gray-100" : ""
        }`}
        cursorColor="#ccc"
        placeholder={placeholder}
        keyboardType={type}
      />
    </View>
  );
};

export default CustomInput;
