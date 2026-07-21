import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { COLORS } from "../constants/theme";
import Screen from "../components/Screenhy";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function ProfileScreen() {
  const { user, setUser, token } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [isResidential, setIsResidential] = useState(true);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [totalFines, setTotalFines] = useState(0); // from backend

  useEffect(() => {
    if (!user) return;

    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setFaculty(user.student?.faculty || "");
    setRoomNumber(user.student?.roomNumber || "");
    setPhone(user.student?.phone || "");
    setIsResidential(
      user.student?.isResidential !== undefined
        ? user.student.isResidential
        : true
    );
  }, [user]);

  // load total fines from /bookings/my/total-fine
  useEffect(() => {
    const loadTotalFines = async () => {
      if (!token) return;
      try {
        const res = await api.get("/bookings/my/total-fine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const value = Number(res.data?.totalFine || 0);
        setTotalFines(value);
      } catch (err) {
        console.log(
          "LOAD TOTAL FINES ERROR:",
          err?.response?.data || err.message
        );
      }
    };

    loadTotalFines();
  }, [token]);

  const validate = () => {
    const next = { firstName: "", lastName: "", phone: "" };

    if (!firstName.trim()) next.firstName = "First name is required.";
    if (!lastName.trim()) next.lastName = "Last name is required.";
    if (!phone.trim()) next.phone = "Phone number is required.";

    setErrors(next);
    return Object.values(next).every((v) => v === "");
  };

  const handleSave = async () => {
    if (!validate()) return;

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      faculty: faculty.trim() || null,
      roomNumber: roomNumber.trim() || null,
      phone: phone.trim(),
      isResidential,
    };

    try {
      const res = await api.put("/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.profile) {
        setUser(res.data.profile);
      }

      Alert.alert("Saved", "Profile updated successfully");
    } catch (err) {
      console.log(
        "PROFILE UPDATE ERROR:",
        err?.response?.data || err.message
      );

      const backendErrors = err?.response?.data?.errors;
      if (backendErrors && typeof backendErrors === "object") {
        setErrors((prev) => ({ ...prev, ...backendErrors }));
      }

      const msg =
        err?.response?.data?.message || "Could not update profile";
      Alert.alert("Error", msg);
    }
  };

  if (!user) {
    return (
      <Screen>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: COLORS.textSecondary }}>
            Loading profile...
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={{ paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* header card */}
        <View style={styles.headerCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitial}>
              {firstName.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.headerText}>
            <Text style={styles.nameText}>
              {firstName} {lastName}
            </Text>
            <Text style={styles.emailText}>{user.email}</Text>
            <Text style={styles.indexText}>
              Index: {user.student.indexNo}
            </Text>
          </View>
        </View>

        {/* editable fields */}
        <Text style={styles.sectionTitle}>Personal details</Text>

        <View style={styles.rowInputs}>
          <View style={[styles.inputGroup, { marginRight: 8 }]}>
            <Text style={styles.label}>First name *</Text>
            <TextInput
              style={[
                styles.input,
                errors.firstName && styles.inputError,
              ]}
              value={firstName}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^a-zA-Z\s]/g, "");
                setFirstName(cleaned);
                if (errors.firstName) {
                  setErrors((prev) => ({ ...prev, firstName: "" }));
                }
              }}
            />
            {errors.firstName ? (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            ) : null}
          </View>

          <View style={[styles.inputGroup, { marginLeft: 8 }]}>
            <Text style={styles.label}>Last name *</Text>
            <TextInput
              style={[
                styles.input,
                errors.lastName && styles.inputError,
              ]}
              value={lastName}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^a-zA-Z\s]/g, "");
                setLastName(cleaned);
                if (errors.lastName) {
                  setErrors((prev) => ({ ...prev, lastName: "" }));
                }
              }}
            />
            {errors.lastName ? (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone *</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            value={phone}
            onChangeText={(text) => {
              const cleaned = text.replace(/[^0-9+\s]/g, "");
              setPhone(cleaned);
              if (errors.phone) {
                setErrors((prev) => ({ ...prev, phone: "" }));
              }
            }}
            keyboardType="phone-pad"
            placeholder="+44..."
          />
          {errors.phone ? (
            <Text style={styles.errorText}>{errors.phone}</Text>
          ) : null}
        </View>

        <Text style={styles.sectionTitle}>Study details</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Faculty</Text>
          <TextInput
            style={styles.input}
            value={faculty}
            onChangeText={setFaculty}
            placeholder="e.g. Computing"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Room number</Text>
          <TextInput
            style={styles.input}
            value={roomNumber}
            onChangeText={setRoomNumber}
            placeholder="e.g. B-204"
          />
        </View>

        <View style={styles.finesCard}>
          <Text style={styles.finesLabel}>Total fines</Text>
          <Text style={styles.finesValue}>
            £{totalFines.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarInitial: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },
  headerText: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textMain,
  },
  emailText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  indexText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textMain,
    marginBottom: 8,
    marginTop: 4,
  },

  rowInputs: {
    flexDirection: "row",
    marginBottom: 8,
  },

  inputGroup: {
    marginBottom: 12,
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: COLORS.textMain,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  inputError: {
    borderColor: "#E53935",
  },
  errorText: {
    marginTop: 2,
    fontSize: 11,
    color: "#E53935",
  },

  finesCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  finesLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  finesValue: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.booked,
  },

  saveButton: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 12,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});