import { View, Text, ScrollView, FlatList, Image } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import icons from "@/constants/icons";
import { Link } from "expo-router";

const settings = () => {
  return (
    <View className="h-full w-full bg-primary">
      <SafeAreaView>
        <View className="flex items-center flex-row gap-3 py-3 pt-5 mb-2 bg-gray-500/10 rounded-b-xl px-4">
          <Image
            source={icons.settings}
            className="w-6 h-6"
            resizeMode="contain"
            tintColor="#FF9C01"
          />
          <Text className="text-xl text-secondary-200">Settings</Text>
        </View>

        <View className="px-4">
          <Link
            href="/import/phone"
            className="w-full bg-slate-400/10 p-4 rounded-md border gap-5 border-gray-200/20 flex flex-row items-center justify-between"
          >
            <Image
              source={icons.upload}
              className="w-7 h-7"
              resizeMode="contain"
              tintColor="#FF9C01"
            />
            <Text className="text-white border-l ml-4">
              Import contacts from my phone
            </Text>
          </Link>
        </View>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#6b72801a" />
    </View>
  );
};

export default settings;
