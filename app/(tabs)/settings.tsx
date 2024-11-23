import { View, Text, ScrollView, FlatList } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Contacts from "expo-contacts";

const settings = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync();

        if (data.length > 0) {
          const ct = data.map((co) => {
            return {
              id: co.id,
              firstName: co.name,
              lastName: co.firstName,
              phoneNumber: co.phoneNumbers,
              image: co.image,
            };
          });
          setContacts(ct);
        }
      }
    })();
  }, []);
  return (
    <View className="h-full w-full bg-primary px-3">
      <SafeAreaView>
        <FlatList
          data={contacts}
          renderItem={(item) => {
            console.log(item.item.image);

            return (
              item.item.phoneNumber && (
                <View
                  className="border-b bg-gray-400/20 p-2 rounded-md my-1 flex flex-row gap-2 "
                  key={item.index}
                >
                  <View className=" flex items-center justify-center  w-16 h-16  bg-black-100  rounded-full">
                    <Text className="text-white text-lg">
                      {item.item.firstName[0] || 0}
                    </Text>
                  </View>
                  <View>
                    <View className="flex-row flex ">
                      <Text className="text-white">
                        {item.item.firstName || 0} -{" "}
                      </Text>
                      <Text className="text-white">
                        {item.item.lastName || 0}
                      </Text>
                    </View>
                    <Text className="text-white">
                      {item.item.phoneNumber[0].number}
                    </Text>
                  </View>
                </View>
              )
            );
          }}
          keyExtractor={({ item, i }) => i}
        />
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#161622" />
    </View>
  );
};

export default settings;
