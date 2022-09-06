import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
} from "react-native";
import styles from "./styles";
export default ForgotPasswordScreen = (props) => {
  const [email, setEmail] = useState("");

  const onSendInstructionPress = () => {
    if (email == "") {
      alert("Data must not empty!!");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontWeight: "normal", fontSize: 16, alignSelf: "center",marginLeft:30,marginRight:30 }}>
        Enter your email and we we'll sent you instructions on how to reset your password.
      </Text>
      <View style={{ margin: 30 }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onSendInstructionPress()}>
          <Text style={styles.buttonTitle}>Send Instructions</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

ForgotPasswordScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Forgot Password",
    headerTintColor: "black",
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: "white",
    },
    headerLeft: () => (
      <TouchableOpacity onPress={() => navData.navigation.goBack()}>
        <Image
          style={{ height: 15, width: 20, marginLeft: 10 }}
          source={require("../../../../A2Z/assets/back_arrow.png")}
        />
      </TouchableOpacity>
    ),
  };
};
