import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { db } from "../firebase/firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AirbnbRating } from "react-native-ratings";
import styles, { GradientBackground } from "../Styles/Styles";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { Ionicons } from "@expo/vector-icons";

const LocationsScreen = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Hook to navigate

  useEffect(() => {
    const fetchLocations = () => {
      const user = getAuth().currentUser;
      if (!user) return;

      const locationsRef = collection(db, "users", user.uid, "locations");
      const q = query(locationsRef);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const locationsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLocations(locationsList);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    fetchLocations();
  }, []);

  if (loading) {
    return (
      <GradientBackground>
        <View style={styles.container}>
          <Text style={styles.title}>Loading locations...</Text>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
    <View style={styles.containerLocations}>
      {locations.length === 0 ? (
        <Text style={styles.title}>No locations found.</Text>
      ) : (
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Map", { placeName: item.name })} // Navigate to MapScreen with placeName
              style={styles.locationItem}
            >
              <View style={styles.titleRow}>
                <Text style={styles.title}>{item.name}</Text>
                <Ionicons name="location-outline" style={styles.mapIcon} />
              </View>
              <Text style={styles.description}>{item.description}</Text>
              <AirbnbRating count={5} defaultRating={item.rating} size={20} showRating={false} isDisabled />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  </GradientBackground>
  );
};

export default LocationsScreen;
