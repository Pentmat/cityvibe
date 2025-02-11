import React from "react";
import { createStackNavigator } from "@react-navigation/stack"; // Stack navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Bottom Tab Navigator
import { Ionicons } from "@expo/vector-icons"; // Optional for tab icons
import { Button } from "react-native"; // For Logout Button
import { signOut } from "firebase/auth"; // For Firebase sign-out
import { auth } from "../firebase/firebaseConfig"; // Firebase config

// Import Screens
import LoginScreen from "../screens/LoginScreen";
import LocationsScreen from "../screens/LocationsScreen";
import AddLocationScreen from "../screens/AddLocationScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tab Navigator
const AppTabs = ({ navigation }) => {
  return (
    <Tab.Navigator>
      {/* Locations tab */}
      <Tab.Screen 
        name="Locations" 
        component={LocationsScreen} 
        options={{
          tabBarIcon: () => <Ionicons name="location" size={20} /> // Optional icon
        }}
      />
      {/* Add Location tab */}
      <Tab.Screen 
        name="Add Location" 
        component={AddLocationScreen} 
        options={{
          tabBarIcon: () => <Ionicons name="add-circle" size={20} /> // Optional icon
        }}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen} 
        options={{ headerShown: false }} // Hide header on LoginScreen
      />
      {/* Stack Screen for AppTabs to handle the bottom tabs */}
      <Stack.Screen 
        name="AppTabs" 
        component={AppTabs} 
        options={({ navigation }) => ({
          title: "Home",
          headerLeft: () => (
            <Button 
              title="Profile" 
              onPress={() => {}}
            />
          ),
          headerRight: () => (
            <Button 
              title="Logout" 
              onPress={() => {
                signOut(auth)
                  .then(() => {
                    // Successfully logged out, navigate to LoginScreen
                    navigation.replace("LoginScreen");
                  })
                  .catch((error) => {
                    console.error(error.message);
                  });
              }} 
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
