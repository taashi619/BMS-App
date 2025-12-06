import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import colors from "../constants/colors";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bicycle Manager</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <View style={styles.card}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button
          title="Login"
          onPress={() => navigation.replace("Dashboard")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: colors.subtext,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
});
