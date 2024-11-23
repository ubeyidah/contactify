// src/hooks/useContacts.ts

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "nanoid";

export interface ContactType {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  image: string;
  isBookmark: boolean;
  prio: number;
}

const STORAGE_KEY = "contactify_contact";

const useContacts = () => {
  const [contacts, setContacts] = useState<ContactType[]>([]);

  // Load contacts from AsyncStorage on mount
  const loadContacts = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const savedContacts = jsonValue != null ? JSON.parse(jsonValue) : [];
      setContacts(savedContacts);
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // Save contacts to AsyncStorage
  const saveContacts = async (contacts: ContactType[]) => {
    try {
      const jsonValue = JSON.stringify(contacts);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      loadContacts();
      setContacts(contacts);
    } catch (error) {
      console.error("Error saving contacts:", error);
    }
  };

  // Add a new contact
  const addContact = async (contactData: Omit<ContactType, "id">) => {
    const newContact: ContactType = {
      ...contactData,
      id: contacts.length + 1 || 0, // Generate a unique ID
    };

    const updatedContacts = [...contacts, newContact];
    await saveContacts(updatedContacts);
    loadContacts();
    setContacts(updatedContacts);
  };

  // Update an existing contact
  const updateContact = async (updatedContact: ContactType) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    await saveContacts(updatedContacts);
    loadContacts();
  };

  // Delete a contact
  const deleteContact = async (id: number) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    await saveContacts(updatedContacts);
    loadContacts();
  };

  return {
    contacts,
    addContact,
    updateContact,
    deleteContact,
    loadContacts,
  };
};

export default useContacts;
