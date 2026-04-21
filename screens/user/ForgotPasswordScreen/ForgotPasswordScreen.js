import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import styles from "./styles";

const ForgotPasswordScreen = (props) => {
  const [email, setEmail] = useState("");

  const onSendInstructionPress = () => {
    if (email === "") {
      alert("Data must not be empty!!");
      return;
    }

    // your logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontWeight: "normal",
          fontSize: 16,
          alignSelf: "center",
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        Enter your email and we will send you instructions on how to reset your
        password.
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

        <TouchableOpacity
          style={styles.button}
          onPress={onSendInstructionPress}
        >
          <Text style={styles.buttonTitle}>Send Instructions</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;