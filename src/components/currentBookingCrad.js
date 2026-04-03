import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

function formatDuration(ms) {
  const isNegative = ms < 0;
  const absMs = Math.abs(ms);

  const totalSeconds = Math.floor(absMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const core =
    hours > 0
      ? `${hours}h ${minutes}m ${seconds}s`
      : minutes > 0
      ? `${minutes}m ${seconds}s`
      : `${seconds}s`;

  if (isNegative) {
    return `${core} overdue`;
  }
  return core;
}

export default function CurrentBookingCard({
  booking,
  onCancelPress,
  onReturnKeyPress,
  onDetailsPress,
}) {
  const isOngoing =
    booking.status === "KEY_TAKEN" ||
    booking.status === "RETURN_PENDING" ||
    booking.status === "APPROVED_RETURN";

  const bikeNumber =
    booking.bicycle?.bicycleNumber || `#${booking.bicycleId}`;

  const [remainingMs, setRemainingMs] = useState(0);
  const [hasRequestedReturn, setHasRequestedReturn] = useState(
    booking.status === "RETURN_PENDING"
  );

  useEffect(() => {
    // if no planned return or user already requested, do not keep counting
    if (!booking.returnTime || hasRequestedReturn) return;

    const update = () => {
      const now = Date.now();
      const target = new Date(booking.returnTime).getTime();
      setRemainingMs(target - now);
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [booking.returnTime, hasRequestedReturn]);

  const isOverdue = remainingMs < 0;
  const isClose =
    remainingMs > 0 && remainingMs <= 30 * 60 * 1000; // last 30 min

  const showReturnButton =
    isOngoing &&
    booking.status === "KEY_TAKEN" &&
    !hasRequestedReturn;

  const handleReturnPress = async () => {
    // immediately update UI
    setHasRequestedReturn(true);
    try {
      await onReturnKeyPress();
    } catch (e) {
      console.log("Return key handler error:", e);
    }
  };

  const hasFine = Number(booking.fineAmount || 0) > 0;

  return (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeaderRow}>
        <View>
          <Text style={styles.bookingTitle}>
            {isOngoing ? "Ongoing ride" : "Upcoming booking"}
          </Text>
          <Text style={styles.bookingBike}>Bicycle {bikeNumber}</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            isOngoing ? styles.statusOngoing : styles.statusUpcoming,
          ]}
        >
          <Text style={styles.statusText}>{booking.status}</Text>
        </View>
      </View>

      <Text style={styles.bookingInfo}>
        Helmet: {booking.helmetRequired ? "Required" : "Not required"}
      </Text>

      {booking.note && (
        <Text style={styles.bookingNote}>Note: {booking.note}</Text>
      )}

      {/* Message after student clicks "Return bicycle key" */}
      {hasRequestedReturn && (
        <View style={styles.finishedBox}>
          <Text style={styles.finishedTitle}>Thanks for the ride!</Text>
          {hasFine ? (
            <Text style={styles.finishedText}>
              A provisional late-return fee of{" "}
              <Text style={styles.finishedFine}>
                £{Number(booking.fineAmount).toFixed(2)}
              </Text>{" "}
              is calculated for this trip. A staff member will review and
              confirm your ride shortly.
            </Text>
          ) : (
            <Text style={styles.finishedText}>
              For now there is no fine on this ride. A staff member will review
              and approve your return soon.
            </Text>
          )}
        </View>
      )}

      {booking.returnTime && (
        <View style={styles.countdownRow}>
          <Text style={styles.countdownLabel}>
            {hasRequestedReturn
              ? "Return requested – waiting for staff approval"
              : isOverdue
              ? "You are past the planned return time:"
              : "Time remaining before return:"}
          </Text>
          <Text
            style={[
              styles.countdownValue,
              !hasRequestedReturn && isOverdue && styles.countdownOverdue,
              !hasRequestedReturn &&
                !isOverdue &&
                isClose &&
                styles.countdownWarning,
            ]}
          >
            {hasRequestedReturn ? "" : formatDuration(remainingMs)}
          </Text>
        </View>
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

        {showReturnButton && (
          <TouchableOpacity
            style={styles.returnButton}
            onPress={handleReturnPress}
          >
            <Text style={styles.returnButtonText}>Return bicycle key</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.bookingDetailsButton}
          onPress={onDetailsPress}
        >
          <Text style={styles.bookingDetailsText}>
            {isOngoing ? "View ride details" : "View booking details"}
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
  bookingBike: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textMain,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusOngoing: {
    backgroundColor: COLORS.primary,
  },
  statusUpcoming: {
    backgroundColor: COLORS.textSecondary,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
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
  finishedBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "rgba(46, 204, 113, 0.12)",
  },
  finishedTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textMain,
    marginBottom: 4,
  },
  finishedText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  finishedFine: {
    fontWeight: "700",
    color: COLORS.primaryDark,
  },
  countdownRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countdownLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
    marginRight: 8,
  },
  countdownValue: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textMain,
  },
  countdownWarning: {
    color: "#f0ad4e",
  },
  countdownOverdue: {
    color: "#d9534f",
  },
  bookingButtonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    flexWrap: "wrap",
  },
  bookingCancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: COLORS.booked,
    marginRight: 8,
  },
  bookingCancelText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  returnButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: "#f0ad4e",
    marginRight: 8,
  },
  returnButtonText: {
    color: "#222",
    fontSize: 13,
    fontWeight: "700",
  },
  bookingDetailsButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: COLORS.primaryDark,
    marginTop: 4,
  },
  bookingDetailsText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});