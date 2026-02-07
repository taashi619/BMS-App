import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import BicycleCard from "../components/BicycleCard";
import { COLORS, SPACING } from "../constants/theme";

export default function AllBicyclesScreen({ route, navigation }) {
  const { bicycles } = route.params;

  const handlePressBike = (bike) => {
    navigation.navigate("Booking", { bike });
  };

  const renderItem = ({ item }) => (
    <BicycleCard bike={item} onPress={() => handlePressBike(item)} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All bicycles</Text>

      <FlatList
        data={bicycles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.m,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: SPACING.m,
    color: COLORS.textMain,
  },
  listContent: {
    paddingBottom: SPACING.l,
  },
});
