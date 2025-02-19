import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AirbnbRating } from "react-native-ratings";
import styles, { GradientBackground } from "../Styles/Styles";

// Component for adding a new location
const AddLocationsScreen = () => {
  // State variables to store user inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(3); // Default rating

  // Function to handle adding a new location to Firestore
  const handleAddLocation = async () => {
    // Validate that all fields are filled
    if (!name || !description) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    // Get the authenticated user
    const user = getAuth().currentUser;
    if (!user) {
      Alert.alert("Error", "You must be logged in to add a location");
      return;
    }

    try {
      // Reference to the user's locations collection in Firestore
      const locationsRef = collection(db, "users", user.uid, "locations");

      // Add new location data to Firestore
      await addDoc(locationsRef, { name, description, rating });

      // Reset input fields after successful submission
      setName("");
      setDescription("");
      setRating(3);

      // Show success message
      Alert.alert("Success", "Location added successfully!");
    } catch (error) {
      // Show error message if adding location fails
      Alert.alert("Error", "Failed to add location.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Add a New Location</Text>

      {/* Input field for location name */}
      <TextInput
        style={styles.input}
        placeholder="Location Name"
        value={name}
        onChangeText={setName}
      />

      {/* Input field for location description */}
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      {/* Star rating component */}
      <AirbnbRating 
        count={5} 
        defaultRating={3} 
        size={30} 
        showRating={false} 
        onFinishRating={setRating} 
      />

      {/* Empty space for better UI spacing */}
      <View style={styles.emptySpace} />

      {/* Button to submit the location */}
      <Button 
        title="Add Location" 
        onPress={handleAddLocation} 
        color={styles.button.backgroundColor} 
      />
    </View>
  );
};

export default AddLocationsScreen;
