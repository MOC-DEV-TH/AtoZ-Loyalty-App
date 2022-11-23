import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ActivityIndicator
} from "react-native";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  HStack,
  VStack,
  Input,
  Stack,
  FormControl,
  Pressable,
  Image,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  Link,
  Spacer,
  Flex,
} from "native-base";
import Img from "../../../components/Img";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ContainerFluid from "../../../components/ContainerFluid";
import { useState, useEffect, useCallback } from "react";
import Colors from "../../../constants/Colors";
import i18n from "../../../I18n/i18n";
import Button from "../../../components/Button";
import { storeData, getStoreData } from "../../../AsyncStorage/AsyncStorage";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as myAccountActions from "../../../store/actions/myAccount";
import { setLocalization, translate } from "react-native-translate";
import my from "../../../locales/my";
import en from "../../../locales/en";
import AwesomeAlert from "react-native-awesome-alerts";
import SessionExpireAlert from "../../../components/SessionExpireAlert";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DeactivateAccountAlert from "../../../components/DeactivateAccountAlert";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import Text, { Heading } from "../../../components/Typography";
import { BackHandler } from "react-native";

const CollapseHeaderInner = ({ title, icon }) => {
  return (
    <>
      <Stack
        py={3}
        direction={"row"}
        alignContent={"center"}
        alignItems={"center"}
        justifyContent="center"
        bg={"primary"}
        borderRadius={30}
      >
        <Box w={"40%"} alignItems={"flex-end"} pr={10}>
          {icon}
        </Box>
        <Heading
          size="sm"
          w={"60%"}
          fontWeight={"bold"}
          color="white"
          fontFamily={translate("nativebaseFont")}
        >
          {title}
        </Heading>
      </Stack>
    </>
  );
};

