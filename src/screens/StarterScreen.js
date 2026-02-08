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
            {/* teal gradient-like background */}
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
                    <AppLogo size={110} showText={true} />

                    {/* bike illustration – reuse your asset */}
                    {/* <Image
            source={require("../../assets/bike.jpg")}
            style={styles.bikeImage}
            resizeMode="contain"
          /> */}

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

                <Animated.View style={{ opacity: fadeIn, marginTop: 24 }}>
                    <Text style={styles.appName}>Campus Bike</Text>
                    <Text style={styles.tagline}>
                        Unlock, ride and share bicycles around your campus.
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
        tintColor: "#ffffff", // optional if your asset allows tint
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
    appName: {
        fontSize: 26,
        fontWeight: "700",
        color: COLORS.textMain,
        textAlign: "center",
    },
    tagline: {
        marginTop: 6,
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
