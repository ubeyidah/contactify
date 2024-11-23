import {
  ActivityIndicator,
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import useContacts from "@/hooks/useContacts";
import icons from "@/constants/icons";
import Button from "@/components/Button";

const index = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const { getContactById, makeCall, updateContact, deleteContact, loading } =
    useContacts();
  const contactDetail = getContactById(id);
  const router = useRouter();
  const font = 30;

  if (!contactDetail) {
    return (
      <View className="flex items-center justify-center h-screen bg-primary">
        <Text className="text-lg text-secondary-100">
          Contact Detail Not Found it might be wrong id
        </Text>
        <StatusBar style="light" backgroundColor="#161622" />
      </View>
    );
  }
  const tintColor = contactDetail?.isBookmark ? "#FF9C01" : "white";

  const bookmarkContact = () => {
    updateContact({
      ...contactDetail,
      isBookmark: !contactDetail?.isBookmark,
      id: contactDetail.id.toString(),
    });
  };

  const removeContact = () => {
    Alert.alert(
      "Delete contact",
      "Are you sure do you want to delete this contact permanently?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes, I'm sure",
          onPress: () => {
            deleteContact(contactDetail.id as string);
            router.push("/contacts");
          },
          style: "default",
        },
      ]
    );
  };
  return (
    <View className="h-full bg-primary px-4 ">
      <ScrollView>
        <SafeAreaView className="h-[101vh] pb-4 flex justify-between">
          <View>
            {contactDetail.image && (
              <Image
                source={{ uri: contactDetail?.image }}
                className="rounded-lg aspect-video"
                resizeMode="cover"
              />
            )}
            {!contactDetail.image && (
              <View
                className={`aspect-video rounded-lg bg-secondary-100 flex items-center justify-center`}
              >
                <Text
                  className="text-white capitalize"
                  style={{ fontSize: font }}
                >
                  {contactDetail.firstName}
                </Text>
                <Text
                  className="text-white capitalize"
                  style={{ fontSize: font }}
                >
                  {contactDetail.lastName}
                </Text>
              </View>
            )}

            <View className="mt-4">
              <DataList text={contactDetail.firstName} icon={icons.profile} />
              <DataList
                text={contactDetail.lastName}
                icon={icons.profile}
                isCenter={true}
              />
              <DataList text={contactDetail.phoneNumber} icon={icons.call} />
            </View>

            <View className="flex flex-row gap-4 mt-5">
              <TouchableOpacity
                className="bg-green-500 flex-[4] py-6 rounded-xl flex items-center justify-center"
                onPress={() => makeCall(contactDetail.phoneNumber)}
                activeOpacity={0.7}
              >
                <Image
                  source={icons.call}
                  className="w-8 h-8"
                  resizeMode="contain"
                  tintColor="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                className={`bg-gray-500/20 flex-1 py-6 rounded-xl flex items-center justify-center ${
                  contactDetail.isBookmark ? "bg-secondary/20" : ""
                }`}
                onPress={bookmarkContact}
                activeOpacity={0.7}
              >
                <Image
                  source={icons.bookmark}
                  className="w-8 h-8"
                  resizeMode="contain"
                  tintColor={tintColor}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Button
              text="DELETE"
              className="!bg-red-800 mt-auto"
              textClass="text-white"
              onPress={removeContact}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </View>
  );
};

export default index;

function DataList({
  text,
  icon,
  isCenter,
}: {
  text: string;
  icon: ImageSourcePropType;
  isCenter?: boolean;
}) {
  return (
    <View
      className={`flex items-center gap-3 flex-row border-t border-b p-4 border-gray-100/15 ${
        isCenter ? "!border-b-0 border-transparent" : ""
      }`}
    >
      <Image
        source={icon}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#FF9C01"
      />
      <Text className="text-white text-xl capitalize border-l px-2 border-gray-100/15">
        {text}
      </Text>
    </View>
  );
}
