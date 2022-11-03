import MainNavigator from "./MainNavigator";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { navigate } from "./RootNavigation";
import { NavigationActions } from "react-navigation";
import { getStoreData, storeData } from "../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../constants/AsyncStorageKey";
import * as notificationActions from "../store/actions/notification";
import { useDispatch,useSelector } from "react-redux";
import * as TaskManager from "expo-task-manager";
const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

const NavigationContainer = (props) => {
  const dispatch = useDispatch();
  const responseListener = useRef();
  const navRef = useRef();

  const handleNewNotification = async (notificationObject) => {
    try {
      getStoreData(AsyncStorageKey.NOTI_COUNT).then((count) => {
        console.log("Store Notification Count::",count)
        dispatch(
          notificationActions.receiveNotification(
            (parseInt(count) + 1).toString()
          )
        );
        storeData(AsyncStorageKey.NOTI_COUNT, (parseInt(count) + 1).toString());
      });
      await Notifications.setBadgeCountAsync(1);
    } catch (error) {
      console.error(error);
    }
  };

  const notificationCount = useSelector(
    (state) => state.notification.notificationCount,
  );

  useEffect(()=>{
     console.log("notiLength",parseInt(notificationCount).toString())
  })

  TaskManager.defineTask(
    BACKGROUND_NOTIFICATION_TASK,
    ({ data, error, executionInfo }) => handleNewNotification(data.notification)
  );

  useEffect(() => {
    // register task to run whenever is received while the app is in the background
    Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

    // listener triggered whenever a notification is received while the app is in the foreground
    const foregroundReceivedNotificationSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Noti");
        handleNewNotification(notification.request.trigger.remoteMessage);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Noti Recieved");
        getStoreData(AsyncStorageKey.IS_LOGIN).then((value) => {
          console.log("IsLogin::" + value);
          if (value == "1") {
            navRef.current.dispatch(
              NavigationActions.navigate({ routeName: "Notification" })
            );
          } else {
            navRef.current.dispatch(
              NavigationActions.navigate({ routeName: "SignIn" })
            );
          }
        });
      });
    return () => {
      foregroundReceivedNotificationSubscription.remove();
      Notifications.removeNotificationSubscription(responseListener.current);
      Notifications.unregisterTaskAsync(BACKGROUND_NOTIFICATION_TASK);
    };
  }, []);

  return <MainNavigator ref={navRef} />;
};
export default NavigationContainer;
