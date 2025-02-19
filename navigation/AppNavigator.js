import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { getDatabase } from "firebase/database"; 

// Import Screens
import LoginScreen from "../screens/LoginScreen";
import LocationsScreen from "../screens/LocationsScreen";
import AddLocationScreen from "../screens/AddLocationScreen";
import MapScreen from "../screens/MapScreen";
import CapitalsScreen from "../screens/CapitalsScreen";

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tab Navigator containing multiple screens
const AppTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}> 
      {/* Locations Tab */}
      <Tab.Screen 
        name="Locations" 
        component={LocationsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location-outline" size={size} color={color} />
          ),
        }}
      />
      
      {/* Add Location Tab */}
      <Tab.Screen 
        name="Add Location" 
        component={AddLocationScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Map Tab */}
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Capitals Tab */}
      <Tab.Screen 
        name="Capitals" 
        component={CapitalsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator for authentication and main app navigation
const AppNavigator = () => {
  const [username, setUsername] = useState("User"); // Store username from Firestore

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch username from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
          }
        } catch (error) {
          console.error("Error fetching username:", error.message);
        }
      } else {
        setUsername("User"); // Reset username if user logs out
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      {/* Login Screen (no header) */}
      <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen} 
        options={{ headerShown: false }}  
      />

      {/* Main App Tabs with custom header */}
      <Stack.Screen 
        name="AppTabs" 
        component={AppTabs} 
        options={({ navigation }) => ({
          title: username,  // Display username in header
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}} style={{ marginLeft: 15 }}>
              <Ionicons name="person-circle-outline" size={28} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => {
                signOut(auth).then(() => {
                  navigation.replace("LoginScreen"); // Redirect to login screen on sign-out
                }).catch((error) => console.error(error.message));
              }} 
              style={{ marginRight: 15 }}
            >
              <Ionicons name="log-out-outline" size={28} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
