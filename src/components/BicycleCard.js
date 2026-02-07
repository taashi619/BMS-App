import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export default function BicycleCard({ bike, onPress }) {
  const isAvailable = bike.status === "Available";

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={styles.numberCircle}>
          <Text style={styles.numberText}>{bike.number}</Text>
        </View>
      </View>

      <View style={styles.middle}>
        <Text style={styles.title}>Bicycle #{bike.number}</Text>

        <View style={styles.statusRow}>
          <View
            style={[
              styles.dot,
              { backgroundColor: isAvailable ? COLORS.available : COLORS.booked },
            ]}
          />
          <Text style={styles.statusText}>
            {isAvailable ? "Available" : "Booked"}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        <TouchableOpacity
          style={[
            styles.bookButton,
            { backgroundColor: isAvailable ? COLORS.primaryDark : "#B0BEC5" },
          ]}
          disabled={!isAvailable}
          onPress={onPress}
        >
          <Text style={styles.bookButtonText}>
            {isAvailable ? "Book now" : "Booked"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    marginBottom: 12,
    minHeight: 90,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  left: {
    marginRight: 12,
  },
  numberCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E0F7F4",
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },
  middle: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textMain,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  right: {
    marginLeft: 8,
  },
  bookButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});
