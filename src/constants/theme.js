import { Appearance } from "react-native";
export const SIZES = {
  padding: 20,
  radius: 12,
};

export const SHADOW = {
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 3,
};

const colorScheme = Appearance.getColorScheme(); // light or dark

const LightTheme = {
  background: "#F4F6FA",
  card: "#FFFFFF",
  text: "#1C1C1E",
  subtext: "#6B7280",
  primary: "#4C6EF5",
  border: "#E5E7EB",
};

const DarkTheme = {
  background: "#0D1117",
  card: "#161B22",
  text: "#E6EDF3",
  subtext: "#8B949E",
  primary: "#4C8FFF",
  border: "#30363D",
};

export default colorScheme === "dark" ? DarkTheme : LightTheme;
