import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({ user, onLogout }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.leftButton}>
        <Icon name="account-circle" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{user.displayName}</Text>
      <TouchableOpacity style={styles.rightButton} onPress={onLogout}>
        <Icon name="exit-to-app" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6200ea',
    paddingHorizontal: 20,
    height: 60,
  },
  leftButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  rightButton: {
    padding: 5,
  },
});

export default Header;