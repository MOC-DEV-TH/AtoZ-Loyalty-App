import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform, Text, } from "react-native";
import Colors from "../constants/Colors";

import LoginScreen from "../screens/user/LoginScreen/LoginScreen";
import SignUpScreen from "../screens/user/SignUpScreen/SignUpScreen";
import ForgotPasswordScreen from "../screens/user/ForgotPasswordScreen/ForgotPasswordScreen";
import HomeScreen from "../screens/dashboard/HomeScreen/HomeScreen";
import AccountScreen from "../screens/account/AccountScreen/AccountScreen";
import NotificationScreen from "../screens/notification/NotificationScreen/NotificationScreen";
import PromotionScreen from "../screens/promotion/PromotionScreen/PromotionScreen";
import PointHistoryScreen from "../screens/pointHistory/PointHistoryScreen/PointHistoryScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" ? Colors.primary : Colors.primary,
    height: 65,
    shadowColor: "transparent", // this covers iOS
    elevation: 0,
  },
  headerTitleStyle: {},
  headerBackTitleStyle: {},
  titleStyle: {},
  labelStyle: {},
  headerTintColor: Platform.OS === "android" ? Colors.primary : Colors.primary,
};

const DashboardNavigator = createStackNavigator(
  {
    Home: HomeScreen,
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

const PointHistoryNavigator = createStackNavigator(
  {
    PointHistory: PointHistoryScreen,
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
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AuthNavigator = createStackNavigator(
  {
    SignIn: LoginScreen,
    SignUp: SignUpScreen,
    ForgotPassword: ForgotPasswordScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const tabScreenConfig = {
  Dashboard: {
    screen: DashboardNavigator,
    navigationOptions: {
      tabBarLabel: (
        <Text
          style={{
            color: Colors.primary,
          }}
        >
          Home
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
        return <Ionicons name="ios-apps" size={20} color={tabInfo.tintColor} />;
      },
    },
  },
  PointHistory: {
    screen: PointHistoryNavigator,
    navigationOptions: {
      tabBarLabel: (
        <Text
          style={{
            color: Colors.primary,
          }}
        >
          PointHistory
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
            name="ios-bookmarks-outline"
            size={20}
            color={tabInfo.tintColor}
          />
        );
      },
    },
  },
  Promotion: {
    screen: PromotionNavigator,
    navigationOptions: {
      tabBarLabel: (
        <Text
          style={{
            color: Colors.primary,
          }}
        >
          Promotion
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
            name="ios-briefcase-outline"
            size={20}
            color={tabInfo.tintColor}
          />
        );
      },
    },
  },
  Notification: {
    screen: NotificationNavigator,
    navigationOptions: {
      tabBarLabel: (
        <Text
          style={{
            color: Colors.primary,
          }}
        >
          Notification
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
            name="ios-notifications-outline"
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
        activeColor: Colors.primary,
        inactiveColor: Colors.dimGray,
        showLabel: false,
        shifting: true,
        barStyle: {
          backgroundColor: "#f2f2f2",
          // fontFamily: ShareStyles.MyanmarFontBold
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: "#3B3B3B",
          showLabel: false,
        },
      });

const Navigator = createSwitchNavigator(
  {
    Startup : SignUpScreen,
    Auth: AuthNavigator,
    Main: MainTabNavigator,
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
