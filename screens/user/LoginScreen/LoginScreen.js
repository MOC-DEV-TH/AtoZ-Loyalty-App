import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Center, Icon, Pressable } from "native-base";
import * as Notifications from "expo-notifications";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import { translate } from "react-native-translate";
import LogoBanner from "../../../components/LogoBanner";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getStoreData } from "../../../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import Button from "../../../components/Button";

export default LoginScreen = (props) => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState(0);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [expoToken,setExpoToken] = useState("")
  const [firstTimeUserID,setFirstTimeUserId] = useState("")

  useEffect(()=>{
    getStoreData(AsyncStorageKey.EXPO_TOKEN).then((value)=>{
      setExpoToken(value)
    })
  })

  useEffect(()=>{
    getStoreData(AsyncStorageKey.USER_ID).then((value)=>{
      if(value!=null){
        setFirstTimeUserId(value)
        setUserId(value)
      }
    })
  }, [])


  const onPressCreateNewAccount = () => {
    props.navigation.navigate("SignUp");
  };

  const onSignInPress = async () => {
    if (userId == "" || password == "") {
      alert("Data must not empty!!");
    } else {
      try {
        await dispatch(authActions.login(userId, password,expoToken));
        props.navigation.navigate("Main");
      } catch (error) {
        console.log("error : " + error.message);
      }
    }
    //schedulePushNotification()
    //sendPushNotification()
  };

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }

  async function sendPushNotification() {
    const message = [
      {
        to: "ExponentPushToken[IqB2CwC9AjsigcT_iqc78N]",
        sound: "default",
        title: "This is notification title",
        body: "Hello world!",
      },
      {
        to: "ExponentPushToken[rp6YS_IVTeJOd9jQf0hs0i]",
        badge: 1,
        body: "You've got mail",
      },
    ];

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

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
        <LogoBanner minHeight={200} statusBarHeight={true}></LogoBanner>
        <View style={{ margin: 30 }}>
          <View style={styles.SectionStyle}>
            <Icon
              style={{ color: Colors.primary }}
              as={<MaterialIcons name={"person"} size={24} color="black" />}
            ></Icon>

            <View style={{ flex: 1 }}>
              <TextInput
                style={{
                  alignSelf: "center",
                  width: "100%",
                  textAlign: "center",
                  justifyContent: "center",
                  height: 40,
                }}
                defaultValue={firstTimeUserID}
                placeholder={translate("userid")}
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setUserId(text)}
                value={userId}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
            <Pressable style={{opacity: 0}}>
              <Icon
                style={{ color: Colors.primary }}
                as={
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={24}
                    color="black"
                  />
                }
                mr={0}
              ></Icon>
            </Pressable>
          </View>
          <View style={{ height: 20 }}></View>
          <View style={styles.PasswordSectionStyle}>
            <Icon
              style={{ color: Colors.primary }}
              as={<MaterialIcons name={"lock"} size={24} color="black" />}
              mr={3}
            ></Icon>
            <View style={{ flex: 1 }}>
              <TextInput
                style={{
                  alignSelf: "center",
                  width: "100%",
                  textAlign: "center",
                  height: 40,
                }}
                placeholder={translate("password")}
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={!showPassword}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>

            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Icon
                style={{ color: Colors.primary }}
                as={
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={24}
                    color="black"
                  />
                }
                mr={3}
              ></Icon>
            </Pressable>
          </View>
          <TouchableOpacity onPress={() => onPressCreateNewAccount()}>
            <Text
              style={{
                color: Colors.primary,
                alignSelf: "center",
                marginTop: 60,
                padding:10
              }}
            >
              {translate("createnewaccount")}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => onSignInPress()}
          >
            <Text style={styles.buttonTitle}>{translate("login")}</Text>
          </TouchableOpacity> */}
          <Button onPress={() => onSignInPress()}  fontSize="lg" mt={3}>{translate("login")}</Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

LoginScreen.navigationOptions = (props) => {
  return {
    headerShown: false,
    headerTitle: "",
    headerTintColor: "black",
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: Colors.primary,
      height: 80,
    },
  };
};
