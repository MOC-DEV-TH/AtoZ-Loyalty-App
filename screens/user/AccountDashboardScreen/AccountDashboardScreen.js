import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as authActions from "../../../store/actions/auth";
import * as Localization from "expo-localization";
import i18n from "../../../I18n/i18n";
import React, { useState, useEffect } from "react";
import { storeData } from "../../../AsyncStorage/AsyncStorage";
import { setLocalization,translate } from 'react-native-translate';
import en from "../../../locales/en";
import my from "../../../locales/my";
import { useDispatch } from "react-redux";
import {
  Box,
  Text,
  HStack,
  VStack,
  Input,
  Stack,
  FormControl,
  Pressable,
  Heading,
  Image,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  Button,
} from "native-base";

export default AccountDashboardScreen = (props) => {
  const dispatch = useDispatch();
  let [local, setLocal] = useState("en");
  i18n.locale = local;
  useEffect(() => {
    dispatch(authActions.getAllDDL());
  });

  const onPressChangeLanguage = () => {
      if(local=="en"){
        setLocalization(my)
        setLocal("my")
        storeData("my")
      }
      else if(local=="my") {
        setLocalization(en)
        setLocal("en")
        storeData()
      }
      
  };
  const onLoginPress = () => {
    props.navigation.navigate("SignIn");
  };
   
  const onRegisterPress = () => {
    props.navigation.navigate("SignUp");
  };

  const onHelpPress = () => {
    props.navigation.navigate("Help");
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="stretch"
        source={require("../../../assets/new_wave.png")}
        style={{
          width: "100%",
          alignSelf: "center",
          height: 270,
          aspectRatio: 512 / 212,
          position: "absolute",
          top: 0,
        }}
        alt="new wave"
      ></Image>

      <Image
        resizeMode="contain"
        source={require("../../../assets/app_logo_blue.png")}
        style={{
          alignSelf: "center",
          height: 100,
          position: "absolute",
          top: 70,
        }}
        alt="logo blue"
      ></Image>

      <View>
        <Text style={{ color: Colors.primary, alignSelf: "center" }}>
          {translate("alreadyAccount")}
        </Text>
        <Button
          mt={2}
          width="250"
          backgroundColor={Colors.yellow}
          _text={{ color: Colors.primary, fontSize: 18, fontWeight: "bold" }}
          onPress={() => onLoginPress()}
          fontWeight="bold"
        >
          {translate("login")}
        </Button>
      </View>

      <View style={{ margin: 30 }}>
        <Text style={{ color: Colors.primary }}>{translate("or")}</Text>
      </View>

      <View>
        <Text style={{ color: Colors.primary, alignSelf: "center" }}>
          {translate("createnewaccount")}
        </Text>
        <Button
          mt={2}
          width="250"
          backgroundColor={Colors.yellow}
          _text={{ color: Colors.primary, fontSize: 18, fontWeight: "bold" }}
          onPress={() => onRegisterPress()}
          fontWeight="bold"
        >
          {translate("register")}
        </Button>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => onHelpPress()}>
          <HStack>
            <AntDesign name="questioncircle" size={24} color={Colors.primary} />

            <Text style={{ marginLeft: 5, color: Colors.primary }}>{translate("help")}</Text>
          </HStack>
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => onPressChangeLanguage()}>
          <Text style={{fontSize:11}} color={Colors.primary}>မြန်မာ / Eng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

AccountDashboardScreen.navigationOptions = (props) => {
  return {
    headerShown: false,
  };
};
