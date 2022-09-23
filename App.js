import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import React, { useState, useEffect, useRef } from "react";
import { registerRootComponent } from "expo";
import NavigationContainer from "./navigation/NavigationContainer";
import * as SplashScreen from "expo-splash-screen";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { getStoreData } from "./AsyncStorage/AsyncStorage";
import AsyncStorageKey from "./constants/AsyncStorageKey";
import i18n from "./I18n/i18n";
import * as Localization from "expo-localization";
import authReducer from "./store/reducers/auth";
import homeReducer from "./store/reducers/home";
import myAccountReducer from "./store/reducers/myAccount";
import { extendTheme, NativeBaseProvider } from "native-base";
import Colors from "./constants/Colors";

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  myAccount : myAccountReducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
    primary: Colors.primary,
    white: Colors.white,
  },
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [isChecking, setIsChecking] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  //Set the locale once at the beginning of your app.
  useEffect(() => {
    i18n.local = Localization.locale;
  });

  //request permission
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
    return;
  }, []);

  //delay splash screen
  useEffect(() => {});
  const asyncDoThings = async () => {
    return () => {
      clearTimeout(timeout);
    };
  };

  //init notification
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  //check language
  useEffect(() => {
    getStoreData().then((value) => {
      if (value == AsyncStorageKey.LANGUAGE_MM) {
        i18n.locale = "my";
      } else if (value == AsyncStorageKey.LANGUAGE_ENG) {
        i18n.locale = "en";
      } else {
        i18n.locale = "chn";
      }
    });
  }, []);

  if (isChecking) {
    return (
      <AppLoading
        startAsync={() => asyncDoThings()}
        onFinish={() => setIsChecking(false)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <View style={{ flex: 1 }}>
          <NavigationContainer />
        </View>
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
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
