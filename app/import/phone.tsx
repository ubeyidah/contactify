import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Contacts from "expo-contacts";
import icons from "@/constants/icons";
import { useRouter } from "expo-router";
import useContacts, { ContactType, STORAGE_KEY } from "@/hooks/useContacts";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/Button";

interface PhoneContactType {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  image: string;
}
const phone = () => {
  const isFocused = useIsFocused();

  const router = useRouter();
  const [contactsToImport, setContactsToImport] = useState<ContactType[]>([]);
  const { addMultipleContact, loadContacts } = useContacts();
  const [contactsFromPhone, setContactsFromPhone] =
    useState<PhoneContactType[]>();
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync();
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const savedContacts = jsonValue != null ? JSON.parse(jsonValue) : [];
        if (data.length > 0) {
          const phoneContacts: any = data.map((co) => {
            if (co.phoneNumbers && co.phoneNumbers?.length > 1) {
              return {
                id: co.id as string,
                firstName: co.name as string,
                lastName: co.firstName as string,
                phoneNumber: co.phoneNumbers[1].number as string,
                image: co.image as string,
              };
            } else {
              return false;
            }
          });

          const phoneNumberList: string[] = savedContacts.map(
            (co: ContactType) => co.phoneNumber
          );

          const filtered: PhoneContactType[] = phoneContacts
            .filter((co: PhoneContactType) => co?.id)
            .filter(
              (contact: ContactType) =>
                !phoneNumberList.includes(contact.phoneNumber)
            );
          setContactsFromPhone(filtered);
        }
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      setContactsToImport([]);
    }
  }, [isFocused]);
  const checkExisitng = (phoneNumber: string): boolean => {
    const phoneNumberLists: string[] = contactsToImport.map(
      (co) => co.phoneNumber
    );
    return phoneNumberLists.includes(phoneNumber);
  };

  const addToImport = (phoneNumber: string) => {
    const isExsisting = checkExisitng(phoneNumber);
    if (isExsisting) {
      setContactsToImport((prev) =>
        prev.filter((contact) => contact.phoneNumber != phoneNumber)
      );
    } else {
      const fullInfo = contactsFromPhone?.find(
        (contact) => contact.phoneNumber == phoneNumber
      );

      if (!fullInfo) return;
      const organizedContact: ContactType = {
        id: "contactify-import-" + Date.now().toString(),
        firstName: fullInfo.firstName,
        lastName: fullInfo.lastName,
        isBookmark: false,
        prio: 0,
        image: fullInfo.image || "",
        phoneNumber: fullInfo.phoneNumber,
      };

      setContactsToImport((prev) => {
        return [...prev, organizedContact];
      });
    }
  };
  const save = () => {
    addMultipleContact(contactsToImport);
    router.push("/contacts");
  };

  return (
    <View className="h-full bg-primary px-4 pb-20">
      <SafeAreaView>
        <View className="flex flex-row items-center justify-between pt-2 pb-4 px-1">
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
            <Image
              source={icons.leftArrow}
              className="w-7 h-5"
              resizeMode="contain"
              tintColor="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={contactsToImport.length <= 0}
            onPress={save}
            className={`px-3 py-1.5 bg-secondary-100/20 rounded-md border-secondary-200/30 border flex flex-row items-center gap-1 ${
              contactsToImport.length <= 0 ? "opacity-30 " : ""
            }`}
          >
            <View className="rounded-full size-6 flex items-center justify-center bg-secondary/40">
              <Text className="text-secondary-200">
                {contactsToImport.length}
              </Text>
            </View>
            <Text className="text-secondary-100">Import</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={contactsFromPhone}
          ListEmptyComponent={() => (
            <View className="flex items-center justify-center h-[60vh] gap-4">
              <Text className="text-center font-bold text-xl text-slate-300/40">
                Noting to Import!
              </Text>
              <Button
                text="Back"
                onPress={() => router.back()}
                className="!rounded-full !max-w-32 !py-3 bg-slate-400/30"
                textClass="text-white"
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              className={`w-full bg-slate-400/10 p-4 my-2 rounded-md border border-gray-200/20 flex flex-row items-center justify-between ${
                checkExisitng(item.phoneNumber) ? "border-secondary-200/50" : ""
              }`}
              key={item.id}
              onPress={() => addToImport(item.phoneNumber)}
            >
              <View>
                <Text className="text-lg text-white font-bold">
                  {item.firstName} {item.lastName}
                </Text>
                <Text className="text-md text-slate-300">
                  {item.phoneNumber}
                </Text>
              </View>
              {checkExisitng(item.phoneNumber) && (
                <View>
                  <Image
                    source={icons.upload}
                    className="w-7 h-7"
                    resizeMode="contain"
                    tintColor="#FF9C01"
                  />
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#161622" />
    </View>
  );
};

export default phone;
