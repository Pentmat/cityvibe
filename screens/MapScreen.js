import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";

// MapScreen Component - Displays a map with the location marker
const MapScreen = () => {
  const route = useRoute();

  // Get the place name from navigation parameters or set a default location
  const placeName = route.params?.placeName || "Äänekoski, Pub markus";

  const [loading, setLoading] = useState(true); // State for loading indicator
  const [coordinates, setCoordinates] = useState(null); // State to store fetched coordinates

  // Fetch coordinates using OpenStreetMap (Nominatim API)
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            placeName
          )}&format=json`,
          {
            headers: {
              "User-Agent": "MyApp/1.0 (contact@myapp.com)", // Custom User-Agent for API request
              "Accept-Language": "en",
            },
          }
        );

        const data = await response.json();

        if (data.length > 0) {
          // Extract latitude and longitude from API response
          setCoordinates({
            latitude: data[0].lat,
            longitude: data[0].lon,
          });
        } else {
          console.error("Location not found");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      } finally {
        setLoading(false); // Hide loading indicator after fetching data
      }
    };

    fetchCoordinates();
  }, [placeName]); // Runs whenever the placeName changes

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading location...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {coordinates ? (
        // Display interactive map using Leaflet inside a WebView
        <WebView
          style={{ flex: 1 }}
          source={{
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
              </head>
              <body>
                <div id="map" style="width: 100%; height: 100vh;"></div>
                <script>
                  // Initialize map with fetched coordinates
                  var map = L.map('map').setView([${coordinates.latitude}, ${coordinates.longitude}], 13);
                  
                  // Add OpenStreetMap tiles to the map
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                  }).addTo(map);
                  
                  // Add a marker at the given coordinates with a popup
                  L.marker([${coordinates.latitude}, ${coordinates.longitude}]).addTo(map)
                    .bindPopup('${placeName}')
                    .openPopup();
                </script>
              </body>
              </html>
            `,
          }}
        />
      ) : (
        // Display message if location is not found
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Location not found
        </Text>
      )}
    </View>
  );
};

export default MapScreen;
