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
          <Text style={styles.title}>Campus Bike</Text>
          <Text style={styles.subtitle}>Share • Ride • Repeat</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textMain,
  },
  subtitle: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});
