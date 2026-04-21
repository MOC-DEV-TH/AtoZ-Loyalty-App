import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "native-base";
import { View, Text } from "react-native";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import Button from "../../../components/Button";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import { getStoreData } from "../../../AsyncStorage/AsyncStorage";
import { useDispatch } from "react-redux";
import * as Notifications from "expo-notifications";
import NetInfo from "@react-native-community/netinfo";
import NoInternetConnectionAlert from "../../../components/NoInternetConnectionAlert";
import i18n from "../../../I18n/i18n";

const GetStartScreen = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

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

  const onConfirm = () => {
    setIsConnected(false);
  };

  useEffect(() => {
    const notificationInteractionSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // add your navigation target if needed
        // props.navigation.navigate("SomeScreen");
      });

    return () => {
      notificationInteractionSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const loadLanguage = async () => {
      const value = await getStoreData(AsyncStorageKey.LANGUAGE);

      if (value === AsyncStorageKey.LANGUAGE_MM) {
        i18n.locale = "my";
      } else {
        i18n.locale = "en";
      }

      setIsLoading(false);
    };

    loadLanguage();
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
          />

          <Button
            bg={Colors.yellow}
            justifyContent={"center"}
            role="button"
            color="primary"
            onPress={getStart}
            mt={40}
          >
            <Text>{i18n.t("getstart")}</Text>
          </Button>
        </View>
      ) : null}

      <NoInternetConnectionAlert
        showAlert={isConnected}
        onConfirmPressed={onConfirm}
      />
    </SafeAreaView>
  );
};

export default GetStartScreen;