import React from "react";
import "../global.css";
import { Stack } from "expo-router";

const RootLayout = () => {
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
        }}
      />
    </Stack>
  );
};

export default RootLayout;
