import React, { useState, useEffect } from "react";
import { View, Platform, LogBox, StatusBar } from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { registerRootComponent } from "expo";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { storeData } from "./AsyncStorage/AsyncStorage";
import AsyncStorageKey from "./constants/AsyncStorageKey";
import authReducer from "./store/reducers/auth";
import userReducer from "./store/reducers/users";
import homeReducer from "./store/reducers/home";
import promotionReducer from "./store/reducers/promotions";
import myAccountReducer from "./store/reducers/myAccount";
import pointHistoryReducer from "./store/reducers/point_history";
import notificationReducer from "./store/reducers/notification";
import { extendTheme, NativeBaseProvider } from "native-base";
import Colors from "./constants/Colors";
import { useFonts } from "expo-font";

// ✅ FIX 1: correct imports
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigation/RootNavigation";
import AppNavigator from "./navigation/NavigationContainer";

LogBox.ignoreAllLogs();

const rootReducer = combineReducers({
  auth: authReducer,
  myAccount: myAccountReducer,
  promotion: promotionReducer,
  homeScreen: homeReducer,
  pointHistory: pointHistoryReducer,
  user: userReducer,
  notification: notificationReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function App() {
  const [expoPushToken, setExpoPushToken] = useState("");

  const [fontsLoaded] = useFonts({
    "En-Heading-Font": require("./assets/fonts/Helvetica/HelveticaLTStd-Bold.otf"),
    "En-Body-Font": require("./assets/fonts/Helvetica/HelveticaLTStd-Light.otf"),
    "My-Heading-Font": require("./assets/fonts/Padauk/Padauk-Bold.ttf"),
    "My-Body-Font": require("./assets/fonts/Padauk/Padauk-Regular.ttf"),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });
  }, []);

  useEffect(() => {
    const requestPermissionsAsync = async () => {
      try {
        return await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
          },
        });
      } catch (error) {
        throw Error(error);
      }
    };

    requestPermissionsAsync();
  }, []);

  useEffect(() => {
    storeData(AsyncStorageKey.IS_LOGIN, "0");
    console.log("Device Type", Device.DeviceType);
  }, []);

  if (!fontsLoaded) return null;

  const theme = extendTheme({
    useSystemColorMode: true,
    components: {
      Button: {
        baseStyle: {
          rounded: "full",
        },
      },
    },
    colors: {
      ...Colors,
    },
    fontConfig: {
      EnFont: {
        400: { normal: "En-Body-Font" },
        700: { normal: "En-Heading-Font" },
      },
      MyFont: {
        400: { normal: "My-Body-Font" },
        700: { normal: "My-Heading-Font" },
      },
    },
    fonts: {
      enFont: "EnFont",
      myFont: "MyFont",
      body: "MyFont",
    },
  });

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer ref={navigationRef}>
          <View style={{ flex: 1 }}>
            <StatusBar
              backgroundColor={Colors.primary}
              barStyle="light-content"
            />
            <AppNavigator />
          </View>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

registerRootComponent(App);

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token!");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("ExpoToken:", token);
    storeData(AsyncStorageKey.EXPO_TOKEN, token);
  } else {
    alert("Use real device for Push Notifications");
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return token;
}

export default App;