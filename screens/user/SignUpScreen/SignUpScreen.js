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
export default SignUpScreen = (props) => {
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSignUpPress = () => {
    if (phone == "" || password == "") {
      alert("Data must not empty!!");
    }
  };
  const onSignInPress = () => {
    props.navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
    <Text style={{fontWeight:"bold",fontSize:24,alignSelf:"center"}}>Create Your Free Account</Text>
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

        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={() => onSignUpPress()}>
          <Text style={styles.buttonTitle}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", position: "absolute", bottom: 0,alignSelf:"center",marginBottom:20}}>
        <Text>I am already member</Text>
        <TouchableOpacity onPress={onSignInPress}>
          <Text style={{ color: "red", textDecorationLine: "underline" }}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

SignUpScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Sign Up",
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
