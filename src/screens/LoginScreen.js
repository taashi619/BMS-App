import { View, Text, StyleSheet } from "react-native";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import { useState } from "react";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      <AppInput placeholder="Email" value={email} onChangeText={setEmail} />
      <AppInput placeholder="Password" secure value={password} onChangeText={setPassword} />

      <AppButton title="Login" onPress={() => navigation.replace("MainTabs")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
  },
});
