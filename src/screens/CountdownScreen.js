import { View, Text, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";

export default function CountdownScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.timer}>11h 30m</Text>
      <Text style={styles.sub}>Time remaining</Text>

      <AppButton title="Return Bicycle" onPress={() => alert("Pending approval")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  timer: {
    fontSize: 40,
    fontWeight: "700",
    marginBottom: 10,
  },
  sub: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },
});
