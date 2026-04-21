import React from "react";
import { Platform, Text } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Colors from "../constants/Colors";

import GetStartScreen from "../screens/user/GetStartScreen/GetStartScreen";
import LoginScreen from "../screens/user/LoginScreen/LoginScreen";
import SignUpScreen from "../screens/user/SignUpScreen/SignUpScreen";
import ForgotPasswordScreen from "../screens/user/ForgotPasswordScreen/ForgotPasswordScreen";
import HomeScreen from "../screens/dashboard/HomeScreen/HomeScreen";
import AccountScreen from "../screens/new-account/AccountScreen/AccountScreen";
import NotificationScreen from "../screens/notification/NotificationScreen/NotificationScreen";
import PromotionScreen from "../screens/promotion/PromotionScreen/PromotionScreen";
import PointHistoryScreen from "../screens/pointHistory/PointHistoryScreen/PointHistoryScreen";
import AccountDashboardScreen from "../screens/user/AccountDashboardScreen/AccountDashboardScreen";
import HelpScreen from "../screens/user/HelpScreen/HelpScreen";
import FaqScreen from "../screens/dashboard/FaqScreen/FaqScreen";
import AboutScreen from "../screens/dashboard/AboutScreen/AboutScreen";
import AccountVerificationScreen from "../screens/user/AccountVerificationScreen/AccountVerificationScreen";
import TermsAndConditionsScreen from "../screens/dashboard/TermsAndConditionsScreen/TermsAndConditionsScreen";
import SuccessScreen from "../screens/user/SuccessScreen/SuccessScreen";
import SettingScreen from "../screens/user/SettingScreen/SettingScreen";
import OutletLocationsScreen from "../screens/user/OutletLocationsScreen/OutletLocationsScreen";
import LanguageScreen from "../screens/user/LanguageScreen/LanguageScreen";
import DeactivateScreen from "../screens/user/DeactivateScreen/DeactivateScreen";

// Temporary translate helper.
// Replace with your own i18n function later if needed.
const translate = (key) => {
  const labels = {
    home: "Home",
    promotions: "Promotions",
    help: "Help",
    setting: "Setting",
  };

  return labels[key] || key;
};

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
    height: Platform.OS === "android" ? 80 : 120,
    shadowColor: "transparent",
    elevation: 0,
  },
  headerShown: false,
  headerTintColor: "transparent",
  headerTitleAlign: "center",
};

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function DashboardNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function PointHistoryNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="PointHistory" component={PointHistoryScreen} />
    </Stack.Navigator>
  );
}

function AccountNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="MyAccount" component={AccountScreen} />
    </Stack.Navigator>
  );
}

function SettingNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
}

function LanguageNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Language" component={LanguageScreen} />
    </Stack.Navigator>
  );
}

function DeactivateNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Deactivate" component={DeactivateScreen} />
    </Stack.Navigator>
  );
}

function OutletNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="OutLetLocation" component={OutletLocationsScreen} />
    </Stack.Navigator>
  );
}

function AboutNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="AboutUs" component={AboutScreen} />
    </Stack.Navigator>
  );
}

function TermAndConditionNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="TermAndCondition"
        component={TermsAndConditionsScreen}
      />
    </Stack.Navigator>
  );
}

function PromotionNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Promotion" component={PromotionScreen} />
    </Stack.Navigator>
  );
}

function HelpNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Faq" component={FaqScreen} />
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="GetStart"
      screenOptions={defaultScreenOptions}
    >
      <Stack.Screen name="GetStart" component={GetStartScreen} />
      <Stack.Screen name="SignIn" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="AccountDashboard"
        component={AccountDashboardScreen}
      />
      <Stack.Screen
        name="AccountVerification"
        component={AccountVerificationScreen}
      />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen
        name="TermAndCondition"
        component={TermsAndConditionsScreen}
      />
    </Stack.Navigator>
  );
}

function NotificationNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      activeColor={Colors.yellow}
      inactiveColor={Colors.white}
      barStyle={{
        backgroundColor: Colors.primary,
      }}
      labeled={true}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardNavigator}
        options={{
          tabBarLabel: (
            <Text
              style={{
                color: Colors.white,
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              {translate("home")}
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-sharp" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Promotion"
        component={PromotionNavigator}
        options={{
          tabBarLabel: (
            <Text
              style={{
                color: Colors.white,
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              {translate("promotions")}
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="campaign" size={26} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Help"
        component={HelpNavigator}
        options={{
          tabBarLabel: (
            <Text
              style={{
                color: Colors.white,
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              {translate("help")}
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="help-circle" size={22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={SettingNavigator}
        options={{
          tabBarLabel: (
            <Text
              style={{
                color: Colors.white,
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              {translate("setting")}
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-sharp" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="MyAccount" component={AccountNavigator} />
      <Stack.Screen name="Language" component={LanguageNavigator} />
      <Stack.Screen name="Deactivate" component={DeactivateNavigator} />
      <Stack.Screen name="PointHistory" component={PointHistoryNavigator} />
      <Stack.Screen name="Notification" component={NotificationNavigator} />
      <Stack.Screen name="OutLetLocation" component={OutletNavigator} />
      <Stack.Screen name="AboutUs" component={AboutNavigator} />
      <Stack.Screen
        name="TermAndCondition"
        component={TermAndConditionNavigator}
      />
    </Stack.Navigator>
  );
}
