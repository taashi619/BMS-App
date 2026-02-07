// src/screens/BookingScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/theme";
import Screen from "../components/Screenhy";

export default function BookingScreen({ route, navigation }) {
  const { bike } = route.params;
  const [helmet, setHelmet] = useState(false);
  const [note, setNote] = useState("");

  return (
    <Screen>
      {/* translucent global background bike */}
      <Image
        source={require("../../assets/bike.jpg")}
        style={styles.bgBike}
        resizeMode="contain"
      />

      <View style={styles.content}>
        {/* HEADER with number circle + titles */}
        <View style={styles.headerBlock}>
          <View style={styles.numberCircle}>
            <Text style={styles.numberText}>{bike.number}</Text>
          </View>

          <View style={styles.headerText}>
            <Text style={styles.title}>Book bicycle</Text>
            <Text style={styles.subtitle}>Bicycle #{bike.number}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Need helmet</Text>
          <Switch
            value={helmet}
            onValueChange={setHelmet}
            trackColor={{ false: "#E0E0E0", true: COLORS.primary + "55" }}
            thumbColor={helmet ? COLORS.primary : "#f4f3f4"}
          />
        </View>

        <View style={styles.noteContainer}>
          <TextInput
            placeholder="Add note for admin (optional)…"
            value={note}
            onChangeText={setNote}
            style={styles.textarea}
            multiline
          />
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[styles.bookButton, { backgroundColor: COLORS.primaryDark }]}
            onPress={() => navigation.navigate("Countdown")}
          >
            <Text style={styles.text}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  bgBike: {
    position: "absolute",
    bottom: 40,
    right: -40,
    width: 280,
    height: 280,
    opacity: 0.05,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  /* NEW header styles */
  headerBlock: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  numberCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E0F7F4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  numberText: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textMain,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: COLORS.textMain,
  },

  noteContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 12,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  textarea: {
    minHeight: 100,
    fontSize: 14,
    color: COLORS.textMain,
  },

  buttonWrapper: {
    alignItems: "center",
    marginTop: 40,
  },
  bookButton: {
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 24,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
