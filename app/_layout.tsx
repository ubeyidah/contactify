import React, { useEffect } from "react";
import "../global.css";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import icons from "@/constants/icons";
import useContacts from "@/hooks/useContacts";
import { useIsFocused } from "@react-navigation/native";

const RootLayout = () => {
  const router = useRouter();
  const { contacts } = useContacts();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (contacts.length <= 0) return router.push("/contacts");
  }, [isFocused]);
  const { id } = useGlobalSearchParams();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]/index"
        options={{
          headerShown: true,
          presentation: "modal",
          title: "Contact Detail",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerTintColor: "white",
          headerRight: () => (
            <View>
              <TouchableOpacity
                onPress={() => id && router.push(`/${id}/update`)}
              >
                <Image
                  source={icons.pencil}
                  resizeMode="contain"
                  className="w-7 h-7"
                  tintColor="#FF9C01"
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="[id]/update"
        options={{
          headerShown: true,
          presentation: "modal",
          title: "Edit Contact",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerTintColor: "white",
          headerRight: () => (
            <View>
              <Image
                source={icons.play}
                resizeMode="contain"
                tintColor="#FF9C01"
                className="w-8 h-8"
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="import/phone"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default RootLayout;
