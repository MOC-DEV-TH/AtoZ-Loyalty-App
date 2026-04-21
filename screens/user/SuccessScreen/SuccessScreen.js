import { Text, View, Keyboard, TouchableOpacity } from "react-native";
import React from "react";
import Img from "../../../components/Img";
import Colors from "../../../constants/Colors";
import styles from "./styles";
import i18n from "../../../I18n/i18n";

const SuccessScreen = ({ navigation }) => {
  const login = () => {
    navigation.replace("SignIn");
  };

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <View style={{ position: "absolute", top: 80 }}>
        <Img
          source={require("../../../assets/atoz_blue.png")}
          width={150}
          intWidth={512}
          intHeight={212}
          mx={"auto"}
        />
      </View>

      <Img
        source={require("../../../assets/mark_icon.png")}
        width={150}
        intWidth={512}
        intHeight={212}
        mx={"auto"}
      />

      <Text
        style={{
          color: Colors.primary,
          fontSize: 22,
          fontWeight: "bold",
          marginTop: 15,
          padding: 5,
        }}
      >
        {i18n.t("thankyou")}
      </Text>

      <Text
        style={{
          color: Colors.primary,
          fontWeight: "normal",
          textAlign: "center",
          margin: 6,
          lineHeight: 25,
          marginTop: 40,
        }}
      >
        {i18n.t("loyalty_program_submit_success")}
      </Text>

      <Text
        style={{
          color: Colors.primary,
          fontWeight: "normal",
          textAlign: "center",
          margin: 6,
          lineHeight: 25,
          marginTop: 25,
        }}
      >
        {i18n.t("account_verification_process")}
      </Text>

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonTitle}>{i18n.t("login")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessScreen;