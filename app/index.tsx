import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <View>
      <StatusBar backgroundColor="#000" style="dark" />
      <SafeAreaView>
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
      </SafeAreaView>
    </View>
  );
};

export default index;
