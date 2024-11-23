import {
  View,
  Text,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import useContacts, { ContactType } from "@/hooks/useContacts";
import FilePicker from "@/components/FilePicker";
import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import icons from "@/constants/icons";

const errorObj = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};
const update = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const { getContactById, updateContact } = useContacts();
  const contactDetail = getContactById(id);
  const router = useRouter();

  const data = {
    id: contactDetail?.id as string,
    firstName: contactDetail?.firstName as string,
    lastName: contactDetail?.lastName as string,
    phoneNumber: contactDetail?.phoneNumber as string,
    prio: contactDetail?.prio as number,
    image: contactDetail?.image as string,
    isBookmark: contactDetail?.isBookmark as boolean,
  };

  const [contactToUpdate, setcontactToUpdate] = useState<ContactType>(data);
  const [errors, setErrors] = useState(errorObj);
  const [canValidate, setCanValidate] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setcontactToUpdate(data);
  }, [contactDetail]);

  const onChange = (value: string, name: string) => {
    setcontactToUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const revalidateForm = () => {
    let hasError = false;
    if (!contactToUpdate.firstName || contactToUpdate.firstName.length < 3) {
      setErrors((prev) => ({
        ...prev,
        firstName: "First name must be at least 3 characters long",
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, firstName: "" }));
    }
    if (!contactToUpdate.lastName || contactToUpdate.lastName.length < 3) {
      setErrors((prev) => ({
        ...prev,
        lastName: "Last name must be at least 3 characters long",
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, lastName: "" }));
    }
    if (
      !contactToUpdate.phoneNumber ||
      contactToUpdate.phoneNumber.length < 10 ||
      contactToUpdate.phoneNumber.length >= 16
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
  }, [contactToUpdate]);

  const onSave = async () => {
    setCanValidate(true);
    const hasError = revalidateForm();
    if (hasError) return;
    try {
      setLoading(true);
      await updateContact(contactToUpdate);
      router.push("/contacts");
    } catch (error) {
      ToastAndroid.show("Couldn't register contact", 3);
      console.log(
        "Couldn't register contact please try again later :  " + error
      );
    } finally {
      setLoading(false);
    }
  };

  const revert = () => {
    setcontactToUpdate(data);
  };

  return (
    <View className="h-full bg-primary px-5">
      <ScrollView>
        <SafeAreaView className="h-[92vh] flex justify-between">
          <View>
            <View className="mt-8">
              <FilePicker
                name="image"
                onChange={onChange}
                uri={contactToUpdate.image}
              />
            </View>
            <View className="flex gap-8 mt-10">
              <CustomInput
                placeholder="First Name"
                icon={icons.profile}
                value={contactToUpdate.firstName}
                onChange={onChange}
                name="firstName"
                error={errors.firstName}
              />
              <CustomInput
                placeholder="Last Name"
                icon={icons.profile}
                value={contactToUpdate.lastName}
                onChange={onChange}
                name="lastName"
                error={errors.lastName}
              />
              <CustomInput
                placeholder="Phone Number"
                type="numeric"
                icon={icons.call}
                value={contactToUpdate.phoneNumber}
                onChange={onChange}
                name="phoneNumber"
                error={errors.phoneNumber}
              />
            </View>
            <View className="mt-10 mb-10 flex items-center flex-row justify-between gap-3">
              <Button
                text="Update"
                className="flex-[3] !rounded-xl"
                onPress={onSave}
                loading={loading}
              />
              <Button
                text="Revert"
                className="flex-1 bg-slate-500/30 !rounded-xl"
                onPress={revert}
                textClass="text-white"
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </View>
  );
};

export default update;
