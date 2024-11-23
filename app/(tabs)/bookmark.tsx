import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Switch,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const bookmakr = () => {
  return (
    <View className="h-full w-full bg-primary">
      <SafeAreaView>
        <ScrollView></ScrollView>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#161622" />
    </View>
  );
};

export default bookmakr;
