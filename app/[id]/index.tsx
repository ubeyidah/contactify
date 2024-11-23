import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const index = () => {
  const search = useLocalSearchParams();
  console.log(search);

  return (
    <View>
      <ScrollView>
        <SafeAreaView className="bg-primary h-screen"></SafeAreaView>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
