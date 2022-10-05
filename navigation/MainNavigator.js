import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform, Text } from "react-native";
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
import {translate} from "react-native-translate";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" ? Colors.primary : Colors.primary,
    height: 75,
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
    Notification : NotificationScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AboutNavigator = createStackNavigator(
  {
    AboutUs: AboutScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
const FaqNavigator = createStackNavigator(
  {
    Faq: FaqScreen,
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
const NotificationNavigator = createStackNavigator(
  {
    Notification: NotificationScreen,
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
    TermAndCondition: TermsAndConditionsScreen,
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
    AccountVerification : AccountVerificationScreen,
    Success : SuccessScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const tabScreenConfig = {
  Dashboard: {
    screen: DashboardNavigator,
    navigationOptions: {
      tabBarColor : {color:Colors.yellow},
      tabBarLabel: (
        <Text
          style={{
            color: Colors.yellow,
          }}
        >
          {translate("home")}
        </Text>
      ),
      tabBarOptions: {
        activeTintColor: Colors.yellow,
        labelStyle: {
          fontSize: 10,
          color: Colors.yellow,
        },
      },
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-apps" size={20} color={tabInfo.tintColor} />;
      },
    },
  },
  Promotion: {
    screen: PromotionNavigator,
    navigationOptions: {
      tabBarLabel: (
        <Text
          style={{
            color: Colors.yellow,
          }}
        >
          {translate("promotions")}
        </Text>
      ),
      tabBarOptions: {
        activeTintColor: Colors.white,
        labelStyle: {
          fontSize: 10,
          color: Colors.primary,
        },
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="ios-briefcase-outline"
            size={20}
            color={tabInfo.tintColor}
          />
        );
      },
    },
  },
  Help: {
    screen: HelpNavigator,
    navigationOptions: {
      tabBarLabel: (
        <Text
          style={{
            color: Colors.yellow,
          }}
        >
          {translate("help")}
        </Text>
      ),
      tabBarOptions: {
        activeTintColor: Colors.primary,
        labelStyle: {
          fontSize: 10,
          color: Colors.white,
        },
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="help-circle-outline"
            size={20}
            color={tabInfo.tintColor}
          />
        );
      },
    },
  },
  Setting: {
    screen: SettingNavigator,
    navigationOptions: {
      tabBarLabel: (
        <Text
          style={{
            color: Colors.yellow,
          }}
        >
          Setting
        </Text>
      ),
      tabBarOptions: {
        activeTintColor: Colors.primary,
        labelStyle: {
          fontSize: 10,
          color: Colors.primary,
        },
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="settings"
            size={20}
            color={tabInfo.tintColor}
          />
        );
      },
    },
  },
};


const MainTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: Colors.yellow,
        inactiveColor: Colors.yellow,
        showLabel : true,
        labeled : true,
        barStyle: {
          backgroundColor: Colors.primary,
          // fontFamily: ShareStyles.MyanmarFontBold
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: "#3B3B3B",
          labeled:true
        },
      });

const Navigator = createSwitchNavigator(
  {
    Startup: SignUpScreen,
    Auth: AuthNavigator,
    Main: MainTabNavigator,
    MyAccount: AccountNavigator,
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
