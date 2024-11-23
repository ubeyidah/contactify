import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomInput from "@/components/CustomInput";
import icons from "@/constants/icons";
import useContacts, { ContactType } from "@/hooks/useContacts";
import { useIsFocused } from "@react-navigation/native";
import ContactCard from "@/components/ContactCard";
import { SwipeListView } from "react-native-swipe-list-view";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

const ListHeader = ({
  handleChange,
  value,
}: {
  handleChange: (val: string, name: string) => void;
  value: String;
}) => {
  return (
    <View className="pb-6 pt-2 rounded-b-3xl mb-4 -mx-3 bg-gray-500/10 px-4">
      <Text className="text-lg text-secondary-200 ml-2 mb-1">Welcome Back</Text>
      <CustomInput
        placeholder="Search"
        className="w-full !rounded-2xl !py-3"
        icon={icons.search}
        name="search"
        value={value as string}
        onChange={handleChange}
      />
    </View>
  );
};

const Contacts = () => {
  let { contacts, loadContacts, makeCall, loading } = useContacts();
  const [searchText, setSearchText] = useState<string>("");
  const [contactsToDisplay, setContactsToDisplay] = useState<ContactType[]>([]);
  const router = useRouter();
  const isFocused = useIsFocused();
  useEffect(() => {
    setSearchText("");
    loadContacts();
    setContactsToDisplay([]);
  }, [isFocused]);

  const handleSearch = (val: string, name: string) => {
    setSearchText(() => val);
  };

  useEffect(() => {
    const matchText = searchText.toLowerCase();
    const filteredContacts = contacts.filter((contact) => {
      const name = contact.firstName.toLowerCase();
      const lastName = contact.lastName.toLowerCase();
      const phoneNumber = contact.phoneNumber;
      return (
        name.includes(matchText) ||
        name.startsWith(matchText) ||
        lastName.includes(matchText) ||
        lastName.startsWith(matchText) ||
        phoneNumber.includes(matchText)
      );
    });
    setContactsToDisplay(filteredContacts);
  }, [searchText, isFocused]);
  return (
    <SafeAreaView className="h-screen w-full bg-primary px-3 pb-10">
      <ListHeader handleChange={handleSearch} value={searchText} />

      {loading ? (
        <View className="flex items-center justify-center h-full">
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <SwipeListView
          data={
            contactsToDisplay.length == 0 && !searchText
              ? contacts
              : contactsToDisplay
          }
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
                className="!rounded-lg !w-40 !py-4"
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
      )}
      <StatusBar style="light" backgroundColor="#6b72801a" />
    </SafeAreaView>
  );
};

export default Contacts;
