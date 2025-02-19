import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebase/firebaseConfig";
import styles from "../Styles/Styles";

// LoginScreen Component - Handles user authentication
const LoginScreen = ({ navigation }) => {
  // State to manage user input for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle login
  const handleLogin = async () => {
    try {
      // Authenticate user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Store user ID in AsyncStorage for persistent login
      await AsyncStorage.setItem("userToken", userCredential.user.uid);
      
      // Navigate to the main app screen (AppTabs)
      navigation.replace("AppTabs");  
    } catch (error) {
      // Show an alert in case of login failure
      Alert.alert("Login Failed", error.message || "Invalid email or password.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Login title */}
      <Text style={styles.title}>Sign In</Text>
      
      {/* Input field for email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Input field for password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Button to trigger login function */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Placeholder for forgot password feature */}
      <TouchableOpacity onPress={() => Alert.alert("Forgot Password", "Feature coming soon!")}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
