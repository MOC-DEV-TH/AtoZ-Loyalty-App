import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import { Icon, Pressable } from "native-base";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import styles from "./styles";
import LogoBanner from "../../../components/LogoBanner";
import Button from "../../../components/Button";
import * as authActions from "../../../store/actions/auth";
import i18n from "../../../I18n/i18n";

const SignUpScreen = (props) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nrc, setNrc] = useState("");
  const [address, setAddress] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [typePassword, setTypePassword] = useState("");
  const [showTypePassword, setShowTypePassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [city, setCity] = useState(null);
  const [cityKey, setCityKey] = useState(1);
  const [township, setTownship] = useState(null);
  const [isTownshipFocus, setIsTownshipFocus] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateValue, setDateValue] = useState(null);
  const [gender, setGender] = useState(null);
  const [isGenderFocus, setIsGenderFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const genderData = [
    { label: "M", value: "Male" },
    { label: "F", value: "Female" },
  ];

  const loadAllDDLData = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(authActions.getAllDDL());
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadAllDDLData();
  }, [loadAllDDLData]);

  const cityDDL = useSelector((state) => state.auth.cityDDL);
  const townshipDDL = useSelector((state) => state.auth.townShipDDL);

  const townshipDDLData = townshipDDL.filter(
    (item) => item.division == cityKey
  );

  const createUserObj = () => {
    return {
      name: name,
      email: email,
      dob: dateValue || "",
      nrc: nrc,
      address: address,
      city: city?.key ?? 0,
      township: township?.key ?? 0,
      phone: phone,
      password: typePassword,
      confirm_password: confirmPassword,
      gender: gender?.label ?? "M",
    };
  };

  const onSignUpPress = async () => {
    if (name === "") {
      alert("Please Enter Name");
    } else if (phone === "") {
      alert("Please Enter Phone Number");
    } else if (typePassword === "") {
      alert("Please Enter Type Password");
    } else if (confirmPassword === "") {
      alert("Please Enter Confirm Password");
    } else if (confirmPassword !== typePassword) {
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

  const handleConfirm = (selectedDate) => {
    console.log(
      "A date has been picked: ",
      moment(selectedDate).format("YYYY-MM-DD")
    );
    hideDatePicker();
    setDateValue(moment(selectedDate).format("YYYY-MM-DD"));
  };

  const onPressTermAndCondition = () => {
    props.navigation.navigate("TermAndCondition");
  };

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View>
        <LogoBanner minHeight={200} statusBarHeight={true} />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={dateValue ? new Date(dateValue) : new Date()}
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
          {i18n.t("accountregistration")}
        </Text>

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={{ margin: 30 }}>
            <View style={styles.SectionStyle}>
              <Icon
                style={{ color: Colors.primary }}
                as={<MaterialIcons name={"person"} size={24} color="black" />}
              />
              <Text style={{ color: Colors.primary }}>*</Text>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={{
                    alignSelf: "center",
                    height: 20,
                    textAlign: "center",
                    width: "100%",
                  }}
                  placeholder={i18n.t("name")}
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setName(text)}
                  value={name}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={{ height: 10 }} />

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
              />
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={showDatePicker}
                  style={{
                    width: "100%",
                    height: 40,
                    position: "absolute",
                    zIndex: 2,
                  }}
                />
                <TextInput
                  style={{
                    alignSelf: "center",
                    height: 20,
                    color: "black",
                    textAlign: "center",
                  }}
                  editable={false}
                  placeholder={i18n.t("dob")}
                  placeholderTextColor="#aaaaaa"
                  value={dateValue || ""}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={{ height: 10 }} />

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
                  placeholder={i18n.t("nrc")}
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setNrc(text)}
                  value={nrc}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={{ height: 10 }} />

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
              placeholder={!isFocus ? i18n.t("city") : "..."}
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
                />
              )}
            />

            <View style={{ height: 10 }} />

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
              placeholder={!isTownshipFocus ? i18n.t("township") : "..."}
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
                />
              )}
            />

            <View style={{ height: 10 }} />

            <View style={styles.SectionStyle}>
              <Icon
                style={{ color: Colors.primary }}
                as={<MaterialIcons name={"email"} size={24} color="black" />}
              />
              <View style={{ flex: 1 }}>
                <TextInput
                  style={{
                    alignSelf: "center",
                    height: 20,
                    textAlign: "center",
                    width: "100%",
                  }}
                  placeholder={i18n.t("email")}
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={{ height: 10 }} />

            <View style={styles.SectionStyle}>
              <Icon
                style={{ color: Colors.primary }}
                as={<MaterialIcons name={"phone"} size={24} color="black" />}
              />
              <Text style={{ color: Colors.primary }}>*</Text>

              <View style={{ flex: 1 }}>
                <TextInput
                  style={{
                    alignSelf: "center",
                    height: 20,
                    textAlign: "center",
                    width: "100%",
                  }}
                  placeholder={i18n.t("ph")}
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setPhone(text)}
                  value={phone}
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={{ height: 10 }} />

            <View style={styles.PasswordSectionStyle}>
              <Icon
                style={{ color: Colors.primary }}
                as={<MaterialIcons name={"lock"} size={24} color="black" />}
              />
              <Text style={{ color: Colors.primary }}>*</Text>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={{
                    alignSelf: "flex-start",
                    height: 20,
                    textAlign: "center",
                    width: "100%",
                  }}
                  placeholder={i18n.t("typepwd")}
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
                />
              </Pressable>
            </View>

            <View style={{ height: 10 }} />

            <View style={styles.PasswordSectionStyle}>
              <Icon
                style={{ color: Colors.primary }}
                as={<MaterialIcons name={"lock"} size={24} color="black" />}
              />
              <Text style={{ color: Colors.primary }}>*</Text>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={{
                    alignSelf: "center",
                    height: 20,
                    textAlign: "center",
                    width: "100%",
                  }}
                  placeholder={i18n.t("confirmpwd")}
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
                />
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

              <TouchableOpacity onPress={onPressTermAndCondition}>
                <Text
                  style={{
                    color: Colors.primary,
                    paddingLeft: 10,
                  }}
                >
                  {i18n.t("agreetermandconditions")}
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              role="button"
              justifyContent="center"
              onPress={onSignUpPress}
              mt={30}
              isDisabled={!isChecked}
            >
              {i18n.t("register")}
            </Button>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;