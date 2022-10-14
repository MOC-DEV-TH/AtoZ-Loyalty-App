import MainNavigator from "./MainNavigator";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigation } from '@react-navigation/native';
import { navigate } from "./RootNavigation";
import { NavigationActions } from "react-navigation";
import { getStoreData } from "../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../constants/AsyncStorageKey";

const NavigationContainer = (props) => {
  const [expoToken,setExpoToken] = useState("")
  const responseListener = useRef();
  const navRef = useRef();

    useEffect(() => {
      const foregroundReceivedNotificationSubscription = Notifications.addNotificationReceivedListener(
        (notification) => {
          console.log("Noti")
        }
      );
      responseListener.current = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          console.log("Noti Recieved");

          getStoreData(AsyncStorageKey.IS_LOGIN).then((value)=>{
            console.log("IsLogin::"+value)
            if(value=="1"){
              navRef.current.dispatch(NavigationActions.navigate({ routeName: 'Notification'}));
            }
            else {
              navRef.current.dispatch(NavigationActions.navigate({ routeName: 'SignIn'}));
            }
          })
        }
      );
      return () => {
        foregroundReceivedNotificationSubscription.remove();
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

    return <MainNavigator ref={navRef}/>;
};
export default NavigationContainer;
