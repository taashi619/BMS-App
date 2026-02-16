import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import BookingScreen from "../screens/BookingScreen";
import CountdownScreen from "../screens/CountdownScreen";
import AllBicyclesScreen from "../screens/AllBicyclesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MyBookingsScreen from "../screens/MyBookingsScreen";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* main Home tab screen */}
      <Stack.Screen name="HomeMain" component={HomeScreen} />

      {/* screens reachable from Home */}
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="Countdown" component={CountdownScreen} />
      <Stack.Screen name="AllBicycles" component={AllBicyclesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
<Stack.Screen name="MyBookings" component={MyBookingsScreen} />

    </Stack.Navigator>
  );
}
