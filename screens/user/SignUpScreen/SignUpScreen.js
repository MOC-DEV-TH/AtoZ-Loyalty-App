import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect,useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { useDispatch,useSelector,shallowEqual } from "react-redux";
import Colors from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as userActions from "../../../store/actions/users";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import { Center, Icon, Pressable,HStack,Box } from "native-base";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import styles from "./styles";
export default SignUpScreen = (props) => {
  const [phone, setPhone] = useState(0);
  const [name, setName] = useState("");
  const [date, setDateOfBirth] = useState("");
  const [nrc, setNrc] = useState("");
  const [address, setAddress] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [typePassword, setTypePassword] = useState("");
  const [showTypePassword, setShowTypePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [city, setCity] = useState(null);
  const dispatch = useDispatch();

  const allDDLData = useSelector(
    (state) => state.auth.allDropDownData,
    shallowEqual
  );
  const cityDDLData = allDDLData.city;
  
  const onLanguageOpen = useCallback(() => {}, []);
  const createUserObj = () => {
    const userObj = {
      name: name,
      dob: date,
      nrc: nrc,
      address: address,
      city: "15",
      township: "1",
      phone: phone,
      password: typePassword,
      confirm_password: confirmPassword,
    };
    return userObj;
  };
  const onSignUpPress = async () => {
    try {
      const userObj = createUserObj();
      await dispatch(userActions.registerUser(userObj));
    } catch (error) {
      console.log("error : " + error.message);
    }
  };
  const onSignInPress = () => {
    props.navigation.goBack();
  };
  return (
    <KeyboardAwareScrollView>
    <View style={styles.container}>
      <View>
        <Image
          resizeMode="stretch"
          source={require("../../../assets/a_to_z_new_bg.png")}
          style={{
            width: "100%",
            alignSelf: "center",
            height: 270,
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
            <Icon
              style={{ color: Colors.primary }}
              as={<MaterialIcons name={"person"} size={24} color="black" />}
            ></Icon>

            <View style={{ flex: 1 }}>
              <TextInput
                style={{ alignSelf: "center" }}
                placeholder="Name"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setName(text)}
                value={name}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={{ height: 10 }}></View>

          <View style={styles.SectionStyle}>
            <Icon
              style={{ color: Colors.primary }}
              as={
                <MaterialIcons
                  name={"calendar-today"}
                  size={24}
                  color="black"
                />
              }
            ></Icon>

            <View style={{ flex: 1 }}>
              <TextInput
                style={{ alignSelf: "center" }}
                placeholder="Date of Birth"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setDateOfBirth(text)}
                value={date}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={{ height: 10 }}></View>

          <View style={styles.SectionStyle}>
            <Icon
              style={{ color: Colors.primary }}
              as={
                <MaterialIcons
                  name={"card-membership"}
                  size={24}
                  color="black"
                />
              }
            ></Icon>

            <View style={{ flex: 1 }}>
              <TextInput
                style={{ alignSelf: "center" }}
                placeholder="NRC No."
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setNrc(text)}
                value={nrc}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={{ height: 10 }}></View>

          <View style={styles.SectionStyle}>
            <Icon
              style={{ color: Colors.primary }}
              as={<MaterialIcons name={"home-work"} size={24} color="black" />}
            ></Icon>

            <View style={{ flex: 1 }}>
              <TextInput
                style={{ alignSelf: "center" }}
                placeholder="Address"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setAddress(text)}
                value={address}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={{ height: 10 }}></View>

  
          <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: Colors.primary }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={cityDDLData}
          maxHeight={300}
          labelField="value"
          valueField="value"
          placeholder={!isFocus ? 'City' : '...'}
          value={city}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCity(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              color={Colors.primary}
              name="home"
              size={20}
            />
          )}
        />

          <View style={{ height: 10 }}></View>

          <View style={styles.SectionStyle}>
            <Icon
              style={{ color: Colors.primary }}
              as={<MaterialIcons name={"phone"} size={24} color="black" />}
            ></Icon>

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

          <View style={styles.PasswordSectionStyle}>
            <Icon
              style={{ color: Colors.primary }}
              as={<MaterialIcons name={"lock"} size={24} color="black" />}
              mr={3}
            ></Icon>

            <View>
              <TextInput
                style={{ alignSelf: "center" }}
                placeholder="Type Password"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setTypePassword(text)}
                value={typePassword}
                secureTextEntry={!showTypePassword}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
            <Pressable onPress={() => setShowTypePassword(!showTypePassword)}>
              <Icon
                style={{ color: Colors.primary }}
                as={
                  <MaterialIcons
                    name={showTypePassword ? "visibility" : "visibility-off"}
                    size={24}
                    color="black"
                  />
                }
                mr={3}
              ></Icon>
            </Pressable>
          </View>
          <View style={{ height: 10 }}></View>

          <View style={styles.PasswordSectionStyle}>
            <Icon
              style={{ color: Colors.primary }}
              as={<MaterialIcons name={"lock"} size={24} color="black" />}
              mr={3}
            ></Icon>

            <View>
              <TextInput
                style={{ alignSelf: "center" }}
                placeholder="Confirm Password"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry={!showConfirmPassword}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
            <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon
                style={{ color: Colors.primary }}
                as={
                  <MaterialIcons
                    name={showConfirmPassword ? "visibility" : "visibility-off"}
                    size={24}
                    color="black"
                  />
                }
                mr={3}
              ></Icon>
            </Pressable>
          </View>

      
          <View
            style={{ flexDirection: "row", alignSelf: "center", marginTop: 20 }}
          >
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
            />
            <Text style={{ marginLeft: 10 }}>I've read and agree on</Text>
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
    </View>
    </KeyboardAwareScrollView>
  );
};

SignUpScreen.navigationOptions = (props) => {
  return {
    headerTitle: "",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "white",
        height: 0,
      },
  //   headerLeft: () => (
  //     <TouchableOpacity onPress={() => props.navigation.goBack()}>
  //     <Image
  //       style={{ height: 15, width: 20, marginLeft: 10 }}
  //       source={require("../../../assets/back_arrow.png")}
  //     />
  //   </TouchableOpacity>
  // ),
  };
  
};
