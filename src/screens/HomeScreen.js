import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import BicycleCard from "../components/BicycleCard";
import { COLORS } from "../constants/theme";
import Screen from "../components/Screenhy";
import ProfileMenu from "../components/ProfileMenu";
import CurrentBookingCard from "../components/currentBookingCrad";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [bicycles, setBicycles] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { token, user } = useAuth();
  const firstName = user?.firstName || "Student";
  const lastName = user?.lastName || "";

  const fetchAll = useCallback(async () => {
    if (!token) return;
    try {
      if (!refreshing) setLoading(true);

      const bikesRes = await api.get("/bicycles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const mappedBikes = bikesRes.data.map((b) => ({
        id: String(b.id),
        number: b.bicycleNumber,
        status: b.status,
      }));
      setBicycles(mappedBikes);

      const bookingsRes = await api.get("/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const bookings = bookingsRes.data;
      const active = bookings.filter((b) =>
        ["BOOKED", "KEY_TAKEN", "RETURN_PENDING"].includes(b.status)
      );
      const latest =
        active.length > 0
          ? active.sort(
              (a, b) => new Date(b.bookingTime) - new Date(a.bookingTime)
            )[0]
          : null;
      setCurrentBooking(latest);
    } catch (err) {
      console.log("FETCH ALL ERROR:", err?.response?.data || err.message);
      setCurrentBooking(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token, refreshing]);

  useFocusEffect(
    useCallback(() => {
      fetchAll();
      const id = setInterval(fetchAll, 10000);
      return () => clearInterval(id);
    }, [fetchAll])
  );

  const handleCancelBooking = async () => {
    if (!currentBooking) return;

    Alert.alert(
      "Cancel booking?",
      "Are you sure you want to cancel this booking?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, cancel",
          style: "destructive",
          onPress: async () => {
            try {
              await api.patch(
                `/bookings/${currentBooking.id}/cancel`,
                null,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              setCurrentBooking(null);
              await fetchAll();
              Alert.alert("Cancelled", "Booking cancelled successfully");
            } catch (err) {
              console.log(
                "CANCEL BOOKING ERROR:",
                err?.response?.data || err.message
              );
              const msg =
                err?.response?.data?.message ||
                "Could not cancel booking";
              Alert.alert("Error", msg);
            }
          },
        },
      ]
    );
  };

  const handleReturnKey = async () => {
    if (!currentBooking) return;

    Alert.alert(
      "Return bicycle key?",
      "Are you sure you want to return the bicycle key now?",
      [
        { text: "Not yet", style: "cancel" },
        {
          text: "Yes, return key",
          onPress: async () => {
            try {
              const res = await api.patch(
                `/bookings/${currentBooking.id}/return`,
                {},
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              console.log("RETURN RESPONSE:", res.data);
              Alert.alert("Return requested", res.data.message);

              setCurrentBooking((prev) =>
                prev
                  ? {
                      ...prev,
                      status: "RETURN_PENDING",
                      keyTaken: false,
                    }
                  : prev
              );

              await fetchAll();
            } catch (err) {
              console.log(
                "RETURN BOOKING ERROR:",
                err?.response?.data || err.message
              );
              const msg =
                err?.response?.data?.message ||
                "Could not return bicycle";
              Alert.alert("Error", msg);
            }
          },
        },
      ]
    );
  };

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

  const hasBooking = !!currentBooking;
  const availableCount = bicycles.filter((b) => b.status === "AVAILABLE")
    .length;

  return (
    <Screen>
      {/* subtle bike background */}
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

      <View style={styles.content}>
        {/* header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>
              Hello {firstName} {lastName},
            </Text>
            <Text style={styles.subTitle}>
              {hasBooking
                ? "You have a ride in progress."
                : "Ready to grab a bike and go?"}
            </Text>
          </View>

          <TouchableOpacity style={styles.avatar} onPress={openMenu}>
            <Text style={styles.avatarText}>
              {firstName.charAt(0).toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>

        {/* stats banner */}
        <View style={styles.statsCard}>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>Available bikes</Text>
            <Text style={styles.statValue}>{availableCount}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>Status</Text>
            <Text style={styles.statValue}>
              {hasBooking ? "Riding" : "Not riding"}
            </Text>
          </View>
        </View>

        {/* section header */}
        {currentBooking ? (
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Your booking</Text>
            <TouchableOpacity onPress={goToBookings}>
              <Text style={styles.seeAll}>View history</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Available bikes for you</Text>
            <TouchableOpacity onPress={handleSeeAll}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* main content */}
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : currentBooking ? (
          <CurrentBookingCard
            booking={currentBooking}
            onCancelPress={handleCancelBooking}
            onReturnKeyPress={handleReturnKey}
            onDetailsPress={goToBookings}
          />
        ) : (
          <FlatList
            data={bicycles.slice(0, 4)}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 140 }}
            renderItem={({ item }) => (
              <BicycleCard
                bike={item}
                onPress={() => handlePressBike(item)}
              />
            )}
            ListEmptyComponent={
              <Text style={{ color: COLORS.textSecondary }}>
                No bicycles available.
              </Text>
            }
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchAll();
            }}
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
    marginBottom: 18,
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

  // stats banner
  statsCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 22,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statBlock: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  statValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textMain,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 12,
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