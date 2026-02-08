import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { COLORS } from "../constants/theme";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: call backend, store token, then:
    navigation.replace("MainTabs");
  };

  const goToChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* top teal area with bike */}
      <View style={styles.hero}>
        <Image
          source={require("../../assets/bike.jpg")}
          style={styles.heroBike}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Campus Bike</Text>
        <Text style={styles.appTagline}>Smart bicycle booking for students</Text>
      </View>

      {/* form */}
      <View style={styles.form}>
        <Text style={styles.welcome}>Welcome back</Text>
        <Text style={styles.welcomeSub}>
          Sign in with your university email to continue.
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@student.uni.ac.uk"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.forgotRow}
          onPress={goToChangePassword}
        >
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          By continuing you agree to the campus bicycle policy.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  hero: {
    height: 220,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 40,
    justifyContent: "center",
    overflow: "hidden",
  },
  heroBike: {
    position: "absolute",
    right: -60,
    bottom: -10,
    width: 260,
    height: 260,
    opacity: 0.12,
  },
  appName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
  },
  appTagline: {
    marginTop: 6,
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textMain,
  },
  welcomeSub: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.textMain,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  forgotRow: {
    alignItems: "flex-end",
    marginTop: 4,
    marginBottom: 18,
  },
  forgotText: {
    fontSize: 13,
    color: COLORS.primaryDark,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 4,
  },
});
