import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import colors from "../constants/colors";

export default function Input({ placeholder, secureTextEntry, value, onChangeText }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={colors.subtext}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    marginBottom: 15,
  },
});
