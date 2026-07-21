import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import Screen from "../components/Screenhy";
import { COLORS } from "../constants/theme";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function MyBookingsScreen({ navigation }) {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlyFines, setOnlyFines] = useState(false); // NEW

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const all = res.data; // array
      const todayStr = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

      // sort: today first, then newest first
      const sorted = [...all].sort((a, b) => {
        const aDate = a.bookingTime.slice(0, 10);
        const bDate = b.bookingTime.slice(0, 10);

        const aToday = aDate === todayStr;
        const bToday = bDate === todayStr;

        if (aToday && !bToday) return -1;
        if (!aToday && bToday) return 1;

        return new Date(b.bookingTime) - new Date(a.bookingTime);
      });

      setBookings(sorted);
    } catch (err) {
      console.log(
        "LOAD MY BOOKINGS ERROR:",
        err?.response?.data || err.message
      );
      Alert.alert("Error", "Could not load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [token]);

  const handleDelete = (booking) => {
    const fineZero =
      booking.fineAmount === "0" || Number(booking.fineAmount) === 0;
    const canDelete = fineZero || booking.status === "CANCELLED";

    if (!canDelete) {
      Alert.alert(
        "Cannot delete",
        "You can only delete bookings with no fines or cancelled bookings."
      );
      return;
    }

    Alert.alert(
      "Delete booking?",
      "This will remove the booking from your history.",
      [
        { text: "No", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/bookings/${booking.id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });

              setBookings((prev) =>
                prev.filter((b) => b.id !== booking.id)
              );
            } catch (err) {
              console.log(
                "DELETE BOOKING ERROR:",
                err?.response?.data || err.message
              );
              Alert.alert(
                "Error",
                err?.response?.data?.message || "Could not delete booking"
              );
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    const isToday =
      item.bookingTime.slice(0, 10) ===
      new Date().toISOString().slice(0, 10);

    const hasFine =
      item.fineAmount !== undefined &&
      item.fineAmount !== null &&
      Number(item.fineAmount) > 0;

    return (
      <View
        style={[
          styles.card,
          isToday && styles.cardToday,
          hasFine && styles.cardFineHighlight,
        ]}
      >
        <View style={styles.rowTop}>
          <Text style={styles.bikeText}>
            Bicycle #{item.bicycle?.bicycleNumber || item.bicycleId}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {hasFine && <Text style={styles.fineBadge}>FINE</Text>}
            <Text
              style={[
                styles.status,
                item.status === "CANCELLED" && { color: COLORS.booked },
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <Text style={styles.line}>
          Date: {new Date(item.bookingTime).toLocaleDateString()}
        </Text>
        <Text style={styles.line}>
          Helmet: {item.helmetRequired ? "Required" : "Not required"}
        </Text>
        {item.note && (
          <Text style={styles.line}>Note: {item.note}</Text>
        )}

        <Text
          style={[
            styles.line,
            hasFine && styles.fineLine,
          ]}
        >
          Fine: £{item.fineAmount}
        </Text>

        <View style={styles.rowBottom}>
          {isToday && (
            <Text style={styles.todayBadge}>Today</Text>
          )}
          <TouchableOpacity
            style={[
              styles.deleteButton,
              !(
                item.status === "CANCELLED" ||
                item.fineAmount === "0" ||
                Number(item.fineAmount) === 0
              ) && styles.deleteButtonDisabled,
            ]}
            onPress={() => handleDelete(item)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Apply "only fines" filter here
  const filteredBookings = bookings.filter((b) => {
    if (!onlyFines) return true;
    return Number(b.fineAmount || 0) > 0;
  });

  return (
    <Screen>
      <View style={styles.screen}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>My bookings</Text>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Only fines</Text>
            <Switch
              value={onlyFines}
              onValueChange={setOnlyFines}
              thumbColor={onlyFines ? COLORS.primary : "#fff"}
              trackColor={{ false: "#ccc", true: COLORS.primary + "55" }}
            />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <FlatList
            data={filteredBookings}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 24 }}
            ListEmptyComponent={
              <Text style={{ color: COLORS.textSecondary }}>
                {onlyFines
                  ? "No bookings with fines."
                  : "No bookings yet."}
              </Text>
            }
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.background,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textMain,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  filterLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardToday: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  cardFineHighlight: {
    borderWidth: 1,
    borderColor: "#E53935",
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  bikeText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textMain,
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  line: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  fineLine: {
    color: "#E53935",
    fontWeight: "700",
  },
  rowBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  todayBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: COLORS.primary + "22",
    color: COLORS.primaryDark,
    fontSize: 11,
    fontWeight: "600",
  },
  fineBadge: {
    backgroundColor: "#FFCDD2",
    color: "#B71C1C",
    fontSize: 10,
    fontWeight: "700",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    marginRight: 4,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.booked,
  },
  deleteButtonDisabled: {
    backgroundColor: "#B0BEC5",
  },
  deleteText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});