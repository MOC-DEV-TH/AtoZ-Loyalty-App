import { View } from "react-native";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import * as authActions from "../../../store/actions/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import LogoBanner from "../../../components/LogoBanner";
import Button from "../../../components/Button";
import Text from "../../../components/Typography";
import i18n from "../../../I18n/i18n";

const AccountDashboardScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.getAllDDL());
  }, [dispatch]);

  const onLoginPress = () => {
    props.navigation.navigate("SignIn");
  };

  const onRegisterPress = () => {
    props.navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <LogoBanner minHeight={200} statusBarHeight={true} />

      <View style={{ marginTop: 40 }}>
        <Text style={{ color: Colors.primary, alignSelf: "center" }}>
          {i18n.t("alreadyAccount")}
        </Text>

        <Button width="250" role="button" mt={2} onPress={onLoginPress}>
          {i18n.t("login")}
        </Button>
      </View>

      <View style={{ margin: 30 }}>
        <Text style={{ color: Colors.primary }}>{i18n.t("or")}</Text>
      </View>

      <View>
        <Text style={{ color: Colors.primary, alignSelf: "center" }}>
          {i18n.t("createnewaccount")}
        </Text>

        <Button width="250" role="button" mt={2} onPress={onRegisterPress}>
          {i18n.t("register")}
        </Button>
      </View>
    </View>
  );
};

export default AccountDashboardScreen;