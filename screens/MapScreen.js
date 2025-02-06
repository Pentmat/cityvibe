import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from '../styles';

const MapScreen = ({ route }) => {
  const { location } = route.params;
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    fetch(`https://nominatim.openstreetmap.org/search?q=${location.name}&format=json`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setCoordinates({
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon),
          });
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{location.name}</Text>
      {coordinates ? (
        <MapView 
          style={styles.map} 
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker coordinate={coordinates} title={location.name} />
        </MapView>
      ) : (
        <Text>Loading map...</Text>
      )}
    </View>
  );
};

export default MapScreen;
