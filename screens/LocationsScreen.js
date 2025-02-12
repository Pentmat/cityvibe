import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { db } from "../firebase/firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AirbnbRating } from "react-native-ratings";
import styles, { GradientBackground } from "../Styles/Styles";

const LocationsScreen = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

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
              <View style={styles.locationItem}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <AirbnbRating count={5} defaultRating={item.rating} size={20} showRating={false} isDisabled />
              </View>
            )}
          />
        )}
      </View>
    </GradientBackground>
  );
};

export default LocationsScreen;
