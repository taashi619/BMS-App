import { View, Text, TouchableOpacity,StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";
export default function CurrentBookingCard({ booking, onCancelPress, onDetailsPress }) {
  const isOngoing =
    booking.status === "KEY_TAKEN" ||
    booking.status === "RETURN_PENDING" ||
    booking.status === "APPROVED_RETURN"; 

  const bikeNumber =
    booking.bicycle?.bicycleNumber || `#${booking.bicycleId}`;

  return (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeaderRow}>
        <Text style={styles.bookingTitle}>
          {isOngoing ? "Ongoing ride" : "Upcoming booking"}
        </Text>
        <Text
          style={[
            styles.bookingStatus,
            { color: isOngoing ? COLORS.primary : COLORS.textSecondary },
          ]}
        >
          {booking.status}
        </Text>
      </View>

      <Text style={styles.bookingBike}>Bicycle {bikeNumber}</Text>

      <Text style={styles.bookingInfo}>
        Helmet: {booking.helmetRequired ? "Required" : "Not required"}
      </Text>

      {booking.note && (
        <Text style={styles.bookingNote}>Note: {booking.note}</Text>
      )}

      <View style={styles.bookingButtonsRow}>
        {!isOngoing && (
          <TouchableOpacity
            style={styles.bookingCancelButton}
            onPress={onCancelPress}
          >
            <Text style={styles.bookingCancelText}>Cancel booking</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.bookingDetailsButton}
          onPress={onDetailsPress}
        >
          <Text style={styles.bookingDetailsText}>
            {isOngoing ? "View ride" : "View details"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bookingCard: {
      backgroundColor: COLORS.card,
      borderRadius: 20,
      padding: 16,
      marginBottom: 24,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
    },
    bookingHeaderRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6,
    },
    bookingTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: COLORS.textMain,
    },
    bookingStatus: {
      fontSize: 12,
      fontWeight: "600",
    },
    bookingBike: {
      fontSize: 15,
      fontWeight: "600",
      color: COLORS.textMain,
      marginTop: 4,
    },
    bookingInfo: {
      marginTop: 4,
      fontSize: 13,
      color: COLORS.textSecondary,
    },
    bookingNote: {
      marginTop: 4,
      fontSize: 12,
      color: COLORS.textSecondary,
    },
    bookingButtonsRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 12,
    },
    bookingCancelButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 18,
      backgroundColor: COLORS.booked, // your red colour
      marginRight: 8,
    },
    bookingCancelText: {
      color: "#fff",
      fontSize: 13,
      fontWeight: "600",
    },
    bookingDetailsButton: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 18,
      backgroundColor: COLORS.primaryDark,
    },
    bookingDetailsText: {
      color: "#fff",
      fontSize: 13,
      fontWeight: "600",
    }
});