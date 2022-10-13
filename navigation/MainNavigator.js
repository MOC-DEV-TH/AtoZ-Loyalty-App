import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform, Text, View } from "react-native";
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
import { translate } from "react-native-translate";
import LanguageScreen from "../screens/user/LanguageScreen/LanguageScreen";
import { Box } from "native-base";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" ? Colors.primary : Colors.primary,
    height: Platform.OS === "android" ? 80 : 120,
    shadowColor: "transparent", // this covers iOS
    elevation: 0,
  },
  headerBackTitleStyle: {},
  headerTitleAlign: "left | center",
  titleStyle: {},
  labelStyle: {},
  headerTintColor: Platform.OS === "android" ? "transparent" : "transparent",
};

const DashboardNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    PointHistory: PointHistoryScreen,
    Notification: NotificationScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AccountNavigator = createStackNavigator(
  {
    MyAccount: AccountScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const SettingNavigator = createStackNavigator(
  {
    Setting: SettingScreen,
    MyAccount: AccountScreen,
    Notification: NotificationScreen,
    OutLetLocation: OutletLocationsScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const LanguageNavigator = createStackNavigator({
  Language: LanguageScreen,
});

const AboutNavigator = createStackNavigator(
  {
    AboutUs: AboutScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const TermAndConditionNavigator = createStackNavigator(
  {
    TermAndCondition: TermsAndConditionsScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const PromotionNavigator = createStackNavigator(
  {
    Promotion: PromotionScreen,
    Notification: NotificationScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
const HelpNavigator = createStackNavigator(
  {
    Help: HelpScreen,
    Notification: NotificationScreen,
    Faq: FaqScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AuthNavigator = createStackNavigator(
  {
    GetStart: GetStartScreen,
    SignIn: LoginScreen,
    SignUp: SignUpScreen,
    ForgotPassword: ForgotPasswordScreen,
    AccountDashboard: AccountDashboardScreen,
    AccountVerification: AccountVerificationScreen,
    Success: SuccessScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const tabScreenConfig = {
  Dashboard: {
    screen: DashboardNavigator,
    navigationOptions: {
      tabBarColor: { color: Colors.yellow },
      activeColor: Colors.white,
      inactiveColor: Colors.white,
      tabBarLabel: (tabInfo) => {
        return (
          <Text
            style={{
              color: Colors.white,
              alignItems: "center",
              justifyContent: "center",
              alignSelf:"center",
              fontSize: 10,
            }}
          >
            {translate("home")}
          </Text>
        );
      },
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-apps" size={20} color={tabInfo.tintColor} style={{marginBottom:-8}} />;
      },
    },
  },
  Promotion: {
    screen: PromotionNavigator,
    navigationOptions: {
      tabBarLabel: (tabInfo) => {
        return (
          <Text
            style={{
              color: Colors.white,
              alignItems: "center",
              justifyContent: "center",
              alignSelf:"center",
              fontSize: 10,
            }}
          >
            {translate("promotions")}
          </Text>
        );
      },
      activeColor: Colors.yellow,
      inactiveColor: Colors.white,
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="ios-briefcase-outline"
            size={20}
            color={tabInfo.tintColor}
            style={{marginBottom:-8}}
          />
        );
      },
    },
  },
  Help: {
    screen: HelpNavigator,
    navigationOptions: {
      tabBarLabel: (tabInfo) => {
        return (
          <Text
            style={{
              color: Colors.white,
              alignItems: "center",
              justifyContent: "center",
              alignSelf:"center",
              fontSize: 10,
            }}
          >
            {translate("help")}
          </Text>
        );
      },
      activeColor: Colors.yellow,
      inactiveColor: Colors.white,
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="help-circle-outline"
            size={20}
            color={tabInfo.tintColor}
            style={{marginBottom:-8}}
          />
        );
      },
    },
  },
  Setting: {
    screen: SettingNavigator,
    navigationOptions: {
      tabBarLabel: (tabInfo) => {
        return (
          <Text
            style={{
              color: Colors.white,
              alignItems: "center",
              justifyContent: "center",
              alignSelf:"center",
              fontSize: 10,
            }}
          >
            {translate("setting")}
          </Text>
        );
      },
      activeColor: Colors.yellow,
      inactiveColor: Colors.white,
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="settings-sharp" size={20} color={tabInfo.tintColor}  style={{marginBottom:-8}}/>
        );
      },
    },
  },
};

const MainTabNavigator =
  createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.yellow,
          inactiveTintColor: Colors.white,
          labeled: true,
          style: {
            backgroundColor: Colors.primary,
            justifyContent:"center",
            alignItems:"center",
            paddingBottom:10,
            height:Platform.OS === "android" ? 55 :30
          },
        },
      });

const Navigator = createSwitchNavigator(
  {
    Startup: SignUpScreen,
    Auth: AuthNavigator,
    Main: MainTabNavigator,
    MyAccount: AccountNavigator,
    TermAndCondition: TermAndConditionNavigator,
    Language: LanguageNavigator,
  },
  {
    initialRouteName: "Auth",
  }
);

const AppNavigator = createAppContainer(Navigator);

export default class MainNavigator extends React.Component {
  render() {
    return <AppNavigator></AppNavigator>;
  }
}
