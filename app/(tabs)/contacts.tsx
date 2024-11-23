import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomInput from "@/components/CustomInput";
import icons from "@/constants/icons";
import useContacts from "@/hooks/useContacts";
import { useIsFocused } from "@react-navigation/native";
import ContactCard from "@/components/ContactCard";
import { SwipeListView } from "react-native-swipe-list-view";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

const ListHeader = () => {
  return (
    <View className="pb-9 pt-2 rounded-b-[40px] mb-4 -mx-3 bg-gray-500/10 px-4">
      <Text className="text-lg text-secondary-200 ml-2 mb-1">Welcome Back</Text>
      <CustomInput
        placeholder="Search"
        className="w-full !rounded-full !py-3"
        icon={icons.search}
        name="search"
        value=""
        onChange={() => {}}
      />
    </View>
  );
};

const Contacts = () => {
  const { contacts, loadContacts } = useContacts();
  const isFocused = useIsFocused();
  const router = useRouter();
  useEffect(() => {
    if (isFocused) {
      loadContacts();
    }
  }, [isFocused]);

  const makeCall = (phoneNumber: string) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneUrl);
        } else {
          Alert.alert(
            "Error",
            "Phone number is not valid or calling is not supported."
          );
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <View>
      <SafeAreaView className="h-screen w-full bg-primary px-3 pb-10">
        <ListHeader />

        <SwipeListView
          data={contacts}
          ListEmptyComponent={() => (
            <View className="flex items-center justify-center h-[70vh] gap-5">
              <Text className="text-2xl font-bold text-slate-400">
                No Contact registerd yet
              </Text>
              <Button
                text="Create One"
                onPress={() => {
                  router.push("/create");
                }}
                className="!rounded-full w-48 !py-3"
              />
            </View>
          )}
          renderItem={({ item }) => <ContactCard key={item.id} {...item} />}
          renderHiddenItem={({ item }) => (
            <View className="flex justify-center h-full">
              <TouchableOpacity
                className="bg-green-500 w-20 h-[95%] rounded-xl flex items-center justify-center"
                onPress={() => makeCall(item.phoneNumber)}
              >
                <Image
                  source={icons.call}
                  className="w-8 h-8"
                  resizeMode="contain"
                  tintColor="white"
                />
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={80}
          rightOpenValue={-75}
          disableLeftSwipe
          closeOnScroll
          closeOnRowBeginSwipe
          closeOnRowPress
          closeOnRowOpen
        />
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#6b72801a" />
    </View>
  );
};

export default Contacts;
