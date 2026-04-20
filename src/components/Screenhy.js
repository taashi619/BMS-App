import React from "react";
import { SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import { COLORS } from "../constants/theme";

const STATUS_BAR_HEIGHT = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

export default function Screen({ children }) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: STATUS_BAR_HEIGHT + 12,
  },
});
