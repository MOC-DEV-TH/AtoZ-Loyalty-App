import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef, useCallback } from "react";
import  { navigate, push } from "../navigation/RootNavigation"
import { useNavigation } from '@react-navigation/native';

export default NotificationService = (props) => {
    const navigation = useNavigation()
    const responseListener = useRef();
  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    const foregroundReceivedNotificationSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        //handleNewNotification(notification.request.trigger.remoteMessage);
        console.log("Noti")
      }
    );
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Noti Recieved");
        navigation.navigate("SignIn")
      }
    );
    return () => {
      foregroundReceivedNotificationSubscription.remove();
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
}