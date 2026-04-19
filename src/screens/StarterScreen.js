import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from "react-native";
import { COLORS } from "../constants/theme";
import AppLogo from "../components/AppLogo";

export default function StarterScreen({ navigation }) {
  const wheelSpin = useRef(new Animated.Value(0)).current;
  const bikeSlide = useRef(new Animated.Value(60)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // wheel rotation: infinite
    Animated.loop(
      Animated.timing(wheelSpin, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // bike + text entrance
    Animated.parallel([
      Animated.timing(bikeSlide, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    // after delay, go to Login
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, wheelSpin, bikeSlide, fadeIn]);

  const rotate = wheelSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {/* teal top block */}
      <View style={styles.topBlock} />

      {/* animated bike and title */}
      <View style={styles.centerContent}>
        <Animated.View
          style={[
            styles.bikeWrapper,
            { transform: [{ translateY: bikeSlide }] },
          ]}
        >
          {/* faint background circle */}
          <View style={styles.circleBg} />

          {/* your circular logo component */}
          <AppLogo size={110} showText={false} />

          {/* spinning wheel overlay (simple circle) */}
          <Animated.View
            style={[
              styles.wheelOverlay,
              {
                transform: [{ rotate }],
              },
            ]}
          />
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeIn,
            marginTop: 24,
            alignItems: "center",
          }}
        >
          <View style={styles.logoRow}>
            <Text style={styles.logoWordmark}>Uni Bike</Text>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>Campus</Text>
            </View>
          </View>

          <View style={styles.logoUnderline} />

          <Text style={styles.tagline}>
            Book, ride, and return.
          </Text>
        </Animated.View>
      </View>

      {/* bottom hint */}
      <Animated.Text style={[styles.bottomHint, { opacity: fadeIn }]}>
        Loading your rides…
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBlock: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  bikeWrapper: {
    width: 220,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  circleBg: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  bikeImage: {
    width: "90%",
    height: "90%",
    tintColor: "#ffffff",
  },
  wheelOverlay: {
    position: "absolute",
    bottom: 22,
    right: 34,
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    borderColor: "#ffffff",
    borderStyle: "dashed",
  },

  // wordmark + tagline
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoWordmark: {
    fontSize: 40,
    fontFamily: "UniBikeScript", // make sure this custom font is loaded
    color: COLORS.textMain,
    letterSpacing: 1,
    transform: [{ rotate: "-3deg" }],
  },
  logoBadge: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  logoBadgeText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "600",
  },
  logoUnderline: {
    marginTop: 6,
    width: 90,
    height: 2,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  tagline: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  bottomHint: {
    textAlign: "center",
    marginBottom: 32,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
