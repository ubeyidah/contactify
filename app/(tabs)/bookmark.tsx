import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { SwipeListView } from "react-native-swipe-list-view";
import useContacts from "@/hooks/useContacts";
import ContactCard from "@/components/ContactCard";
import icons from "@/constants/icons";
import { useIsFocused } from "@react-navigation/native";

const bookmakr = () => {
  const { getBookmarkedContacts, makeCall, loadContacts, loading } =
    useContacts();
  const bookmarkedContacts = getBookmarkedContacts();
  const isFocused = useIsFocused();
  useEffect(() => {
    loadContacts();
  }, [isFocused]);
  return (
    <View className="h-full w-full bg-primary pb-36">
      <SafeAreaView>
        <View className="flex items-end flex-row gap-4 justify-between py-3 pt-5 mb-2 bg-gray-500/10 rounded-b-xl px-4">
          <View className="flex items-center flex-row gap-4">
            <Image
              source={icons.bookmark}
              className="w-6 h-6"
              resizeMode="contain"
              tintColor="#FF9C01"
            />
            <Text className="text-xl font-bold text-secondary">
              Your Favorite Contacts
            </Text>
          </View>
          <Text className="px-3 py-1 bg-secondary/20 text-secondary-100 rounded-xl font-bold text-xl">
            {bookmarkedContacts?.length}
          </Text>
        </View>
        {loading ? (
          <View className="flex items-center justify-center h-full">
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <View className="px-4">
            <SwipeListView
              data={bookmarkedContacts}
              ListEmptyComponent={() => (
                <View className="flex items-center justify-center h-[70vh] gap-5">
                  <Text className="text-2xl font-bold text-slate-400/40 max-w-xs text-center">
                    You don't have bookmarked Contacts yet
                  </Text>
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
          </View>
        )}
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#6b72801a" />
    </View>
  );
};

export default bookmakr;
