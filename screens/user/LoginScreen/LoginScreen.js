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
import { MaterialIcons } from "@expo/vector-icons";
import { Center, Icon,Pressable } from "native-base";
import * as Notifications from "expo-notifications";
import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import Colors from "../../../constants/Colors";

export default LoginScreen = (props) => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState(0);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const onSignInPress = async () => {
    if (userId == "" || password == "") {
      alert("Data must not empty!!");
    } else {
      try {
        await dispatch(authActions.login(userId, password));
        props.navigation.navigate("Main");
      } catch (error) {
        console.log("error : " + error.message);
      }
    }
    //schedulePushNotification()
    //sendPushNotification()
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
      <Image
        resizeMode="cover"
        source={require("../../../assets/a_to_z.png")}
        style={{
          width: "100%",
          alignSelf: "center",
          height: undefined,
          aspectRatio: 512 / 212,
          position: "absolute",
          top: 50,
        }}
      ></Image>

      <View style={{ margin: 30 }}>
        <View style={styles.SectionStyle}>
        <Icon style={{color:Colors.primary}}
              as={
                <MaterialIcons
                  name={"person"}
                  size={24}
                  color="black"
                />
              }
            
            ></Icon>

          <View style={{ flex: 1 }}>
            <TextInput
              style={{ alignSelf: "center" }}
              placeholder="UserID"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setUserId(text)}
              value={userId}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={{ height: 20 }}></View>

        <View style={styles.PasswordSectionStyle}>
        <Icon style={{color:Colors.primary}}
              as={
                <MaterialIcons
                  name={"lock"}
                  size={24}
                  color="black"
                />
              }
              mr={3}
            ></Icon>
          <View>
            <TextInput
              style={{ alignSelf: "center" }}
              placeholder="Password"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={!showPassword}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Icon style={{color:Colors.primary}}
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

        {/* <View style={{ alignSelf: "flex-end", marginTop: 10 }}>
          <TouchableOpacity onPress={onForgotPasswordPress}>
            <Text style={{ color: "black", textDecorationLine: "underline" }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View> */}

        <TouchableOpacity style={styles.button} onPress={() => onSignInPress()}>
          <Text style={styles.buttonTitle}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* <View
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
      </View> */}
    </SafeAreaView>
  );
};

LoginScreen.navigationOptions = (props) => {
  return {
    headerShown: false,
  };
};
