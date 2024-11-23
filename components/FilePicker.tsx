import { Text, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import icons from "@/constants/icons";
import * as FileSystem from "expo-file-system";

type Prop = {
  className?: string;
  name: string;
  onChange: (value: string, name: string) => void;
  uri: string;
};

const FilePicker = ({ className, name, onChange, uri }: Prop) => {
  const openPiker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      saveImage(result.assets[0].uri);
    }
  };

  const saveImage = async (uri: string) => {
    try {
      const fileName = uri.split("/").pop();
      const newPath = `${FileSystem.documentDirectory}${fileName}`;

      // Copy the image file to the new path
      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });

      onChange(newPath, name);
    } catch (error) {
      alert("Error saving image: " + error);
    }
  };

  const removeImage = () => {
    onChange("", name);
  };
  if (!uri) {
    return (
      <TouchableOpacity
        onPress={openPiker}
        activeOpacity={0.6}
        className={`${className} w-full aspect-video border border-secondary/30 border-dashed rounded-md items-center justify-center`}
      >
        <Image
          source={icons.gallery}
          resizeMode="contain"
          tintColor="#FF9C01"
          className="w-20 h-20 opacity-35"
        />
        <Text className="text-gray-300/30 mt-3 text-sm">
          Upload contact image (optional)
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View className={`w-full aspect-video rounded-md relative`}>
        <TouchableOpacity
          className="absolute top-2 right-2 z-50"
          activeOpacity={0.7}
          onPress={removeImage}
        >
          <Image
            source={icons.plus}
            resizeMode="contain"
            tintColor="#000"
            className="w-9 h-9 rotate-45 bg-white rounded-full"
          />
        </TouchableOpacity>
        <Image
          source={{
            uri,
          }}
          resizeMode="contain"
          className="w-full h-full rounded-md"
        />
      </View>
    );
  }
};

export default FilePicker;
