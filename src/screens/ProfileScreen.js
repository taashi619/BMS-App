import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john@student.edu</Text>

      <Text style={styles.section}>Booking History</Text>
      <Text style={styles.text}>No bookings yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
  },
  email: {
    color: "#666",
    marginBottom: 30,
  },
  section: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  text: {
    color: "#666",
  },
});
