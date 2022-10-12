import React, { useState, useEffect, useRef,useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  LogBox
} from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { registerRootComponent } from "expo";
import NavigationContainer from "./navigation/NavigationContainer";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { getStoreData, storeData } from "./AsyncStorage/AsyncStorage";
import AsyncStorageKey from "./constants/AsyncStorageKey";
import i18n from "./I18n/i18n";
import * as Localization from "expo-localization";
import authReducer from "./store/reducers/auth";
import userReducer from "./store/reducers/users";
import homeReducer from "./store/reducers/home";
import promotionReducer from "./store/reducers/promotions";
import myAccountReducer from "./store/reducers/myAccount";
import pointHistoryReducer from "./store/reducers/point_history";
import notificationReducer from "./store/reducers/notification";
import { extendTheme, NativeBaseProvider } from "native-base";
import * as TaskManager from "expo-task-manager";
import Colors from "./constants/Colors";
import { setLocalization, translate } from "react-native-translate";
import en from "./locales/en";
import my from "./locales/my";
import * as SQLite from "expo-sqlite";
import { checkDatabaseForFirstTime } from "./persistence/database";
import { retrieveNotification } from "./persistence/database";
import { addToDatabase } from "./persistence/database";
import { useFonts } from 'expo-font';

console.disableYellowBox = true;
LogBox.ignoreAllLogs();

//open database
//const db = SQLite.openDatabase("db.aToz");

const rootReducer = combineReducers({
  auth: authReducer,
  myAccount: myAccountReducer,
  promotion: promotionReducer,
  homeScreen: homeReducer,
  pointHistory: pointHistoryReducer,
  user : userReducer,
  notification : notificationReducer
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
  let [alert,setShowAlert] = useState(false)
  const responseListener = useRef();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {

    TaskManager.defineTask(
      BACKGROUND_NOTIFICATION_TASK,
      ({ data, error, executionInfo }) => {
        console.log("Received a notification in the background!");
        //addToDatabase(db,data.title, data.body);
      }
    );
  

    if (lastNotificationResponse) {
      handleNewNotification(
        lastNotificationResponse.notification.request.trigger.remoteMessage
      );
    }
  }, [lastNotificationResponse]);
  //init notification
  useEffect(() => {
    Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });
    // This listener is fired whenever a notification is received while the app is foregrounded
    const foregroundReceivedNotificationSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        handleNewNotification(notification.request.trigger.remoteMessage);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(Notifications);
      }
    );

    return () => {
      foregroundReceivedNotificationSubscription.remove();
      Notifications.unregisterTaskAsync(BACKGROUND_NOTIFICATION_TASK);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  
    
  const [fontsLoaded] = useFonts({
    "En-Heading-Font": require('./assets/fonts/Helvetica/HelveticaLTStd-Bold.otf'),
    "En-Body-Font": require('./assets/fonts/Helvetica/HelveticaLTStd-Light.otf'),
    "My-Heading-Font": require('./assets/fonts/Padauk/Padauk-Bold.ttf'),
    "My-Body-Font": require('./assets/fonts/Padauk/Padauk-Regular.ttf'),
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


  const handleNewNotification = async (notificationObject) => {
    try {
      const newNotification = {
        id: notificationObject.messageId,
        date: notificationObject.sentTime,
        title: notificationObject.data.title,
        body: notificationObject.data.message,
        data: JSON.parse(notificationObject.data.body),
      };
      console.log(newNotification.title);
      //addToDatabase(db,newNotification.title, newNotification.body);
      await Notifications.setBadgeCountAsync(1);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(()=>{
    //checkDatabaseForFirstTime(db)
  })

  useEffect(()=>{
    //retrieveNotification(db)
  })

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


  //check language
  useEffect(() => {
    getStoreData(AsyncStorageKey.LANGUAGE).then((value) => {
      if (value == AsyncStorageKey.LANGUAGE_MM) {
        setLocalization(my);
      } else if (value == AsyncStorageKey.LANGUAGE_ENG) {
        setLocalization(en);
      } else {
        setLocalization(en);
      }
    });
  }, []);

  // is font ready?
  if (!fontsLoaded) {
    return null;
  }else{
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
        ...Colors
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
        enFont: 'EnFont',
        myFont: 'MyFont',
        body: 'MyFont'
      },
    });

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
    console.log("ExpoToken::::"+token);
    storeData(AsyncStorageKey.EXPO_TOKEN,token);
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
