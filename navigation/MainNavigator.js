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
import AccountScreen from "../screens/account/AccountScreen/AccountScreen";
import NotificationScreen from "../screens/notification/NotificationScreen/NotificationScreen";
import PromotionScreen from "../screens/promotion/PromotionScreen/PromotionScreen";
import PointHistoryScreen from "../screens/pointHistory/PointHistoryScreen/PointHistoryScreen";
import AccountDashboardScreen from "../screens/user/AccountDashboardScreen/AccountDashboardScreen";
import HelpScreen from "../screens/user/HelpScreen/HelpScreen";
import FaqScreen from "../screens/dashboard/FaqScreen/FaqScreen";
import AboutScreen from "../screens/dashboard/AboutScreen/AboutScreen";
import TermsAndConditionsScreen from "../screens/dashboard/TermsAndConditionsScreen/TermsAndConditionsScreen";
import {translate} from "react-native-translate";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" ? Colors.primary : Colors.primary,
    height: 80,
    shadowColor: "transparent", // this covers iOS
    elevation: 0,
  },
  headerTitleStyle: { flex: 1 },
  headerBackTitleStyle: {},
  headerTitleAlign: "left | center",
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
    Help: HelpScreen,
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
  PointHistory: {
    screen: PointHistoryNavigator,
    navigationOptions: {
      tabBarLabel: (
        <Text
          style={{
            color: Colors.yellow,
          }}
        >
          {translate("pointhistory")}
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
  Notification: {
    screen: NotificationNavigator,
    navigationOptions: {
      tabBarLabel: (
        <Text
          style={{
            color: Colors.yellow,
          }}
        >
          {translate("notification")}
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
    AboutUs: AboutNavigator,
    Faq: FaqNavigator,
    TermAndCondition: TermAndConditionNavigator,
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
