import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import PaymentScreen from "../screens/PaymentScreen";
import ReportIssueScreen from "../screens/ReportIssueScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: () => <Ionicons name="bicycle" size={22} /> }}
      />
      <Tab.Screen
        name="Report"
        component={ReportIssueScreen}
        options={{ tabBarIcon: () => <Ionicons name="alert-circle-outline" size={22} /> }}
      />
      <Tab.Screen
        name="Payments"
        component={PaymentScreen}
        options={{ tabBarIcon: () => <Ionicons name="card-outline" size={22} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: () => <Ionicons name="person-outline" size={22} /> }}
      />
    </Tab.Navigator>
  );
}
