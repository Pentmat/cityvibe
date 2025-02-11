import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // To handle navigation

const LocationItem = ({ location }) => {
  const navigation = useNavigation();

  // Navigate to MapScreen and pass location data
  const handleLocationPress = () => {
    navigation.navigate('Map', { location });
  };

  return (
    <TouchableOpacity onPress={handleLocationPress}>
      <View style={styles.card}>
        <Text style={styles.locationName}>{location.name}</Text>
        <Text style={styles.locationDescription}>{location.description}</Text>
        <Text style={styles.locationRating}>Rating: {location.rating}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationDescription: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
  },
  locationRating: {
    fontSize: 14,
    color: '#888',
  },
});

export default LocationItem;
