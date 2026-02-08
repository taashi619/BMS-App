import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { COLORS } from "../constants/theme";
import Screen from "../components/Screenhy";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { Alert } from "react-native";

export default function ProfileScreen() {
  // TODO: replace with data from backend (GET /me)
  const mockUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john@student.uni.ac.uk",
    student: {
      indexNo: "IT2020XXXX",
      faculty: "Computing",
      roomNumber: "B-204",
      totalFines: "12.50",
      phone: "+44 7xxx xxx xxx",
      isResidential: true,
    },
  };
  const { user,setUser,token  } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [isResidential, setIsResidential] = useState(true);

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

  const handleSave = async () => {
    const payload = {
      firstName,
      lastName,
      faculty,
      roomNumber,
      phone,
      isResidential,
    };
    console.log("PROFILE SAVE", payload);
    try {
      const res = await api.put("/profile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // if backend returns updated profile: { success, profile: { ... } }
      if (res.data?.profile) {
        // optional: update context user so Home/Profile show new data
        if (res.data?.profile) {
        setUser(res.data.profile);
      }
      }

      Alert.alert("Saved", "Profile updated successfully");
      console.log("PROFILE UPDATE RESPONSE:", res.data);
    } catch (err) {
      console.log("PROFILE UPDATE ERROR:", err?.response?.data || err.message);
      const msg =
        err?.response?.data?.message || "Could not update profile";
      Alert.alert("Error", msg);
    }
  };

  if (!user) {
    // optional: simple loading/empty state if profile not loaded yet
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: COLORS.textSecondary }}>Loading profile...</Text>
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
            <Text style={styles.indexText}>Index: {user.student.indexNo}</Text>
          </View>
        </View>

        {/* editable fields */}
        <Text style={styles.sectionTitle}>Personal details</Text>

        <View style={styles.rowInputs}>
          <View style={[styles.inputGroup, { marginRight: 8 }]}>
            <Text style={styles.label}>First name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={[styles.inputGroup, { marginLeft: 8 }]}>
            <Text style={styles.label}>Last name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="+44..."
          />
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

        {/* <View style={styles.row}>
        <View>
          <Text style={styles.label}>Residential student</Text>
          <Text style={styles.helper}>
            Toggle off if you are a day scholar.
          </Text>
        </View>
        <Switch
          value={isResidential}
          onValueChange={setIsResidential}
          trackColor={{ false: "#E0E0E0", true: COLORS.primary + "55" }}
          thumbColor={isResidential ? COLORS.primary : "#f4f3f4"}
        />
      </View> */}

        <View style={styles.finesCard}>
          <Text style={styles.finesLabel}>Total fines</Text>
          <Text style={styles.finesValue}>£{mockUser.student.totalFines}</Text>
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

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  helper: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
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
    color: COLORS.booked, // red to indicate money
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
