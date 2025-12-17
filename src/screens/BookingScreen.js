import { View, Text, TextInput, Switch, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";
import { useState } from "react";

export default function BookingScreen({ route, navigation }) {
  const { bike } = route.params;
  const [helmet, setHelmet] = useState(false);
  const [note, setNote] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Bicycle #{bike.number}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Need Helmet</Text>
        <Switch value={helmet} onValueChange={setHelmet} />
      </View>

      <TextInput
        placeholder="Add note..."
        value={note}
        onChangeText={setNote}
        style={styles.textarea}
      />

      <AppButton
        title="Confirm Booking"
        onPress={() => navigation.navigate("Countdown")}
      />
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    height: 100,
    marginBottom: 20,
  },
});
