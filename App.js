import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  LogBox,
  YellowBox
} from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { registerRootComponent } from "expo";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { getStoreData, storeData } from "./AsyncStorage/AsyncStorage";
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
import navigationRef from "./navigation/RootNavigation";
import NavigationContainer from "./navigation/NavigationContainer";
import * as SplashScreen from 'expo-splash-screen';
import * as authActions from "./store/actions/auth";

console.disableYellowBox = true;
LogBox.ignoreAllLogs();
YellowBox.ignoreWarnings(['Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`']);
LogBox.ignoreLogs([
    'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
    'NativeBase: The contrast ratio of',
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
])
//open database
//const db = SQLite.openDatabase("db.aToz");

const rootReducer = combineReducers({
  auth: authReducer,
  myAccount: myAccountReducer,
  promotion: promotionReducer,
  homeScreen: homeReducer,
  pointHistory: pointHistoryReducer,
  user: userReducer,
  notification: notificationReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default App = (props) => {
  const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
  const [expoPushToken, setExpoPushToken] = useState("");
 
  const [fontsLoaded] = useFonts({
    "En-Heading-Font": require("./assets/fonts/Helvetica/HelveticaLTStd-Bold.otf"),
    "En-Body-Font": require("./assets/fonts/Helvetica/HelveticaLTStd-Light.otf"),
    "My-Heading-Font": require("./assets/fonts/Padauk/Padauk-Bold.ttf"),
    "My-Body-Font": require("./assets/fonts/Padauk/Padauk-Regular.ttf"),
  });

  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }
  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);
  useEffect(() => {
    setTimeout(() => SplashScreen.hideAsync(), 2000);
  }, []);
  
  const handleNewNotification = async (notificationObject) => {
    try {
      const newNotification = {
        id: notificationObject.messageId,
        date: notificationObject.sentTime,
        title: notificationObject.data.title,
        body: notificationObject.data.message,
        data: JSON.parse(notificationObject.data.body),
      };
      navigationRef.navigate("SignIn");
      console.log(newNotification.title);
      //addToDatabase(db,newNotification.title, newNotification.body);
      await Notifications.setBadgeCountAsync(1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    registerForPushNotificationsAsync().then((token) => {
          setExpoPushToken(token);
        });
  })
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

  useEffect(()=>{
    storeData(AsyncStorageKey.IS_LOGIN,"0")
    console.log("Device Type",Device.DeviceType)
  },[])

  // is font ready?
  if (!fontsLoaded) {
    return null;
  } else {
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
          400: {
            normal: "En-Body-Font",
          },
          700: {
            normal: "En-Heading-Font",
          },
        },
        MyFont: {
          400: {
            normal: "My-Body-Font",
          },
          700: {
            normal: "My-Heading-Font",
          },
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
          <View style={{ flex: 1 }}>
            <NavigationContainer/>
          </View>
        </NativeBaseProvider>
      </Provider>
    );
  }
};
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
    console.log("ExpoToken::::" + token);
    storeData(AsyncStorageKey.EXPO_TOKEN, token);
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
