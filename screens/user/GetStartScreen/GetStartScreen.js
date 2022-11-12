import React, { useState, useEffect, useRef, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AspectRatio, Image, Text } from "native-base";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Translate, setLocalization } from "react-native-translate";
import Colors from "../../../constants/Colors";
import Button from "../../../components/Button";
import NotificationService from "../../../service/NotificationService";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import { getStoreData } from "../../../AsyncStorage/AsyncStorage";
import en from "../../../locales/en";
import my from "../../../locales/my";
import { useDispatch } from "react-redux";
import * as Notifications from "expo-notifications";
import NetInfo from "@react-native-community/netinfo";
import NoInternetConnectionAlert from "../../../components/NoInternetConnectionAlert";

export default GetStartScreen = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const getStart = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected === true) {
        props.navigation.navigate("AccountDashboard");
        setIsConnected(false);
      } else {
        setIsConnected(true);
      }
    });
  };
  //check internet
  const onConfirm = () => {
    setIsConnected(false);
  };

  // useEffect(() => {
  //   NetInfo.addEventListener((state) => {
  //     if (state.isConnected === false)
  //       setIsConnected(true);
  //     } else {
  //       setIsConnected(false);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const notificationInteractionSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // add the code to do what you need with the notification e.g. navigate to a specific screen
        props.navigation.navigate();
      });

    return () => {
      notificationInteractionSubscription.remove();
    };
  });

  //check language
  useEffect(() => {
    getStoreData(AsyncStorageKey.LANGUAGE).then((value) => {
      if (value == AsyncStorageKey.LANGUAGE_MM) {
        setLocalization(my);
      } else {
        setLocalization(en);
      }
      setIsLoading(false);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {!isLoading ? (
        <View>
          <Image
            resizeMode="cover"
            source={require("../../../assets/logo.png")}
            style={{
              width: "60%",
              height: undefined,
              aspectRatio: 512 / 212,
            }}
            alt="logo"
          ></Image>
          {/* <Button
          padding={3}
          mt={40}
          bg={Colors.yellow}
          _text={{ color: "primary", fontWeight: "bold", fontFamily:translate("nativebaseFont"), fontSize:"lg" }}
          onPress={() => getStart()}
        >
          {translate("getstart")}
        </Button> */}
          <Button
            bg={Colors.yellow}
            justifyContent={"center"}
            role="button"
            color="primary"
            onPress={() => getStart()}
            mt={40}
          >
            <Translate value="getstart" />
          </Button>
        </View>
      ) : undefined}
      <NoInternetConnectionAlert
        showAlert={isConnected}
        onConfirmPressed={onConfirm}
      />
    </SafeAreaView>
  );
};

GetStartScreen.navigationOptions = (props) => {
  return {
    headerShown: false,
  };
};
