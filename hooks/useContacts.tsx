// src/hooks/useContacts.ts

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "nanoid";
import { Alert, Linking, ToastAndroid } from "react-native";

export interface ContactType {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  image: string;
  isBookmark: boolean;
  prio: number;
}

export const STORAGE_KEY = "contactify_contact";

const useContacts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [contacts, setContacts] = useState<ContactType[]>([]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const savedContacts = jsonValue != null ? JSON.parse(jsonValue) : [];
      setContacts(savedContacts);
    } catch (error) {
      ToastAndroid.show("Error loading contacts", 3);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const run = async () => {
      await loadContacts();
    };
    run();
  }, []);

  // Save contacts to AsyncStorage
  const saveContacts = async (contacts: ContactType[]) => {
    try {
      const jsonValue = JSON.stringify(contacts);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      await loadContacts();
    } catch (error) {
      ToastAndroid.show("Error saving contacts", 3);
    }
  };

  // Add a new contact
  const addContact = async (contactData: Omit<ContactType, "id">) => {
    try {
      const newContact: ContactType = {
        ...contactData,
        id: "contactify-" + Date.now().toString(),
      };
      const updatedContacts = [...contacts, newContact];
      await saveContacts(updatedContacts);
      ToastAndroid.show("saved", 4);
    } catch (error) {
      throw error;
    }
  };

  const addMultipleContact = async (contactData: ContactType[]) => {
    try {
      const updatedContacts = [...contacts, ...contactData];
      await saveContacts(updatedContacts);
      ToastAndroid.show("Imported", 4);
    } catch (error) {
      throw error;
    }
  };

  // Update an existing contact
  const updateContact = async (updatedContact: ContactType) => {
    try {
      const updatedContacts = contacts.map((contact) =>
        contact.id == updatedContact.id ? updatedContact : contact
      );
      await saveContacts(updatedContacts);
      ToastAndroid.show("saved", 4);
    } catch (error) {
      ToastAndroid.show("Error updating contact", 3);
    }
  };

  // Delete a contact
  const deleteContact = async (id: string) => {
    try {
      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      await saveContacts(updatedContacts);
      ToastAndroid.show("deleted", 4);
    } catch (error) {
      ToastAndroid.show("Error deleting contact", 3);
    }
  };

  const getContactById = (id: string): ContactType | undefined => {
    const contact = contacts.find((contact) => contact.id == id);
    return contact;
  };

  const getBookmarkedContacts = (): ContactType[] | undefined => {
    const contact = contacts.filter((contact) => contact.isBookmark);
    return contact;
  };

  const makeCall = (phoneNumber: string) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneUrl);
        } else {
          Alert.alert(
            "Error",
            "Phone number is not valid or calling is not supported."
          );
        }
      })
      .catch((err) => console.error("An error occurred", err));
    ToastAndroid.show("calling", 4);
  };

  return {
    contacts,
    addContact,
    updateContact,
    deleteContact,
    loadContacts,
    getContactById,
    makeCall,
    getBookmarkedContacts,
    addMultipleContact,
    loading,
  };
};

export default useContacts;
