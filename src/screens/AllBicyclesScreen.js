// AllBicyclesScreen.jsx
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import BicycleCard from "../components/BicycleCard";

const COLORS = {
  primary: "#00BFA6",
  primaryDark: "#00897B",
  background: "#F5F5F7",
  card: "#FFFFFF",
  textMain: "#222222",
  textSecondary: "#666666",
  available: "#2E7D32",
  booked: "#C62828",
};

export default function AllBicyclesScreen({ route, navigation }) {
  const { bicycles } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Bicycles</Text>

      <FlatList
        data={bicycles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BicycleCard
            bike={item}
            colors={COLORS}              // ← add this
            onPress={() => navigation.navigate("Booking", { bike: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
    padding: 16,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
});
