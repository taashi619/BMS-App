import { View, Text, TextInput, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";

export default function ReportIssueScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Maintenance</Text>

      <TextInput placeholder="Bicycle Number" style={styles.input} />
      <TextInput
        placeholder="Describe the issue"
        style={[styles.input, styles.textarea]}
        multiline
      />

      <AppButton title="Submit" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  textarea: {
    height: 120,
  },
});
