import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AirbnbRating } from "react-native-ratings";
import styles, { GradientBackground } from "../Styles/Styles";

const AddLocationsScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(3);

  const handleAddLocation = async () => {
    if (!name || !description) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    const user = getAuth().currentUser;
    if (!user) {
      Alert.alert("Error", "You must be logged in to add a location");
      return;
    }

    try {
      const locationsRef = collection(db, "users", user.uid, "locations");
      await addDoc(locationsRef, { name, description, rating });

      setName("");
      setDescription("");
      setRating(3);

      Alert.alert("Success", "Location added successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to add location.");
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Add a New Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Location Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <AirbnbRating count={5} defaultRating={3} size={30} showRating={false} onFinishRating={setRating} />
         {/* Empty space*/}
         <View style={styles.emptySpace} />
        <Button title="Add Location" onPress={handleAddLocation} color={styles.button.backgroundColor} />
      </View>
    </GradientBackground>
  );
};

export default AddLocationsScreen;
