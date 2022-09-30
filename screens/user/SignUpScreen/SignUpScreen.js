import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Platform,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Colors from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as userActions from "../../../store/actions/users";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import { Center, Icon, Pressable, HStack, Box } from "native-base";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import styles from "./styles";
import { translate } from "react-native-translate";
import LogoBanner from "../../../components/LogoBanner";

export default SignUpScreen = (props) => {
  const [phone, setPhone] = useState(0);
  const [name, setName] = useState("");
  const [nrc, setNrc] = useState("");
  const [address, setAddress] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [typePassword, setTypePassword] = useState("");
  const [showTypePassword, setShowTypePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [city, setCity] = useState(null);
  const [township, setTownship] = useState(null);
  const [isTownshipFocus, setIsTownshipFocus] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateValue, setDateValue] = useState(null);
  const [responseStatus,setResponseStatus] = useState(null)
  const dispatch = useDispatch();

  const allDDLData = useSelector(
    (state) => state.auth.allDropDownData,
    shallowEqual
  );
  const cityDDLData = allDDLData.city;
  const townshipDDLData = allDDLData.township;

  const response_status = useSelector(
    (state) => state.user.status,
    shallowEqual
  );
  useEffect(()=>{
    if(response_status=="Success"){
      props.navigation.replace("AccountVerification")
    }
  })
  const createUserObj = () => {
    const userObj = {
      name: name,
      dob: dateValue,
      nrc: nrc,
      address: address,
      city: city.key,
      township: township.key,
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateValue) => {
    console.log("A date has been picked: ", moment(dateValue).format('YYYY-MM-DD'));
    hideDatePicker();
    setDateValue(moment(dateValue).format('YYYY-MM-DD').toString());
  };

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View>
          <LogoBanner minHeight={200} statusBarHeight={true}></LogoBanner>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <View style={{ height: 20 }} />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                alignSelf: "center",
                color: Colors.primary,
              }}
            >
              {translate("accountregistration")}
            </Text>
            <View style={{ margin: 30 }}>
              <View style={styles.SectionStyle}>
                <Icon
                  style={{ color: Colors.primary }}
                  as={<MaterialIcons name={"person"} size={24} color="black" />}
                ></Icon>

                <View style={{ flex: 1 }}>
                  <TextInput
                    style={{ alignSelf: "center",height:20,textAlign:"center"}}
                    placeholder={translate("name")}
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
                <TouchableOpacity onPress={()=>showDatePicker()}>
                <TextInput
                    style={{ alignSelf: "center",height:20,color:'black',textAlign:"center" }}
                    editable={false}
                    placeholder={translate("dob")}
                    placeholderTextColor="#aaaaaa"
                    value={dateValue}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                  />
                </TouchableOpacity>
                 
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
                    style={{ alignSelf: "center",height:20,textAlign:"center" }}
                    placeholder={translate("nrc")}
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
                  as={
                    <MaterialIcons name={"home-work"} size={24} color="black" />
                  }
                ></Icon>

                <View style={{ flex: 1 }}>
                  <TextInput
                    style={{ alignSelf: "center",height:20,textAlign:"center" }}
                    placeholder={translate("address")}
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
                style={[
                  styles.dropdown,
                  isFocus && { borderColor: Colors.primary },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={cityDDLData}
                maxHeight={300}
                labelField="value"
                valueField="value"
                placeholder={!isFocus ? translate("city") : "..."}
                value={city}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setCity(item);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign color={Colors.primary} name="home" size={20} />
                )}
              />
              <View style={{ height: 10 }}></View>

              <Dropdown
                style={[
                  styles.dropdown,
                  isTownshipFocus && { borderColor: Colors.primary },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={townshipDDLData}
                maxHeight={300}
                labelField="value"
                valueField="value"
                placeholder={!isTownshipFocus ? translate("township") : "..."}
                value={township}
                onFocus={() => setIsTownshipFocus(true)}
                onBlur={() => setIsTownshipFocus(false)}
                onChange={(item) => {
                  setTownship(item);
                  setIsTownshipFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign color={Colors.primary} name="home" size={20} />
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
                    style={{ alignSelf: "center",height:20,textAlign:"center" }}
                    placeholder= {translate("ph")}
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
                    style={{ alignSelf:"flex-start",height:20,textAlign:"center" }}
                    placeholder= {translate("typepwd")}
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setTypePassword(text)}
                    value={typePassword}
                    secureTextEntry={!showTypePassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                  />
                </View>
                <Pressable
                  onPress={() => setShowTypePassword(!showTypePassword)}
                >
                  <Icon
                    style={{ color: Colors.primary }}
                    as={
                      <MaterialIcons
                        name={
                          showTypePassword ? "visibility" : "visibility-off"
                        }
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
                    style={{ alignSelf: "center" ,height:20,textAlign:"center" }}
                    placeholder={translate("confirmpwd")}
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                  />
                </View>
                <Pressable
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon
                    style={{ color: Colors.primary }}
                    as={
                      <MaterialIcons
                        name={
                          showConfirmPassword ? "visibility" : "visibility-off"
                        }
                        size={24}
                        color="black"
                      />
                    }
                    mr={3}
                  ></Icon>
                </Pressable>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-start",
                  marginTop: 20,
                }}
              >
                <Checkbox
                  
                  value={isChecked}
                  color={isChecked ? Colors.primary : undefined}
                  onValueChange={setChecked}
                />
                <Text style={{color:Colors.primary, marginLeft: 10 }}>{translate("agreeon")}</Text>
                <TouchableOpacity onPress={onSignInPress}>
                  <Text
                    style={{ color: Colors.primary, textDecorationLine: "underline" }}
                  >
                    {translate("termandcondition")}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => onSignUpPress()}
              >
                <Text style={styles.buttonTitle}>{translate("register")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
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
