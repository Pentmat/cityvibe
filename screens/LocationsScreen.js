import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { firestore } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

const LocationsScreen = () => {
  const [locations, setLocations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        console.log("Fetching locations..."); // Debugging log
        const querySnapshot = await getDocs(collection(firestore, "locations"));
  
        if (querySnapshot.empty) {
          console.log("No locations found in Firestore.");
        }
  
        const locationsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        console.log("Fetched locations:", locationsList); // Debugging log
        setLocations(locationsList);
      } catch (error) {
        console.error("Error fetching locations:", error);
        Alert.alert("Error", "Failed to fetch locations. Check Firestore setup.");
      }
    };
  
    fetchLocations();
  }, []);

  // Handle navigation to the map screen
  const handleNavigateToMap = (location) => {
    navigation.navigate('Map', { location });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => handleNavigateToMap(item)}
    >
      <Text style={styles.locationName}>{item.name}</Text>
      <Text style={styles.locationDescription}>{item.description}</Text>
      <Text style={styles.locationRating}>Rating: {item.rating}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {locations.length === 0 ? (
        <Text style={styles.emptyText}>No locations available.</Text>
      ) : (
        <FlatList
          data={locations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  locationItem: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  locationRating: {
    fontSize: 14,
    color: '#888',
  },
});

export default LocationsScreen;
