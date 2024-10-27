import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const settings = () => {
  return (
    <View className="h-full w-full bg-primary">
      <SafeAreaView></SafeAreaView>
      <StatusBar style="light" backgroundColor="#161622" />
    </View>
  );
};

export default settings;
