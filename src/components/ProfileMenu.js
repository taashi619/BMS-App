import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { COLORS } from "../constants/theme";

export default function ProfileMenu({ visible, onClose, onProfile, onBookings }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.item} onPress={onProfile}>
            <Text style={styles.itemText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={onBookings}>
            <Text style={styles.itemText}>My bookings</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 60,
    paddingRight: 16,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  menu: {
    width: 170,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 14,
    color: COLORS.textMain,
  },
});
