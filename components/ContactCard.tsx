import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ContactType } from "@/hooks/useContacts";

import { useRouter } from "expo-router";

const ContactCard = ({ image, firstName, id, lastName }: ContactType) => {
  const font = 30;
  const router = useRouter();
  const gotoDetail = (id: string) => {
    router.push(`/${id}`);
  };
  return (
    <TouchableOpacity onLongPress={() => gotoDetail(id)} activeOpacity={0.8}>
      <View className="w-full aspect-video my-1.5 relative overflow-hidden">
        {image && (
          <Image
            source={{ uri: image }}
            className="w-full h-full  rounded-lg"
            resizeMode="cover"
          />
        )}
        {!image && (
          <View
            className={`w-full h-full rounded-lg bg-secondary-100 flex items-center justify-center`}
          >
            <Text className="text-white capitalize" style={{ fontSize: font }}>
              {firstName}
            </Text>
            <Text className="text-white capitalize" style={{ fontSize: font }}>
              {lastName}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ContactCard;
