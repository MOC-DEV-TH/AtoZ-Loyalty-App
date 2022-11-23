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
  KeyboardAvoidingView,
  ActivityIndicator,
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
import moment from "moment";
import styles from "./styles";
import { translate } from "react-native-translate";
import LogoBanner from "../../../components/LogoBanner";
import Button from "../../../components/Button";
import * as authActions from "../../../store/actions/auth";

export default SignUpScreen = (props) => {
  const [phone, setPhone] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nrc, setNrc] = useState("");
  const [address, setAddress] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [typePassword, setTypePassword] = useState("");
  const [showTypePassword, setShowTypePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [city, setCity] = useState(0);
  const [cityKey, setCityKey] = useState(1);
  const [township, setTownship] = useState(0);
  const [isTownshipFocus, setIsTownshipFocus] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateValue, setDateValue] = useState(null);
  const [gender, setGender] = useState("");
  const [isGenderFocus, setIsGenderFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const genderData = [
    { label: "M", value: "Male" },
    { label: "F", value: "Female" },
  ];

  useEffect(() => {
    loadAllDDLData();
  }, [loadAllDDLData]);

  const loadAllDDLData = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(authActions.getAllDDL());
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [setIsLoading, dispatch]);

  const cityDDL = useSelector((state) => state.auth.cityDDL);

  const townshipDDL = useSelector((state) => state.auth.townShipDDL);
  const townshipDDLData = townshipDDL.filter(
    (item) => item.division == cityKey
  );

  const createUserObj = () => {
    const userObj = {
      name: name,
      email: email,
      dob: dateValue,
      nrc: nrc,
      address: address,
      city: city.key == undefined ? 0 : city.key,
      township: township.key == undefined ? 0 : township.key,
      phone: phone,
      password: typePassword,
      confirm_password: confirmPassword,
      gender: gender.label == undefined ? "M" : gender.label,
    };
    return userObj;
  };
  const onSignUpPress = async () => {
    if (name === "") {
      alert("Please Enter Name");
    } else if (phone === 0) {
      alert("Please Enter Phone Number");
    } else if (typePassword === "") {
      alert("Please Enter Type Password");
    } else if (confirmPassword === "") {
      alert("Please Enter Confirm Password");
    } else if (confirmPassword != typePassword) {
      alert("Password does not match!");
    } else {
      const userObj = createUserObj();
      console.log("CityKey", userObj.city);
      props.navigation.replace("AccountVerification", {
        userObj: userObj,
      });
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateValue) => {
    console.log(
      "A date has been picked: ",
      moment(dateValue).format("YYYY-MM-DD")
    );
    hideDatePicker();
    setDateValue(moment(dateValue).format("YYYY-MM-DD").toString());
  };

  const onPressTermAndCondition = () => {
    props.navigation.navigate("TermAndCondition");
  };

  return (
    <>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View>
          <LogoBanner minHeight={200} statusBarHeight={true}></LogoBanner>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            display={Platform.OS === "ios" ? "inline" : "default"}
          />
          <View style={{ height: 20 }} />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              alignSelf: "center",
              color: Colors.primary,
              padding: 10,
            }}
          >
            {translate("accountregistration")}
          </Text>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={{ margin: 30 }}>
              <View style={styles.SectionStyle}>
                <Icon
                  style={{ color: Colors.primary }}
                  as={<MaterialIcons name={"person"} size={24} color="black" />}
                ></Icon>
                <Text style={{ color: Colors.primary }}>*</Text>
                <View style={{ flex: 1 }}>
                  <TextInput
                    style={{
                      alignSelf: "center",
                      height: 20,
                      textAlign: "center",
                      width: "100%",
                    }}
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
                      name={"date-range"}
                      size={24}
                      color="black"
                    />
                  }
                ></Icon>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => showDatePicker()}
                    style={{
                      width: "100%",
                      height: 40,
                      position: "absolute",
                      zIndex: 2,
                    }}
                  ></TouchableOpacity>
                  <TextInput
                    style={{
                      alignSelf: "center",
                      height: 20,
                      color: "black",
                      textAlign: "center",
                    }}
                    editable={false}
                    placeholder={translate("dob")}
                    placeholderTextColor="#aaaaaa"
                    value={dateValue}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={{ height: 10 }}></View>

              <View style={styles.SectionStyle}>
                <AntDesign name="idcard" color={Colors.primary} size={15} />

                <View style={{ flex: 1 }}>
                  <TextInput
                    style={{
                      alignSelf: "center",
                      height: 20,
                      textAlign: "center",
                      width: "100%",
                    }}
                    placeholder={translate("nrc")}
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setNrc(text)}
                    value={nrc}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* <View style={{ height: 10 }}></View>

              <Dropdown
                style={[
                  styles.dropdown,
                  isGenderFocus && { borderColor: Colors.primary },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={genderData}
                maxHeight={300}
                labelField="value"
                valueField="value"
                placeholder={!isGenderFocus ? translate("gender") : "..."}
                value={gender}
                onFocus={() => setIsGenderFocus(true)}
                onBlur={() => setIsGenderFocus(false)}
                onChange={(item) => {
                  setGender(item);
                  setIsGenderFocus(false);
                }}
                renderLeftIcon={() => (
                  <Ionicons
                    style={{ marginLeft: 4 }}
                    name="transgender"
                    size={15}
                    color={Colors.primary}
                  />
                )}
              /> */}

              {/* <View style={{ height: 10 }}></View>

              <View style={styles.SectionStyle}>
                <Icon
                  style={{ color: Colors.primary }}
                  as={<MaterialIcons name={"home"} size={24} color="black" />}
                ></Icon>

                <View style={{ flex: 1 }}>
                  <TextInput
                    style={{
                      alignSelf: "center",
                      height: 20,
                      textAlign: "center",
                      width: "100%",
                    }}
                    placeholder={translate("address")}
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setAddress(text)}
                    value={address}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                  />
                </View>
              </View> */}

              <View style={{ height: 10 }}></View>

              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && { borderColor: Colors.primary },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={cityDDL}
                maxHeight={300}
                labelField="value"
                valueField="value"
                placeholder={!isFocus ? translate("city") : "..."}
                value={city}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setCity(item);
                  setCityKey(item.key);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <Icon
                    style={{ color: Colors.primary, marginLeft: 4 }}
                    as={<MaterialIcons name={"home"} size={24} color="black" />}
                  ></Icon>
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
                  <Icon
                    style={{ color: Colors.primary, marginLeft: 4 }}
                    as={<MaterialIcons name={"home"} size={24} color="black" />}
                  ></Icon>
                )}
              />

              <View style={{ height: 10 }}></View>

              <View style={styles.SectionStyle}>
                <Icon
                  style={{ color: Colors.primary }}
                  as={<MaterialIcons name={"email"} size={24} color="black" />}
                ></Icon>
                <View style={{ flex: 1 }}>
                  <TextInput
                    style={{
                      alignSelf: "center",
                      height: 20,
                      textAlign: "center",
                      width: "100%",
                    }}
                    placeholder={translate("email")}
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={{ height: 10 }}></View>

              <View style={styles.SectionStyle}>
                <Icon
                  style={{ color: Colors.primary }}
                  as={<MaterialIcons name={"phone"} size={24} color="black" />}
                ></Icon>
                <Text style={{ color: Colors.primary }}>*</Text>

                <View style={{ flex: 1 }}>
                  <TextInput
                    style={{
                      alignSelf: "center",
                      height: 20,
                      textAlign: "center",
                      width: "100%",
                    }}
                    placeholder={translate("ph")}
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                    keyboardType="numeric"
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
                ></Icon>
                <Text style={{ color: Colors.primary }}>*</Text>
                <View style={{ flex: 1 }}>
                  <TextInput
                    style={{
                      alignSelf: "flex-start",
                      height: 20,
                      textAlign: "center",
                      width: "100%",
                    }}
                    placeholder={translate("typepwd")}
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
                ></Icon>
                <Text style={{ color: Colors.primary }}>*</Text>
                <View style={{ flex: 1 }}>
                  <TextInput
                    style={{
                      alignSelf: "center",
                      height: 20,
                      textAlign: "center",
                      width: "100%",
                    }}
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
                {/* <Text style={{ color: Colors.primary, marginLeft: 10 }}>
                  {translate("agreeon")}
                </Text> */}
                <TouchableOpacity onPress={onPressTermAndCondition}>
                  <Text
                    style={{
                      color: Colors.primary,
                      paddingLeft: 10,
                    }}
                  >
                    {translate("agreetermandconditions")}
                  </Text>
                </TouchableOpacity>
              </View>

              <Button
                role="button"
                justifyContent="center"
                onPress={() => onSignUpPress()}
                mt={30}
                isDisabled={isChecked ? false : true}
              >
                {translate("register")}
              </Button>
            </View>
          )}
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
