// src/api/axios.js
import axios from "axios";
import { Platform } from "react-native";

const baseURL =
  Platform.OS === "android"
    ? "http://192.168.0.15:5000" // Android emulator
    : "http://localhost:5000"; // iOS simulator

const api = axios.create({
  baseURL,
  timeout: 5000,
});

export default api;
