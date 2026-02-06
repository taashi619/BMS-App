import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity 
} from "react-native";
import BicycleCard from "../components/BicycleCard";

const bicycles = [
  { id: "1", number: 101, status: "Available", distance: "150 m" },
  { id: "2", number: 102, status: "Booked", distance: "320 m" },
  { id: "3", number: 103, status: "Available", distance: "480 m" },
];

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

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* translucent bicycle near top (optional) */}
      <Image
        source={require("C:/mediwave/project/app-front-bms/bns-front-app/assets/bike.jpg")} // <- put a PNG here
        style={styles.bgBikeTop}
        resizeMode="contain"
      />

      {/* bicycle above bottom tab bar */}
      <Image
        source={require("C:/mediwave/project/app-front-bms/bns-front-app/assets/bike.jpg")} // <- can be same image
        style={styles.bgBikeBottom}
        resizeMode="contain"
      />

      {/* foreground content */}
      <View style={styles.content}>
        {/* Top header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Hello John,</Text>
            <Text style={styles.subTitle}>Want to take a ride today?</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>J</Text>
          </View>
        </View>

        {/* Weather / info card */}
        <View style={styles.infoCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTemp}>18°</Text>
            <Text style={styles.infoText}>Cloudy • Campus</Text>
            <Text style={styles.infoDate}>Thursday, 5 February</Text>
          </View>
          <View style={styles.infoIcon}>
            <View style={styles.sun} />
            <View style={styles.cloud} />
          </View>
        </View>

        {/* Section title */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Near you</Text>
          <TouchableOpacity
          onPress={() => navigation.navigate("AllBicycles", { bicycles })}
        >
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
        </View>

        {/* Vertical list of bicycles */}
        <FlatList
          data={bicycles}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 140 }} // leave space for bottom image
          renderItem={({ item }) => (
            <BicycleCard
              bike={item}
              colors={COLORS}
              onPress={() => navigation.navigate("Booking", { bike: item })}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // top background bike (optional)
  bgBikeTop: {
    position: "absolute",
    right: -40,
    top: 80,
    width: 260,
    height: 260,
    opacity: 0.04,
  },

  // bike above bottom navigation
  bgBikeBottom: {
    position: "absolute",
    bottom: 60, // adjust so it sits just above bottom tab bar
    alignSelf: "center",
    width: 260,
    height: 260,
    opacity: 0.06,
  },

  // everything else sits on top
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.textMain,
  },
  subTitle: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  infoTemp: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  infoText: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
  },
  infoDate: {
    color: "rgba(255,255,255,0.8)",
    marginTop: 6,
    fontSize: 12,
  },
  infoIcon: {
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  sun: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFD54F",
    marginBottom: -8,
  },
  cloud: {
    width: 46,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.textMain,
    fontSize: 18,
    fontWeight: "600",
  },
  sectionAction: {
    color: COLORS.primaryDark,
    fontSize: 14,
  },

  seeAll: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
});
