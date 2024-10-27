import { View, Text, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";

type Prop = {
  className?: string;
};
const FilePicker = ({ className }: Prop) => {
  return (
    <View
      className={`${className} w-full aspect-video border border-secondary/30 border-dashed rounded-md items-center justify-center`}
    >
      <Image
        source={icons.gallery}
        resizeMode="contain"
        tintColor="#FF9C01"
        className="w-20 h-20 opacity-35"
      />
      <Text className="text-gray-300/30 mt-3 text-sm">Upload contact image</Text>
    </View>
  );
};

export default FilePicker;
