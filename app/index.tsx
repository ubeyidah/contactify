import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import icons from "@/constants/icons";

const index = () => {
  const router = useRouter();

  return (
    <View>
      <SafeAreaView className="w-full h-full bg-primary text-gray-400 px-4">
        <ScrollView>
          <Text className="text-secondary-100 font-bold text-xl mb-8 mt-4">
            Contactify
          </Text>
          <Image
            source={icons.landing}
            className="h-[340px] w-[380px] mx-auto my-16"
          />
          <Text className="text-slate-400 text-lg leading-5">
            Contactify makes calling easy with large contact photos and
            accessible features for everyone.
          </Text>
          <Button
            text="Get Started"
            className="mt-10"
            onPress={() => router.push("/contacts")}
          />
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#161622" />
    </View>
  );
};

export default index;
