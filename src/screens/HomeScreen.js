import { View, Text, FlatList, StyleSheet } from "react-native";
import BicycleCard from "../components/BicycleCard";

const bicycles = [
  { id: "1", number: 101, status: "Available" },
  { id: "2", number: 102, status: "Booked" },
  { id: "3", number: 103, status: "Available" },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bicycles</Text>

      <FlatList
        data={bicycles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BicycleCard
            bike={item}
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
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
});
