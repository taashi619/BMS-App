import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function BicycleCard({ bike, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>Bicycle #{bike.number}</Text>
      <Text style={styles.status}>{bike.status}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  status: {
    marginTop: 4,
    color: "#666",
  },
});
