import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import icons from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FilePicker from "@/components/FilePicker";
import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";
import useContacts from "@/hooks/useContacts";
import { useIsFocused } from "@react-navigation/native";

const create = () => {
  const newContactObj = {
    image: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    isBookmark: false,
    prio: 0,
  };
  const errorObj = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };
  const { contacts, addContact, updateContact, deleteContact } = useContacts();

  const [newContact, setNewContact] = useState(newContactObj);
  const [errors, setErrors] = useState(errorObj);
  const [canValidate, setCanValidate] = useState(false);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setCanValidate(false);
      setNewContact(newContactObj);
      setErrors(errorObj);
    }
  }, [isFocused]);

  const revalidateForm = () => {
    let hasError = false;
    if (!newContact.firstName || newContact.firstName.length < 3) {
      setErrors((prev) => ({
        ...prev,
        firstName: "First name must be at least 3 characters long",
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, firstName: "" }));
    }
    if (!newContact.lastName || newContact.lastName.length < 3) {
      setErrors((prev) => ({
        ...prev,
        lastName: "Last name must be at least 3 characters long",
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, lastName: "" }));
    }
    if (
      !newContact.phoneNumber ||
      newContact.phoneNumber.length < 10 ||
      newContact.phoneNumber.length >= 16
    ) {
      setErrors((prev) => ({ ...prev, phoneNumber: "Invalid phone number" }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, phoneNumber: "" }));
    }

    return hasError;
  };

  useEffect(() => {
    if (canValidate) {
      revalidateForm();
    }
  }, [newContact]);

  const onChange = (value: string, name: string) => {
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };
  const onSave = async () => {
    setCanValidate(true);
    const hasError = revalidateForm();
    if (hasError) return;
    try {
      setLoading(true);
      await addContact(newContact);
      setCanValidate(false);
      setNewContact(newContactObj);
      setErrors(errorObj);
    } catch (error) {
      alert("Couldn't register contact please try again later :  " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="h-full w-full bg-primary">
      <SafeAreaView>
        <ScrollView className="px-5">
          <Text className="text-left text-secondary-100 font-semibold text-3xl mt-16">
            New contact
          </Text>
          <View className="mt-8">
            <FilePicker
              name="image"
              onChange={onChange}
              uri={newContact.image}
            />
          </View>
          <View className="flex gap-8 mt-10">
            <CustomInput
              placeholder="First Name"
              icon={icons.profile}
              value={newContact.firstName}
              onChange={onChange}
              name="firstName"
              error={errors.firstName}
            />
            <CustomInput
              placeholder="Last Name"
              icon={icons.profile}
              value={newContact.lastName}
              onChange={onChange}
              name="lastName"
              error={errors.lastName}
            />
            <CustomInput
              placeholder="Phone Number"
              type="numeric"
              icon={icons.call}
              value={newContact.phoneNumber}
              onChange={onChange}
              name="phoneNumber"
              error={errors.phoneNumber}
            />
          </View>
          <Button
            text="Save "
            className="mt-10 mb-10"
            onPress={onSave}
            loading={loading}
          />
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#161622" />
    </View>
  );
};

export default create;
