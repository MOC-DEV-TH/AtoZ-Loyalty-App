import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import LogoBanner from "../../../components/LogoBanner";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getStoreData } from "../../../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import NoInternetConnectionAlert from "../../../components/NoInternetConnectionAlert";
import NetInfo from "@react-native-community/netinfo";
import i18n from "../../../I18n/i18n";

const LoginScreen = (props) => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [expoToken, setExpoToken] = useState("");
  const [firstTimeUserID, setFirstTimeUserId] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getStoreData(AsyncStorageKey.EXPO_TOKEN).then((value) => {
      setExpoToken(value);
    });
  }, []);

  useEffect(() => {
    getStoreData(AsyncStorageKey.USER_ID).then((value) => {
      if (value != null) {
        setFirstTimeUserId(value);
        setUserId(value);
      }
    });
  }, []);

  const onPressCreateNewAccount = () => {
    props.navigation.navigate("SignUp");
  };

  const onConfirm = () => {
    setIsConnected(false);
  };

  const onSignInPress = async () => {
    if (userId === "" || password === "") {
      alert(i18n.t("datamustnotempty"));
      return;
    }

    NetInfo.fetch().then(async (state) => {
      if (state.isConnected === true) {
        try {
          if (expoToken == null) {
            await dispatch(
              authActions.login(
                userId,
                password,
                "ExponentPushToken[IqB2CwC9AjsigcT_iqc78N]"
              )
            );
          } else {
            await dispatch(authActions.login(userId, password, expoToken));
          }

          props.navigation.navigate("Main");
        } catch (error) {
          console.log("error : " + error.message);
        }
        setIsConnected(false);
      } else {
        setIsConnected(true);
      }
    });
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
        <NoInternetConnectionAlert
          showAlert={isConnected}
          onConfirmPressed={onConfirm}
        />

        <LogoBanner minHeight={200} statusBarHeight={true} />

        <View style={{ margin: 30 }}>
          <View style={styles.SectionStyle}>
            <MaterialIcons
              name="person"
              size={24}
              color={Colors.primary}
              style={{ marginHorizontal: 8 }}
            />

            <View style={{ flex: 1 }}>
              <TextInput
                style={{
                  alignSelf: "center",
                  width: "100%",
                  textAlign: "center",
                  height: 40,
                }}
                defaultValue={firstTimeUserID}
                placeholder={i18n.t("userid")}
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setUserId(text)}
                value={userId}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={{ height: 20 }} />

          <View style={styles.PasswordSectionStyle}>
            <MaterialIcons
              name="lock"
              size={24}
              color={Colors.primary}
              style={{ marginHorizontal: 8 }}
            />

            <View style={{ flex: 1 }}>
              <TextInput
                style={{
                  alignSelf: "center",
                  width: "100%",
                  textAlign: "center",
                  height: 40,
                }}
                placeholder={i18n.t("password")}
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={!showPassword}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>

            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color={Colors.primary}
                style={{ marginHorizontal: 8 }}
              />
            </Pressable>
          </View>

          <TouchableOpacity onPress={onPressCreateNewAccount}>
            <Text
              style={{
                color: Colors.primary,
                alignSelf: "center",
                marginTop: 60,
                padding: 10,
              }}
            >
              {i18n.t("createnewaccount")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={onSignInPress}
          >
            <Text style={{ color: Colors.primary }}>
              {i18n.t("login")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;