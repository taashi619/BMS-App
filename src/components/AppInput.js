import { TextInput, StyleSheet } from "react-native";

export default function AppInput({ placeholder, secure, value, onChangeText }) {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secure}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
});
