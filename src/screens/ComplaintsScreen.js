// src/screens/ComplaintsScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../constants/theme";
import Screen from "../components/Screenhy";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

// enable layout animation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ComplaintsScreen() {
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const { token } = useAuth();

  const [myComplaints, setMyComplaints] = useState([]);
  const [loadingComplaints, setLoadingComplaints] = useState(false);
  const [showComplaints, setShowComplaints] = useState(false);

  const handlePickImage = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "We need access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!description) {
      Alert.alert("Missing info", "Please enter description.");
      return;
    }

    if (!token) {
      Alert.alert("Not logged in", "Please log in again.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("description", description);

      if (photo) {
        const uriParts = photo.uri.split("/");
        const fileName = uriParts[uriParts.length - 1];
        const fileType = fileName.endsWith(".png")
          ? "image/png"
          : "image/jpeg";

        formData.append("photo", {
          uri: photo.uri,
          name: fileName,
          type: fileType,
        });
      }

      const res = await api.post("/complain/report", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("COMPLAINT RESPONSE:", res.data);
      Alert.alert("Thank you", "Your complaint has been submitted.");
      setDescription("");
      setPhoto(null);

      // optional: refresh list if section is open
      if (showComplaints) {
        loadMyComplaints();
      }
    } catch (err) {
      console.log(
        "COMPLAIN ERROR:",
        err?.response?.data || err.message
      );
      const msg =
        (err && err.response && err.response.data && err.response.data.message) ||
        "Could not submit complaint";
      Alert.alert("Error", msg);
    }
  };

  const loadMyComplaints = async () => {
    if (!token) {
      return;
    }

    try {
      setLoadingComplaints(true);
      const res = await api.get("/complain/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("MY COMPLAINTS:", res.data);
      setMyComplaints(res.data);
    } catch (err) {
      console.log(
        "MY COMPLAINTS ERROR:",
        err?.response?.data || err.message
      );
    } finally {
      setLoadingComplaints(false);
    }
  };

  const toggleComplaints = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const next = !showComplaints;
    setShowComplaints(next);

    if (next && myComplaints.length === 0 && !loadingComplaints) {
      loadMyComplaints();
    }
  };

  const renderComplaintItem = ({ item }) => {
    const dateLabel = new Date(item.createdAt).toLocaleString();

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Complaint #{item.id}</Text>
          <View style={[styles.statusBadge, styles[`status_${item.status}`]]}>
            <Text style={styles.statusText}>
              {item.status.replace("_", " ")}
            </Text>
          </View>
        </View>
        <Text style={styles.dateText}>{dateLabel}</Text>
        <Text style={styles.descText}>{item.description}</Text>
      </View>
    );
  };

  return (
    <Screen>
      <View style={styles.screen}>
        <Text style={styles.title}>Submit a complaint</Text>


        <Text style={styles.label}>What happened?</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Describe your complaint in detail…"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Optional photo</Text>
        <View style={styles.photoRow}>
          <TouchableOpacity style={styles.photoButton} onPress={handlePickImage}>
            <Text style={styles.photoButtonText}>
              {photo ? "Change photo" : "Add photo"}
            </Text>
          </TouchableOpacity>

          {photo && (
            <Image source={{ uri: photo.uri }} style={styles.photoPreview} />
          )}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit complaint</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Collapsible complaints history */}
        <TouchableOpacity style={styles.historyHeader} onPress={toggleComplaints}>
          <Text style={styles.historyHeaderText}>My complaints</Text>
          <Text style={styles.historyHeaderIcon}>
            {showComplaints ? "▴" : "▾"}
          </Text>
        </TouchableOpacity>

        {showComplaints && (
          <View style={styles.historyContainer}>
            {loadingComplaints ? (
              <ActivityIndicator color={COLORS.primary} />
            ) : myComplaints.length === 0 ? (
              <Text style={styles.historyEmptyText}>
                You have not submitted any complaints yet.
              </Text>
            ) : (
              <FlatList
                data={myComplaints}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderComplaintItem}
                scrollEnabled={false}
              />
            )}
          </View>
        )}


      </View>
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
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textMain,
    marginBottom: 16,
  },

  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 4,
  },
  historyHeaderText: {
    fontSize: 14,
    color: COLORS.primaryDark,
    fontWeight: "600",
  },
  historyHeaderIcon: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  historyContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 12,
  },
  historyEmptyText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 12,
  },

  card: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textMain,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "600",
  },
  status_REVIEWED: {
    backgroundColor: "#f0ad4e",
  },
  status_NEW: {
    backgroundColor: COLORS.primary,
  },
  status_IN_REVIEW: {
    backgroundColor: "#5bc0de",
  },
  status_CLOSED: {
    backgroundColor: "#777",
  },
  dateText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  descText: {
    fontSize: 13,
    color: COLORS.textMain,
  },

  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.textMain,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 16,
  },
  textarea: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  photoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  photoButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: COLORS.primaryDark,
  },
  photoButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  photoPreview: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginLeft: 12,
  },
 submitButton: {
    marginTop: 12,
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});