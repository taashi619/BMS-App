import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

export default function AppLogo({ size = 60, showText = true }) {
  const circleSize = size;
  const iconSize = size * 0.55;

  return (
    <View style={styles.wrapper}>
      {/* main teal circle */}
      <View
        style={[
          styles.circle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
          },
        ]}
      >
        {/* small accent dot */}
        <View style={styles.dot} />
        {/* bike icon */}
        <Ionicons
          name="bicycle-outline"
          size={iconSize}
          color="#ffffff"
          style={styles.icon}
        />
      </View>

      {showText && (
        <View style={styles.textBlock}>
          <Text style={styles.logoWordmark}>Uni Bike</Text>
          <Text style={styles.subtitle}>Booked • Ride • Repeat</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    backgroundColor: COLORS.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  icon: {
    marginLeft: 2,
  },
  dot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFEB3B",
  },
  textBlock: {
    marginLeft: 10,
  },
  logoWordmark: {
    fontSize: 40,                // big like your handwritten title
    fontFamily: "UniBikeScript", // your custom script font
    color: COLORS.textMain,
    letterSpacing: 1,
    transform: [{ rotate: "-3deg" }], // tiny tilt for a handwritten feel
  },
  subtitle: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});
