import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import icons from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FilePicker from "@/components/FilePicker";
import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";

const create = () => {
  const [newContact, setNewContact] = useState({
    image: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  return (
    <View className="h-full w-full bg-primary">
      <SafeAreaView>
        <ScrollView className="px-5">
          <Text className="text-left text-secondary-100 font-semibold text-3xl mt-16">
            New contact
          </Text>
          <View className="mt-8">
            <FilePicker />
          </View>
          <View className="flex gap-8 mt-10">
            <CustomInput placeholder="First Name" />
            <CustomInput placeholder="Last Name" />
            <CustomInput placeholder="Phone Number" type="numeric" />
          </View>
          <Button text="Save " className="mt-10 mb-10" onPress={() => {}} />
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#161622" />
    </View>
  );
};

export default create;
