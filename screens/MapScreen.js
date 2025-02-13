import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";

const MapScreen = () => {
  const route = useRoute();
  const placeName = route.params?.placeName || "Äänekoski, Pub markus"; // Default location

  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState(null);

  // Fetch coordinates from OpenStreetMap (Nominatim API)
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            placeName
          )}&format=json`,
          {
            headers: {
              "User-Agent": "MyApp/1.0 (contact@myapp.com)", // Custom User-Agent
              "Accept-Language": "en",
            },
          }
        );

        const data = await response.json();

        if (data.length > 0) {
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
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [placeName]);

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
                  var map = L.map('map').setView([${coordinates.latitude}, ${coordinates.longitude}], 13);
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                  }).addTo(map);
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
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Location not found
        </Text>
      )}
    </View>
  );
};

export default MapScreen;
