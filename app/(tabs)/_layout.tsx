import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "@/constants/icons";

const BarIcon = ({
  color,
  focused,
  icon,
  name,
}: {
  color: string;
  focused: boolean;
  icon: any;
  name: string;
}) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-bold" : ""} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 64,
        },
      }}
    >
      <Tabs.Screen
        name="contacts"
        options={{
          headerShown: false,
          title: "Contact",
          tabBarIcon: ({ color, focused }) => {
            return (
              <BarIcon
                color={color}
                focused={focused}
                icon={icons.call}
                name="Contacts"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          headerShown: false,
          title: "Bookmark",
          tabBarIcon: ({ color, focused }) => {
            return (
              <BarIcon
                color={color}
                focused={focused}
                icon={icons.bookmark}
                name="Bookmark"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          title: "Create",
          tabBarIcon: ({ color, focused }) => {
            return (
              <BarIcon
                color={color}
                focused={focused}
                icon={icons.plus}
                name="Create"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ color, focused }) => {
            return (
              <BarIcon
                color={color}
                focused={focused}
                icon={icons.settings}
                name="Settings"
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default _layout;
