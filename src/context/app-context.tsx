"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useFirebase,
  useUser,
  initiateEmailSignIn,
  initiateEmailSignUp,
  setDocumentNonBlocking,
  addDocumentNonBlocking,
  updateDocumentNonBlocking,
  deleteDocumentNonBlocking,
  useCollection,
  useDoc,
  useMemoFirebase,
} from '@/firebase';
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  runTransaction,
} from 'firebase/firestore';
import countries from '@/lib/countries.json';
import { useToast } from '@/hooks/use-toast';

// Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  createdAt?: any;
}

export type Country = {
  name: string;
  code: string;
  currency: string;
  currency_symbol: string;
};

export interface Property {
  id: string;
  userId: string;
  title: string;
  address: string;
  country: string;
  city: string;
  area: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  hasGas: boolean;
  hasElectricity: boolean;
  phone: string;
  whatsapp: string;
  image: string;
  createdAt?: any;
  updatedAt?: any;
}

// Context Type
interface AppContextType {
  user: UserProfile | null;
  properties: Property[];
  isLoading: boolean;
  login: (email: string, pass: string) => void;
  signup: (name: string, email: string, pass: string) => void;
  logout: () => void;
  addProperty: (propertyData: Omit<Property, 'id' | 'userId'>) => Promise<void>;
  updateProperty: (propertyData: Property) => Promise<void>;
  deleteProperty: (propertyId: string) => void;
  updateUser: (userData: Partial<UserProfile>) => void;
  getCountryByName: (name: string) => Country | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth, firestore } = useFirebase();
  const { user: authUser, isUserLoading: isAuthLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const userDocRef = useMemoFirebase(
    () => (authUser ? doc(firestore, 'users', authUser.uid) : null),
    [firestore, authUser]
  );
  const { data: user, isLoading: isUserLoading } = useDoc<UserProfile>(userDocRef);

  const propertiesCollection = useMemoFirebase(
    () => collection(firestore, 'properties'),
    [firestore]
  );

  const { data: properties, isLoading: isPropertiesLoading } = useCollection<Property>(propertiesCollection);
  
  const isLoading = isAuthLoading || isUserLoading || isPropertiesLoading;

  useEffect(() => {
    if (!isAuthLoading && authUser && !user && !isUserLoading) {
        // New user signed up, create their profile
        const newUserProfile: UserProfile = {
            id: authUser.uid,
            email: authUser.email || '',
            name: authUser.displayName || 'New User',
            profilePicture: authUser.photoURL || `https://picsum.photos/seed/${authUser.uid}/200/200`,
            createdAt: serverTimestamp(),
        };
        const newUserDocRef = doc(firestore, 'users', authUser.uid);
        setDocumentNonBlocking(newUserDocRef, newUserProfile, {});
    }
  }, [authUser, user, isAuthLoading, isUserLoading, firestore]);
  
  const login = (email: string, pass: string) => {
    initiateEmailSignIn(auth, email, pass);
  };

  const signup = (name: string, email: string, pass: string) => {
    // Firebase auth user will be created first, then our useEffect will create the firestore doc
    initiateEmailSignUp(auth, email, pass);
  };

  const logout = () => {
    auth.signOut();
    router.push('/');
  };

  const addProperty = async (propertyData: Omit<Property, 'id' | 'userId'>) => {
    if (!user) throw new Error("User not authenticated");
    const newProperty = {
      ...propertyData,
      userId: user.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await addDocumentNonBlocking(propertiesCollection, newProperty);
  };

  const updateProperty = async (propertyData: Property) => {
    const propertyRef = doc(firestore, 'properties', propertyData.id);
    const dataToUpdate = {
      ...propertyData,
      updatedAt: serverTimestamp(),
    };
    await updateDocumentNonBlocking(propertyRef, dataToUpdate);
  };

  const deleteProperty = (propertyId: string) => {
    const propertyRef = doc(firestore, 'properties', propertyId);
    deleteDocumentNonBlocking(propertyRef);
  };
  
  const updateUser = (userData: Partial<UserProfile>) => {
    if(!user) return;
    const userRef = doc(firestore, 'users', user.id);
    setDocumentNonBlocking(userRef, userData, { merge: true });
  };
  
  const getCountryByName = (name: string) => {
    if(!name) return undefined;
    return countries.find(c => c.name.toLowerCase() === name.toLowerCase());
  }

  return (
    <AppContext.Provider value={{ user, properties: properties || [], isLoading, login, signup, logout, addProperty, updateProperty, deleteProperty, updateUser, getCountryByName }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
￼Enter
