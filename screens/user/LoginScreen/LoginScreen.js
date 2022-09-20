import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  View,
} from "react-native";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { Center } from "native-base";

export default LoginScreen = (props) => {
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");

  const onSignInPress = () => {
    if (phone == "" || password == "") {
      alert("Data must not empty!!");
    }
    //schedulePushNotification()
    //sendPushNotification()
    props.navigation.navigate("Main");
  };

  const onRegisterPress = () => {
    props.navigation.navigate("SignUp");
  };

  const onForgotPasswordPress = () => {
    props.navigation.navigate("ForgotPassword");
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
    const message = {
      to: "ExponentPushToken[IqB2CwC9AjsigcT_iqc78N]",
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

  return (
    <SafeAreaView style={styles.container}>
      <Image resizeMode="cover" source={require("../../../assets/a_to_z.png")} style={{
          width: '100%',
          alignSelf:"center",
          height: undefined,
          aspectRatio: 512 / 212,
          position:"absolute",
          top:50
        }}></Image>

      <View style={{ margin: 30 }}>
        <View style={styles.SectionStyle}>
          <Ionicons name="person"></Ionicons>

          <View style={{ flex: 1 }}>
            <TextInput
              style={{ alignSelf: "center" }}
              placeholder="Phone"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setPhone(text)}
              value={phone}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={{height:20}}></View>

        <View style={styles.SectionStyle}>
          <Ionicons name="unlock"></Ionicons>
          <View style={{ flex: 1 }}>
            <TextInput
              style={{ alignSelf: "center" }}
              placeholder="Password"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={{ alignSelf: "flex-end", marginTop: 10 }}>
          <TouchableOpacity onPress={onForgotPasswordPress}>
            <Text style={{ color: "black", textDecorationLine: "underline" }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => onSignInPress()}>
          <Text style={styles.buttonTitle}>Sign in</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          marginBottom: 20,
        }}
      >
        <Text>You don't have account??</Text>
        <TouchableOpacity onPress={onRegisterPress}>
          <Text style={{ color: "red", textDecorationLine: "underline" }}>
            Register here
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

LoginScreen.navigationOptions = (props) => {
  return {
    headerShown: false,
  };
};
