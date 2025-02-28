import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Define primary theme colors
export const COLORS = {
  background: "#F8F8F9", // White Lilac
  primary: "#111439", // Dark Blue
  gradientStart: "#111439", // Start of gradient (Dark Blue)
  gradientEnd: "#3A3D8C", // End of gradient (Lighter Blue)
  text: "#FFFFFF", // White text for contrast
  accent: "#FF8C42", // Accent color for buttons/highlights
};

// Reusable styles for all screens
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },

  containerLocations: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20, 
  },
  
  locationItem: {
    backgroundColor: "#fff", // White background
    borderRadius: 10, // Rounded corners
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
    flexDirection: "column",
  },
  
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  
  description: {
    fontSize: 14,
    color: "gray",
    marginVertical: 5,
  },
  
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  
  star: {
    marginRight: 3,
  },
  
  mapIcon: {
    color: "red",
    fontSize: 22,
  },

  gradientBackground: {
    flex: 1,
  },
  input: {
    width: "90%",
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  locationItem: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: "95%",
  },

  emptySpace: {

    height: 25,
  },

  deleteButton: {
    padding: 10,
    alignSelf: "right",
  },

  flag: {
    width: 80, // Increase size
    height: 50,
    borderRadius: 5,
    backgroundColor: "#f0f0f0", // Helps debug visibility
  },

});

// Gradient Wrapper Component
export const GradientBackground = ({ children }) => (
  <LinearGradient
    colors={[COLORS.gradientStart, COLORS.gradientEnd]}
    style={styles.gradientBackground}
  >
    {children}
  </LinearGradient>
);

export default styles;
