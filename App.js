import "react-native-gesture-handler"; 
import React from "react";
import { NavigationContainer } from "@react-navigation/native"; 
import AppNavigator from "./navigation/AppNavigator"; 


// Main App Component
export default function App() {
  return (
    
    <NavigationContainer> 
      <AppNavigator /> {/* This will render your stack navigator */}
    </NavigationContainer>
    
  );
}
