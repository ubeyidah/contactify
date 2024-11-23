import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import Button from "@/components/Button";

const index = () => {
  const router = useRouter();
  return (
    <View>
      <SafeAreaView className="w-full h-full bg-primary text-gray-400 px-4">
        <ScrollView>
          <Text>index</Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eveniet
            accusamus quidem nesciunt enim labore iusto sed, dolorum modi?
            Consequatur dolorem delectus, odit reprehenderit nobis laboriosam
            magni corrupti distinctio id.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/contacts")}
            className="text-center text-blue-600 underline mt-6"
          >
            <Text> Settings</Text>
          </TouchableOpacity>
          <Button text="Get Started" onPress={() => router.push("/contacts")} />
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#161622" />
    </View>
  );
};

export default index;
