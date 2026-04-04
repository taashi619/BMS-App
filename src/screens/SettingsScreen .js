import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import Screen from "../components/Screenhy";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function SettingsScreen({ navigation }) {
  const { token, user } = useAuth();

  const [stats, setStats] = useState({
    totalBookings: 0,
    totalFine: 0,
  });

  const handleFeedback = () => navigation.navigate("Complaints");
  const handleChangePassword = () => navigation.navigate("ChangePassword");
  const handleDeleteAccount = () => { };
  const handleLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };
  const handlePrivacy = () => { };

  const handleAvatarPress = () => {
    navigation.navigate("Home", {
      screen: "Profile",
    });
  };

  useEffect(() => {
    if (!token) return;

    const loadStats = async () => {
      try {
        // total bookings from /bookings/my
        const bookingsRes = await api.get("/bookings/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const bookings = bookingsRes.data || [];
        const totalBookings = bookings.length;

        // total fine from /bookings/my/total-fine
        const fineRes = await api.get("/bookings/my/total-fine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const totalFine = Number(fineRes.data?.totalFine || 0);

        setStats({
          totalBookings,
          totalFine,
        });
      } catch (err) {
        console.log(
          "LOAD SETTINGS STATS ERROR:",
          err?.response?.data || err.message
        );
      }
    };

    loadStats();
  }, [token]);

  const initials =
    (user?.firstName?.[0] || "") + (user?.lastName?.[0] || "");

  return (
    <Screen>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* header block with background bike */}
        <View style={styles.headerCard}>
          <Image
            source={require("../../assets/bike.jpg")}
            style={styles.headerBgBike}
            resizeMode="contain"
          />

          <View style={styles.headerRow}>
            <View>
              <Text style={styles.headerTitle}>Settings</Text>
              <Text style={styles.headerSubtitle}>Manage your account</Text>
            </View>

            <TouchableOpacity
              style={styles.avatarCircle}
              onPress={handleAvatarPress}
              activeOpacity={0.7}
            >
              <Text style={styles.avatarText}>
                {initials || "U"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* quick stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Ionicons
                name="bicycle-outline"
                size={18}
                color={COLORS.primaryDark}
              />
              <Text style={styles.statLabel}>Total bookings</Text>
              <Text style={styles.statValue}>{stats.totalBookings}</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons
                name="alert-circle-outline"
                size={18}
                color="#C62828"
              />
              <Text style={styles.statLabel}>Total fines</Text>
              <Text style={[styles.statValue, { color: "#C62828" }]}>
                £{stats.totalFine.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* main actions */}
        <View style={styles.section}>
          <SettingsItem
            icon="lock-closed-outline"
            label="Change password"
            onPress={handleChangePassword}
          />
        </View>

        <View style={styles.section}>
          <SettingsItem
            icon="log-out-outline"
            label="Log out"
            onPress={handleLogout}
            danger
          />
        </View>

        {/* footer */}
        <TouchableOpacity style={styles.privacyRow} onPress={handlePrivacy}>
          <Ionicons
            name="shield-checkmark-outline"
            size={16}
            color={COLORS.textSecondary}
          />
          <Text style={styles.privacyText}>Privacy policy</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </Screen>
  );
}

function SettingsItem({ icon, label, onPress, danger }) {
  const bg = danger ? "#C62828" : COLORS.card;
  const textColor = danger ? "#fff" : COLORS.textMain;
  const iconColor = danger ? "#fff" : COLORS.primaryDark;

  return (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: bg }]}
      onPress={onPress}
    >
      <View style={styles.itemLeft}>
        <Ionicons
          name={icon}
          size={20}
          color={iconColor}
          style={styles.itemIcon}
        />
        <Text style={[styles.itemText, { color: textColor }]}>
          {label}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={18}
        color={danger ? "#fff" : COLORS.textSecondary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  headerCard: {
    marginHorizontal: 16,
    marginTop: 25,
    marginBottom: 20,
    borderRadius: 24,
    padding: 16,
    backgroundColor: COLORS.primary,
    overflow: "hidden",
  },
  headerBgBike: {
    position: "absolute",
    right: -40,
    bottom: -10,
    width: 260,
    height: 260,
    opacity: 0.08,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },

  statsRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statValue: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textMain,
  },

  section: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    fontSize: 15,
    fontWeight: "500",
  },

  privacyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 12,
  },
  privacyText: {
    marginLeft: 6,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  versionText: {
    paddingHorizontal: 16,
    marginTop: 4,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});