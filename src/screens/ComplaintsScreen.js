// src/screens/ComplaintsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../constants/theme";
import Screen from "../components/Screenhy";
export default function ComplaintsScreen() {
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null); // { uri }

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

  const handleSubmit = () => {
    if (!description) {
      Alert.alert("Missing info", "Please describe your complaint.");
      return;
    }

    const payload = {
      description,
      // backend fills userId from auth token
      // status: NEW (default in schema)
    };

    console.log("Complaint payload", payload, photo);

    // TODO: POST to backend, e.g.
    // await axios.post("/complaints", createFormData(payload, photo));

    Alert.alert("Thank you", "Your complaint has been submitted.");
    setDescription("");
    setPhoto(null);
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
    marginBottom: 24,
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
    marginTop: "auto",
    marginBottom: 16,
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
