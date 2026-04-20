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
  Alert,
} from "react-native";
import { COLORS } from "../constants/theme";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter email and password");
      return;
    }
    const result = await login(email, password);
    if (result.success) {
      navigation.replace("MainTabs", { role: result.role });
    } else {
      Alert.alert("Login failed", result.message);
    }
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

        <View style={styles.logoRow}>
          <Text style={styles.logoWordmark}>Uni Bike</Text>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>Campus</Text>
          </View>
        </View>

        <View style={styles.logoUnderline} />

        <Text style={styles.appTagline}>Smart bicycle booking for students</Text>
      </View>

      {/* form */}
      <View style={styles.form}>
        <Text style={styles.welcome}>Welcome back</Text>
        {/* <Text style={styles.welcomeSub}>
          Sign in with your university email to continue.
        </Text> */}

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="abc@uni.ac.uk"
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

        <TouchableOpacity style={styles.forgotRow} onPress={goToChangePassword}>
          {/* <Text style={styles.forgotText}>Forgot password?</Text> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginText}>
            {loading ? "Logging in..." : "Log in"}
          </Text>
        </TouchableOpacity>

        {/* <Text style={styles.footerText}>
          By continuing you agree to the campus bicycle policy.
        </Text> */}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* HERO / LOGO AREA */
  hero: {
    height: 230,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 90,
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  heroBike: {
    position: "absolute",
    right: -40,
    bottom: -20,
    width: 260,
    height: 260,
    opacity: 0.12,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoWordmark: {
    fontSize: 38,
    fontFamily: "UniBikeScript", // make sure this custom font is loaded
    color: "#fff",
    letterSpacing: 1,
  },
  logoBadge: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.85)",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  logoBadgeText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.95)",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "600",
  },
  logoUnderline: {
    marginTop: 6,
    width: 90,
    height: 2,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  appTagline: {
    marginTop: 10,
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },

  /* FORM AREA */
  form: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textMain,
    marginBottom:30
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
