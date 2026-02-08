import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import BicycleCard from "../components/BicycleCard";
import { COLORS } from "../constants/theme";
import Screen from "../components/Screenhy";
import ProfileMenu from "../components/ProfileMenu";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [bicycles, setBicycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { user } = useAuth();
  const firstName = user?.firstName  || "Student";
  const lastName = user?.lastName  || "";
  useEffect(() => {
    const fetchBicycles = async () => {
      try {
        const res = await api.get("/bicycles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // { id, bicycleNumber, status, ... }
        const backendBikes = res.data;

        // map to the shape your UI expects
        const mapped = backendBikes.map((b) => ({
          id: String(b.id),
          number: b.bicycleNumber,
          status: b.status === "AVAILABLE" ? "Available" : b.status,
        }));

        setBicycles(mapped);
      } catch (err) {
        console.log("FETCH BICYCLES ERROR:", err?.response?.data || err.message);
        Alert.alert("Error", "Could not load bicycles");
      } finally {
        setLoading(false);
      }
    };

    fetchBicycles();
  }, [token]);

  const handleSeeAll = () => {
    navigation.navigate("AllBicycles", { bicycles });
  };

  const handlePressBike = (bike) => {
    navigation.navigate("Booking", { bike });
  };
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const goToProfile = () => {
    closeMenu();
    navigation.navigate("Profile");
  };

  const goToBookings = () => {
    closeMenu();
    navigation.navigate("MyBookings");
  };
  return (
    <Screen>
      {/* background bikes */}
      <Image
        source={require("../../assets/bike.jpg")}
        style={styles.bgBikeTop}
        resizeMode="contain"
      />

      <Image
        source={require("../../assets/bike.jpg")}
        style={styles.bgBikeBottom}
        resizeMode="contain"
      />

      <ProfileMenu
        visible={menuVisible}
        onClose={closeMenu}
        onProfile={goToProfile}
        onBookings={goToBookings}
      />

      {/* foreground content */}
      <View style={styles.content}>
        {/* header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Hello {firstName} {lastName},</Text>
            <Text style={styles.subTitle}>Want to take a ride today?</Text>
          </View>

          <TouchableOpacity style={styles.avatar} onPress={openMenu}>
            <Text style={styles.avatarText}>J</Text>
          </TouchableOpacity>
        </View>

        {/* weather card */}
        <View style={styles.infoCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTemp}>18°</Text>
            <Text style={styles.infoText}>Cloudy • Campus</Text>
            <Text style={styles.infoDate}>Thursday, 5 February</Text>
          </View>
          <View style={styles.infoIcon}>
            <View style={styles.sun} />
            <View style={styles.cloud} />
          </View>
        </View>

        {/* section header */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Available Bikes For You</Text>
          <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* bicycle list */}
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <FlatList
            data={bicycles}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 140 }}
            renderItem={({ item }) => (
              <BicycleCard bike={item} onPress={() => handlePressBike(item)} />
            )}
            ListEmptyComponent={
              <Text style={{ color: COLORS.textSecondary }}>
                No bicycles available.
              </Text>
            }
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({

  bgBikeTop: {
    position: "absolute",
    right: -40,
    top: 80,
    width: 260,
    height: 260,
    opacity: 0.04,
  },
  bgBikeBottom: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    width: 260,
    height: 260,
    opacity: 0.06,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.textMain,
  },
  subTitle: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    borderRadius: 24,      // slightly rounder
    paddingVertical: 20,   // taller
    paddingHorizontal: 20, // wider
    marginBottom: 28,
    minHeight: 110,        // enforce height
  },
  infoTemp: {
    fontSize: 34,          // bigger temperature
    fontWeight: "700",
    color: "#fff",
  },
  infoText: {
    color: "rgba(255,255,255,0.95)",
    marginTop: 6,
    fontSize: 16,          // bigger subtitle
  },
  infoDate: {
    color: "rgba(255,255,255,0.85)",
    marginTop: 8,
    fontSize: 13,
    marginBottom: 8,
  },
  infoIcon: {
    width: 90,             // more space for icon
    justifyContent: "center",
    alignItems: "center",
  },
  sun: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFD54F",
    marginBottom: -10,
  },
  cloud: {
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.textMain,
    fontSize: 18,
    fontWeight: "600",
  },
  seeAll: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
});
