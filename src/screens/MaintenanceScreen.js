import React, { useState, useEffect } from "react";
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
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { SelectList } from "react-native-dropdown-select-list";
export default function MaintenanceScreen() {
  const [bikeNumber, setBikeNumber] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const { token } = useAuth();
  const [bikes, setBikes] = useState([]);
  const [loadingBikes, setLoadingBikes] = useState(false);
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await api.get("/bicycles", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const options = res.data.map((b) => ({
          key: String(b.id),
          value: `Bicycle #${b.bicycleNumber}`,
        }));

        setBikes(options);
      } catch (err) {
        console.log("LOAD BIKES ERROR:", err?.response?.data || err.message);
        Alert.alert("Error", "Could not load bicycles for maintenance");
      } finally {
        setLoadingBikes(false);
      }
    };

    fetchBikes();
  }, [token]);


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
    if (!bikeNumber || !description) {
      Alert.alert("Missing info", "Please enter bike number and description.");
      return;
    }

    if (!token) {
      Alert.alert("Not logged in", "Please log in again.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("description", description);

      formData.append("bicycleId", Number(bikeNumber));

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

      const res = await api.post("/maintenance/report", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("MAINTENANCE RESPONSE:", res.data);
      Alert.alert("Thanks!", "Your maintenance request has been submitted.");

      setBikeNumber("");
      setDescription("");
      setPhoto(null);
    } catch (err) {
      console.log(
        "MAINTENANCE ERROR:",
        err?.response?.data || err.message
      );
      const msg =
        err?.response?.data?.message ||
        "Could not submit maintenance request";
      Alert.alert("Error", msg);
    }
  };

  return (
    <Screen>
      <View style={styles.screen}>
        <Text style={styles.title}>Report maintenance issue</Text>

        <Text style={styles.label}>Bicycle</Text>
        {loadingBikes ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : (
          <SelectList
            data={bikes}
            setSelected={setBikeNumber}
            placeholder="Select a bicycle"
            search={false}
            boxStyles={styles.selectBox}
            dropdownStyles={styles.dropdown}
            inputStyles={styles.selectText}
            dropdownTextStyles={styles.dropdownText}
            arrowicon={
              <Text style={{ fontSize: 16, color: COLORS.textSecondary }}>▾</Text>
            }
          />
        )}

        <Text style={styles.label}>Describe the issue</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Tell us what is wrong with the bicycle…"
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
          <Text style={styles.submitText}>Submit issue</Text>
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
    minHeight: 90,
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
 selectBox: {
  backgroundColor: COLORS.card,
  borderRadius: 16,
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderWidth: 1,
  borderColor: "#E0E0E0",
},

selectText: {
  fontSize: 14,
  color: COLORS.textMain,
},

dropdown: {
  backgroundColor: COLORS.card,
  borderRadius: 16,
  marginTop: 4,
  borderWidth: 1,
  borderColor: "#E0E0E0",
},

dropdownText: {
  fontSize: 14,
  color: COLORS.textMain,
  paddingVertical: 8,
},
});