export default AccountScreen = (props) => {
  const [currentPwshow, setcurrentPwShow] = useState(false);
  const [confirmPwshow, setconfirmPwShow] = useState(false);
  const [newPwshow, setNewPwShow] = useState(false);
  let [showDeactivateAlert, setShowDeactivateAlert] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let [locale, setLocale] = useState("");
  let [showAlert, setShowAlert] = useState(false);
  let [sessionAlert, setSessionAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const dispatch = useDispatch();

  //state
  const [showAccTab, setShowAccTab] = useState(false);
  const [showPwTab, setShowPwTab] = useState(false);

  function onPressConfirm() {
    setShowAlert(false);
    props.navigation.navigate("AccountDashboard");
  }
  function onPressCancel() {
    setShowAlert(false);
  }
  function onPressDeactivateCancel() {
    setShowDeactivateAlert(false);
  }

  const onPressDeactivateNow = async () => {
    setShowDeactivateAlert(false);
    setShowLoading(true);
    await dispatch(myAccountActions.deactivateAccount(props));
    setShowLoading(false);
  };

  function handleBackButtonClick() {
    props.navigation.navigate("Setting");
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  useEffect(() => {
    getStoreData(AsyncStorageKey.LANGUAGE).then((value) => {
      setLocale(value);
    });
  }, []);

  const onPressChangeLanguage = () => {
    console.log("LanguageValue" + locale);
    if (locale == "en") {
      setLocale("my");
      setLocalization(my);
      storeData(AsyncStorageKey.LANGUAGE, "my");
    } else if (locale == "my") {
      setLocale("en");
      setLocalization(en);
      storeData(AsyncStorageKey.LANGUAGE, "en");
    }
  };

  const loadMemberInfo = useCallback(async () => {
    try {
      await dispatch(myAccountActions.getMemberInfo());
    } catch (error) {
      setError(error.message);
    }
  });
  useEffect(() => {
    loadMemberInfo();

    if (responseCode == "005") {
      showSessionDialog();
    }
  });
  const memberInfo = useSelector(
    (state) => state.myAccount.memberInfo,
    shallowEqual
  );
  console.log("UserName" + memberInfo.name);

  const onPressSave = () => {
    if (currentPassword != "" || newPassword != "") {
      dispatch(
        myAccountActions.updateAccount(currentPassword, newPassword, props)
      );
    }
  };
  const onConfirm = () => {
    dispatch(myAccountActions.setEmptyResponseCode());
    props.navigation.navigate("AccountDashboard");
    setSessionAlert(false);
  };

  const navigateToAccountDashboard = () => {
    props.navigation.navigate("AccountDashboard");
  };

  const responseCode = useSelector(
    (state) => state.myAccount.response_code,
    shallowEqual
  );

  const showSessionDialog = useCallback(() => {
    setSessionAlert(true);
  });

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Box alignItems={"center"} pt={30} pb={45}>
          <FontAwesome name="user-circle-o" size={50} color={Colors.primary} />
          <Box maxW="250" w="100%" mt={25}>
            <VStack space={3}>
              <HStack alignItems="center">
                <Text color="primary" w={"50%"} style={styles.description}>
                  {translate("userid")}
                </Text>
                <Text color="primary" w={"50%"} style={styles.description}>
                  {memberInfo.user_id}
                </Text>
              </HStack>
              <HStack alignItems="center">
                <Text color="primary" w={"50%"} style={styles.description}>
                  {translate("pointcollected")}
                </Text>
                <Text color="primary" w={"50%"} style={styles.description}>
                  {memberInfo.current_point}
                </Text>
              </HStack>
              <HStack alignItems="center">
                <Text color="primary" w={"50%"} style={styles.description}>
                  {translate("membertype")}
                </Text>
                <HStack alignItems={"center"} w={"50%"}>
                  <Text color="primary" style={styles.description}>
                    {memberInfo.member_level}
                  </Text>
                  {memberInfo.isVIP === "1" ? (
                    <ImageBackground
                      source={require("../../../assets/vip_bg.png")}
                      resizeMode="contain"
                      style={{
                        width: 45,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 40,
                        marginLeft: 10,
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          color: Colors.primary,
                          fontFamily: translate("headingFont"),
                          fontWeight: "bold",
                          paddingLeft: 5,
                          paddingTop:Platform.OS=='ios' ? 4 : 0
                        }}
                      >
                        VIP
                      </Text>
                    </ImageBackground>
                  ) : undefined}
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </Box>

        <ContainerFluid px={5}>
          <VStack space={25}>
            {/* Account Information */}
            <Collapse
              isExpanded={showAccTab}
              onToggle={() => {
                setShowAccTab(true);
                setShowPwTab(false);
                console.log("Acc tab clicked");
              }}
            >
              <CollapseHeader>
                <CollapseHeaderInner
                  title={translate("accountInformation")}
                  icon={
                    <FontAwesome
                      name="user-circle-o"
                      size={24}
                      color={Colors.white}
                    />
                  }
                />
              </CollapseHeader>
              <CollapseBody>
                <VStack space={2} mt={5} px={2}>
                  <HStack alignItems={"center"}>
                    <Text
                      style={styles.description}
                      w={"40%"}
                      color="primary"
                      fontFamily={"enFont"}
                    >
                      {translate("name")}
                    </Text>
                    <Text
                      style={styles.description}
                      w={"60%"}
                      color="primary"
                      pl={5}
                    >
                      {memberInfo.name}
                    </Text>
                  </HStack>

                  <HStack alignItems={"center"}>
                    <Text
                      style={styles.description}
                      w={"40%"}
                      color="primary"
                      fontFamily={"enFont"}
                    >
                      {translate("dob")}
                    </Text>
                    <Text
                      style={styles.description}
                      w={"60%"}
                      color="primary"
                      pl={5}
                    >
                      {memberInfo.dob}
                    </Text>
                  </HStack>

                  <HStack alignItems={"center"}>
                    <Text
                      style={styles.description}
                      w={"40%"}
                      color="primary"
                      fontFamily={"enFont"}
                    >
                      {translate("nrc")}
                    </Text>
                    <Text
                      style={styles.description}
                      w={"60%"}
                      color="primary"
                      pl={5}
                    >
                      {memberInfo.nrc}
                    </Text>
                  </HStack>

                  <HStack alignItems={"center"}>
                    <Text
                      style={styles.description}
                      w={"40%"}
                      color="primary"
                      fontFamily={"enFont"}
                    >
                      {translate("address")}
                    </Text>
                    <Text
                      style={styles.description}
                      w={"60%"}
                      color="primary"
                      pl={5}
                    >
                      {memberInfo.address}
                    </Text>
                  </HStack>

                  <HStack alignItems={"center"}>
                    <Text
                      style={styles.description}
                      w={"40%"}
                      color="primary"
                      fontFamily={"enFont"}
                    >
                      {translate("city")}
                    </Text>
                    <Text
                      style={styles.description}
                      w={"60%"}
                      color="primary"
                      pl={5}
                    >
                      {memberInfo.city}
                    </Text>
                  </HStack>

                  <HStack alignItems={"center"}>
                    <Text
                      style={styles.description}
                      w={"40%"}
                      color="primary"
                      fontFamily={"enFont"}
                    >
                      {translate("membersince")}
                    </Text>
                    <Text
                      style={styles.description}
                      w={"60%"}
                      color="primary"
                      pl={5}
                    >
                      {memberInfo.created_date}
                    </Text>
                  </HStack>
                </VStack>
              </CollapseBody>
            </Collapse>

            {/* Change Password */}
            <Collapse
              isExpanded={showPwTab}
              onToggle={() => {
                setShowPwTab(true);
                setShowAccTab(false);
                console.log("Password tab clicked");
              }}
            >
              <CollapseHeader>
                <CollapseHeaderInner
                  title={translate("changepwd")}
                  icon={
                    <MaterialCommunityIcons
                      name="onepassword"
                      size={24}
                      color={Colors.white}
                    />
                  }
                />
              </CollapseHeader>
              <CollapseBody>
                <VStack space={2} mt={5} px={2}>
                  <Box>
                    <Text
                      style={styles.description}
                      color="primary"
                      mb={2}
                      fontWeight={"bold"}
                      fontFamily={translate("nativebaseFont")}
                    >
                      {translate("currentpwd")}
                    </Text>
                    <Box color="primary">
                      <Input
                        size="md"
                        type={currentPwshow ? "text" : "password"}
                        onChangeText={(text) => setCurrentPassword(text)}
                        value={currentPassword}
                        borderRadius={30}
                        borderColor={"primary"}
                        px={4}
                        fontFamily={translate("nativebaseFont")}
                        InputRightElement={
                          <Pressable
                            onPress={() => setcurrentPwShow(!currentPwshow)}
                          >
                            <Icon
                              as={
                                <MaterialIcons
                                  name={
                                    currentPwshow
                                      ? "visibility"
                                      : "visibility-off"
                                  }
                                  size={20}
                                  color="black"
                                />
                              }
                              mr={3}
                            ></Icon>
                          </Pressable>
                        }
                      />
                    </Box>
                  </Box>

                  <Box>
                    <Text
                      style={styles.description}
                      color="primary"
                      mb={2}
                      fontWeight={"bold"}
                      fontFamily={translate("nativebaseFont")}
                    >
                      {translate("newpwd")}
                    </Text>
                    <Box color="primary">
                      <Input
                        size="md"
                        type={newPwshow ? "text" : "password"}
                        onChangeText={(text) => setNewPassword(text)}
                        value={newPassword}
                        borderRadius={30}
                        borderColor={"primary"}
                        px={4}
                        fontFamily={translate("nativebaseFont")}
                        InputRightElement={
                          <Pressable onPress={() => setNewPwShow(!newPwshow)}>
                            <Icon
                              as={
                                <MaterialIcons
                                  name={
                                    newPwshow ? "visibility" : "visibility-off"
                                  }
                                  size={20}
                                  color="black"
                                />
                              }
                              mr={3}
                            ></Icon>
                          </Pressable>
                        }
                      />
                    </Box>
                  </Box>

                  <HStack justifyContent={"flex-end"} mt={5}>
                    <TouchableOpacity
                      onPress={() => onPressSave(props.navigation)}
                    >
                      <View
                        style={{
                          backgroundColor: Colors.yellow,
                          width: 150,
                          height: 48,
                          borderRadius: 24,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.primary,
                            textTransform: "uppercase",
                            fontFamily: translate("headingFont"),
                          }}
                        >
                          {translate("save")}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </HStack>
                </VStack>
              </CollapseBody>
            </Collapse>
           
           <TouchableOpacity onPress={()=> setShowDeactivateAlert(true)}>
            <CollapseHeaderInner
                  title= {translate("deactivate")}
                  icon={
                    <Image
                    style={{ height: 30, width: 30, resizeMode: "contain" }}
                    source={require("../../../assets/deactivate_icon.png")}
                  />
                  }
           />
           </TouchableOpacity>

           <DeactivateAccountAlert
        showAlert={showDeactivateAlert}
        onConfirmPressed={onPressDeactivateNow}
        onCancelPressed={onPressDeactivateCancel}
      />

          </VStack>
          {showLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size={"large"} color={Colors.primary} />
          </View>
        ) : undefined}
        </ContainerFluid>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = (props) => {
  return {
    headerTitle: () => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 22, color: Colors.white, padding: 10 }}>
          {translate("myaccount")}
        </Text>
      </View>
    ),
    headerLeft: () => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.navigate("Setting")}>
          <Image
            style={styles.headerIcon}
            source={require("../../../assets/left_arrow_circle.png")}
          />
        </TouchableOpacity>
      </View>
    ),
  };
};
