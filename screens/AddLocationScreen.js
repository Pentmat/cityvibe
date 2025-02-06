import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from 'react-native-ratings';
import styles from '../styles';

const AddLocation = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(3); // Default rating

  const saveLocation = async () => {
    if (!name) {
      Alert.alert("Please enter a location name");
      return;
    }

    const newLocation = { name, description, rating };
    const storedData = await AsyncStorage.getItem('locations');
    const locations = storedData ? JSON.parse(storedData) : [];

    locations.push(newLocation);
    await AsyncStorage.setItem('locations', JSON.stringify(locations));

    navigation.navigate('Locations');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Location</Text>
      <TextInput style={styles.input} placeholder="Location Name" onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Description" onChangeText={setDescription} />
      
      <Text style={{ marginTop: 10 }}>Rate this Location:</Text>
      <AirbnbRating 
        count={5}
        defaultRating={3}
        size={30}
        onFinishRating={(value) => setRating(value)}
      />

      <Button title="Save Location" onPress={saveLocation} />
    </View>
  );
};

export default AddLocation;