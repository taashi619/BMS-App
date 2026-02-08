import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import TabNavigator from "./TabNavigator";
import StarterScreen from "../screens/StarterScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Starter" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Starter" component={StarterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}
