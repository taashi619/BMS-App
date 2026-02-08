import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { COLORS } from "../constants/theme";

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      // TODO: show toast
      return;
    }

    const payload = { currentPassword, newPassword };
    console.log("CHANGE PASSWORD", payload);
    // TODO: call backend, then:
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Change password</Text>
        <Text style={styles.headerSub}>
          Use a strong password you haven’t used elsewhere.
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Current password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>New password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirm new password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  headerSub: {
    marginTop: 6,
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  field: {
    marginBottom: 14,
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
  saveButton: {
    marginTop: 24,
    backgroundColor: COLORS.primaryDark,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
