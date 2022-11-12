import { StyleSheet, View, TouchableOpacity,ActivityIndicator } from "react-native";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import * as authActions from "../../../store/actions/auth";
import React, { useState, useEffect,useCallback } from "react";
import { setLocalization, translate } from "react-native-translate";
import { useDispatch } from "react-redux";
import LogoBanner from "../../../components/LogoBanner";
import Button from "../../../components/Button";
import Text from "../../../components/Typography";

export default AccountDashboardScreen = (props) => {
  const dispatch = useDispatch();
  let [local, setLocal] = useState("en");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   loadAllDDLData();
  // }, );

  const loadAllDDLData = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(authActions.getAllDDL());
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [setIsLoading, dispatch]);

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

      <View style={{ marginTop: 40 }}>
        <Text style={{ color: Colors.primary, alignSelf: "center" }}>
          {translate("alreadyAccount")}
        </Text>
        {/* <Button
          mt={2}
          width="250"
          backgroundColor={Colors.yellow}
          _text={{ color: Colors.primary, fontSize: 18, fontWeight: "bold" }}
          onPress={() => onLoginPress()}
          fontWeight="bold"
        >
          {translate("login")}
        </Button> */}
        <Button width="250" role="button" mt={2} onPress={() => onLoginPress()}>
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
          width="250"
          role="button"
          mt={2}
          onPress={() => onRegisterPress()}
        >
          {translate("register")}
        </Button>
      </View>

    </View>
  );
};

AccountDashboardScreen.navigationOptions = (props) => {
  return {
    headerShown: false,
  };
};
