import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, ActivityIndicator } from "react-native";
import styles from "../Styles/Styles";

// Component to display a list of countries and their capitals
const CapitalsScreen = () => {
  // State to manage search input
  const [searchQuery, setSearchQuery] = useState("");
  // State to store the full list of countries
  const [countries, setCountries] = useState([]);
  // State to store filtered countries based on search
  const [filteredCountries, setFilteredCountries] = useState([]);
  // State to manage loading indicator
  const [loading, setLoading] = useState(true);

  // Fetch country data when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all"); // Fetch data from API
        const data = await response.json();
        setCountries(data); // Store full list of countries
        setFilteredCountries(data); // Initially set filtered list to all countries
      } catch (error) {
        console.error("Error fetching country data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchCountries();
  }, []);

  // Function to handle search input and filter the list of countries
  const handleSearch = (text) => {
    setSearchQuery(text);

    // If search query is empty, show all countries
    if (text.trim() === "") {
      setFilteredCountries(countries);
      return;
    }

    // Filter countries based on name or capital
    const filtered = countries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(text.toLowerCase()) || // Match country name
        (country.capital && country.capital[0].toLowerCase().includes(text.toLowerCase())) // Match capital name
    );

    setFilteredCountries(filtered);
  };

  // Show loading indicator while data is being fetched
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.title}>Loading country data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search input field */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by country or capital..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Display list of countries */}
      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item.cca3}
        renderItem={({ item }) => (
          <View style={styles.countryItem}>
            <Image
              source={{ uri: item.flags?.png || "https://via.placeholder.com/50" }}
              style={styles.flag}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.title}>{item.name.common}</Text>
              <Text style={styles.description}>Capital: {item.capital ? item.capital[0] : "N/A"}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CapitalsScreen;
