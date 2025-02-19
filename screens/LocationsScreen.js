import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity, Alert } from "react-native";
import { db } from "../firebase/firebaseConfig";
import { collection, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AirbnbRating } from "react-native-ratings";
import styles, { GradientBackground } from "../Styles/Styles";
import { useNavigation } from "@react-navigation/native"; 
import { Ionicons } from "@expo/vector-icons";

// Component to display a list of saved locations
const LocationsScreen = () => {
  // State to store locations fetched from Firestore
  const [locations, setLocations] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // Navigation hook for screen navigation
  const navigation = useNavigation();

  // Fetch locations from Firestore when the component mounts
  useEffect(() => {
    const fetchLocations = () => {
      const user = getAuth().currentUser;
      if (!user) return;

      // Reference to the locations collection in Firestore
      const locationsRef = collection(db, "users", user.uid, "locations");
      const q = query(locationsRef);

      // Listen for real-time updates
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const locationsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLocations(locationsList);
        setLoading(false);
      });

      return () => unsubscribe(); // Cleanup listener on unmount
    };

    fetchLocations();
  }, []);

  // Function to handle location deletion
  const handleDelete = async (locationId) => {
    Alert.alert(
      "Delete Location",
      "Are you sure you want to delete this location?",
      [
        { text: "Cancel", style: "cancel" }, // Cancel option
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const user = getAuth().currentUser;
              if (!user) return;

              // Delete the location from Firestore
              await deleteDoc(doc(db, "users", user.uid, "locations", locationId));
              
              // Update state to reflect deletion
              setLocations((prevLocations) =>
                prevLocations.filter((location) => location.id !== locationId)
              );
            } catch (error) {
              console.error("Error deleting location:", error);
            }
          },
        },
      ]
    );
  };

  // Show loading message while data is being fetched
  if (loading) {
    return (
      
        <View style={styles.container}>
          <Text style={styles.title}>Loading locations...</Text>
        </View>
      
    );
  }

  return (
    
      <View style={styles.containerLocations}>
        {/* Show a message if no locations are found */}
        {locations.length === 0 ? (
          <Text style={styles.title}>No locations found.</Text>
        ) : (
          <FlatList
            data={locations}
            keyExtractor={(item) => item.id} // Unique key for each location
            renderItem={({ item }) => (
              <View style={styles.locationItem}>
                {/* Touchable area to navigate to Map screen */}
                <TouchableOpacity
                  onPress={() => navigation.navigate("Map", { placeName: item.name })}
                  style={{ flex: 1 }}
                >
                  <View style={styles.titleRow}>
                    <Text style={styles.title}>{item.name}</Text>
                  </View>
                  <Text style={styles.description}>{item.description}</Text>
                  {/* Display rating using AirbnbRating component */}
                  <AirbnbRating count={5} defaultRating={item.rating} size={20} showRating={false} isDisabled />
                </TouchableOpacity>
                
                {/* Delete button */}
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    
  );
};

export default LocationsScreen;
