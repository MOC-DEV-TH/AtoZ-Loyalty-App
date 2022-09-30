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
import LogoBanner from "../../../components/LogoBanner";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
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
  useEffect(() => {
    dispatch(authActions.getAllDDL());
  });

  const onPressChangeLanguage = () => {
      if(local=="en"){
        setLocal("my")
        setLocalization(my)
        storeData(AsyncStorageKey.LANGUAGE,"my")
      }
      else if(local=="my") {
        setLocal("en")
        setLocalization(en)
        storeData(AsyncStorageKey.LANGUAGE,"en")
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
      <LogoBanner minHeight={200} statusBarHeight={true}></LogoBanner>

      <View style={{marginTop:40}}>
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
