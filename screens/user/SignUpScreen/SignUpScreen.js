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
import Colors from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import styles from "./styles";
export default SignUpScreen = (props) => {
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [isChecked, setChecked] = useState(false);

 
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
      <View>
        <Image
          resizeMode="stretch"
          source={require("../../../assets/top_image.png")}
          style={{
            width: "100%",
            alignSelf: "center",
            height: undefined,
            aspectRatio: 512 / 212,
          }}
        ></Image>
        <View style={{ height: 20 }} />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            alignSelf: "center",
            color: Colors.primary,
          }}
        >
          Account Registration
        </Text>
        <View style={{ margin: 30 }}>
          <View style={styles.SectionStyle}>
            <Ionicons name="person"></Ionicons>

            <View style={{ flex: 1 }}>
              <TextInput
                style={{ alignSelf: "center" }}
                placeholder="Name"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setPhone(text)}
                value={phone}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={{ height: 10 }}></View>

          <View style={styles.SectionStyle}>
            <Ionicons name="person"></Ionicons>

            <View style={{ flex: 1 }}>
              <TextInput
                style={{ alignSelf: "center" }}
                placeholder="Date of Birth"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setPhone(text)}
                value={phone}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={{ height: 10 }}></View>

          <View style={styles.SectionStyle}>
            <Ionicons name="person"></Ionicons>

            <View style={{ flex: 1 }}>
              <TextInput
                style={{ alignSelf: "center" }}
                placeholder="NRC No."
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setPhone(text)}
                value={phone}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={{ height: 10 }}></View>

          <View style={styles.SectionStyle}>
            <Ionicons name="person"></Ionicons>

            <View style={{ flex: 1 }}>
              <TextInput
                style={{ alignSelf: "center" }}
                placeholder="Address"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setPhone(text)}
                value={phone}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={{ height: 10 }}></View>

          <View style={styles.SectionStyle}>
            <Ionicons name="person"></Ionicons>

            <View style={{ flex: 1 }}>
              <TextInput
                style={{ alignSelf: "center" }}
                placeholder="City"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setPhone(text)}
                value={phone}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={{ height: 10 }}></View>

          <View style={styles.SectionStyle}>
            <Ionicons name="person"></Ionicons>

            <View style={{ flex: 1 }}>
              <TextInput
                style={{ alignSelf: "center" }}
                placeholder="Phone Number"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setPhone(text)}
                value={phone}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={{ height: 10 }}></View>

          <View style={styles.SectionStyle}>
            <Ionicons name="person"></Ionicons>

            <View style={{ flex: 1 }}>
              <TextInput
                style={{ alignSelf: "center" }}
                placeholder="Type Password"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setPhone(text)}
                value={phone}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={{ height: 10 }}></View>

          <View style={styles.SectionStyle}>
            <Ionicons name="person"></Ionicons>

            <View style={{ flex: 1 }}>
              <TextInput
                style={{ alignSelf: "center" }}
                placeholder="Confirm Password"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setPhone(text)}
                value={phone}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View
            style={{ flexDirection: "row", alignSelf: "center", marginTop: 20 }}
          >
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
            />
            <Text style={{marginLeft:10}}>I've read and agree on</Text>
            <TouchableOpacity onPress={onSignInPress}>
              <Text style={{ color: "red", textDecorationLine: "underline" }}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onSignUpPress()}
          >
            <Text style={styles.buttonTitle}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

SignUpScreen.navigationOptions = (props) => {
  return {
    headerShown: false,
  };
};
