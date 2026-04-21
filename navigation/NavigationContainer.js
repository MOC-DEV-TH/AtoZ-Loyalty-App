import MainNavigator from "./MainNavigator";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef } from "react";
import { navigate } from "./RootNavigation";
import { getStoreData, storeData } from "../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../constants/AsyncStorageKey";
import * as notificationActions from "../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";

const handleNewNotification = async (notificationObject, dispatch) => {
  try {
    getStoreData(AsyncStorageKey.NOTI_COUNT).then((count) => {
      const currentCount = parseInt(count || "0", 10);
      const newCount = (currentCount + 1).toString();

      console.log("Store Notification Count::", count);

      dispatch(notificationActions.receiveNotification(newCount));
      storeData(AsyncStorageKey.NOTI_COUNT, newCount);
    });

    await Notifications.setBadgeCountAsync(1);
  } catch (error) {
    console.error(error);
  }
};

const NavigationContainer = () => {
  const dispatch = useDispatch();
  const responseListener = useRef(null);

  const notificationCount = useSelector(
    (state) => state.notification.notificationCount
  );

  useEffect(() => {
    console.log(
      "notiLength",
      parseInt(notificationCount || "0", 10).toString()
    );
  }, [notificationCount]);

  useEffect(() => {
    const foregroundReceivedNotificationSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Foreground Notification:", notification);
        handleNewNotification(notification, dispatch);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Response Received:", response);

        getStoreData(AsyncStorageKey.IS_LOGIN).then((value) => {
          console.log("IsLogin::" + value);

          if (value === "1") {
            navigate("Notification");
          } else {
            navigate("SignIn");
          }
        });
      });

    return () => {
      foregroundReceivedNotificationSubscription.remove();

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [dispatch]);

  return <MainNavigator />;
};

export default NavigationContainer;