import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import TabNavigator from "./TabNavigator";
import BookingScreen from "../screens/BookingScreen";
import CountdownScreen from "../screens/CountdownScreen";
import AllBicyclesScreen from "../screens/AllBicyclesScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="Countdown" component={CountdownScreen} />
      <Stack.Screen name="AllBicycles" component={AllBicyclesScreen} />
    </Stack.Navigator>
  );
}
