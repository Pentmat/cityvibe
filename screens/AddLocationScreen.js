import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddLocationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Add Locations Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});

export default AddLocationsScreen;
