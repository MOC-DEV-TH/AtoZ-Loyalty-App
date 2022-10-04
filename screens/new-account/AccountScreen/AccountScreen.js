import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert, TouchableOpacity } from "react-native";
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
  Heading,
  Image,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  Link,
  Spacer,
  Button,
} from "native-base";
import Img from "../../../components/Img";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ContainerFluid from "../../../components/ContainerFluid";
import { useState, useEffect, useCallback } from "react";
import Colors from "../../../constants/Colors";
import i18n from "../../../I18n/i18n";
import { storeData, getStoreData } from "../../../AsyncStorage/AsyncStorage";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as myAccountActions from "../../../store/actions/myAccount";
import { setLocalization, translate } from "react-native-translate";
import my from "../../../locales/my";
import en from "../../../locales/en";
import AwesomeAlert from "react-native-awesome-alerts";
import SessionExpireAlert from "../../../components/SessionExpireAlert";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import Text from "../../../components/Typography";


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
        <Box w={"40%"} alignItems={"flex-end"} pr={10}>{icon}</Box>
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

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let [locale, setLocale] = useState("");
  let [showAlert, setShowAlert] = useState(false);
  let [sessionAlert, setSessionAlert] = useState(false);
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
    if (currentPassword != "" || newPassword != "" || confirmPassword != "") {
      dispatch(
        myAccountActions.updateAccount(
          currentPassword,
          newPassword,
          confirmPassword
        )
      );
    }
  };

  const onConfirm = () => {
    dispatch(myAccountActions.setEmptyResponseCode());
    props.navigation.navigate("AccountDashboard");
    setSessionAlert(false);
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
      <ScrollView>
      <Box alignItems={"center"} pt={30} pb={45}>
        <FontAwesome name="user-circle-o" size={50} color={Colors.primary} />
        <Box maxW="250" w="100%" mt={25}>
          <VStack space={3}>
            <HStack alignItems="center">
              <Text
                color="primary"
                w={"50%"}
                style={{ fontFamily: translate("bodyFont") }}
              >
                {translate("userid")}
              </Text>
              <Text
                color="primary"
                w={"50%"}
                style={{ fontFamily: translate("bodyFont") }}
              >
                {memberInfo.user_id}
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Text
                color="primary"
                w={"50%"}
                style={{ fontFamily: translate("bodyFont") }}
              >
                {translate("pointcollected")}
              </Text>
              <Text
                color="primary"
                w={"50%"}
                style={{ fontFamily: translate("bodyFont") }}
              >
                {memberInfo.current_point}
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Text
                color="primary"
                w={"50%"}
                style={{ fontFamily: translate("bodyFont") }}
              >
                {translate("membertype")}
              </Text>
              <Text
                color="primary"
                w={"50%"}
                style={{ fontFamily: translate("bodyFont") }}
              >
                {memberInfo.member_level}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Box>

      <ContainerFluid px={5}>
        <VStack space={25}>
          {/* Account Information */}
          <Collapse isExpanded={showAccTab} onToggle={()=>{
              setShowAccTab(true);
              setShowPwTab(false);
              console.log("Acc tab clicked")
            }} >
            <CollapseHeader>
              <CollapseHeaderInner
                title="Account Information"
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
                  <Text w={"40%"} color="primary" fontFamily={"enFont"}>
                    {translate("name")}
                  </Text>
                  <Text w={"60%"} color="primary" pl={5}>
                    {/* {memberInfo.name} */}
                  </Text>
                </HStack>

                <HStack alignItems={"center"}>
                  <Text w={"40%"} color="primary" fontFamily={"enFont"}>
                    {translate("dob")}
                  </Text>
                  <Text w={"60%"} color="primary" pl={5}>
                    {/* {memberInfo.dob} */}
                  </Text>
                </HStack>

                <HStack alignItems={"center"}>
                  <Text w={"40%"} color="primary" fontFamily={"enFont"}>
                    {translate("nrc")}
                  </Text>
                  <Text w={"60%"} color="primary" pl={5}>
                    {/* {memberInfo.nrc} */}
                  </Text>
                </HStack>

                <HStack alignItems={"center"}>
                  <Text w={"40%"} color="primary" fontFamily={"enFont"}>
                    {translate("address")}
                  </Text>
                  <Text w={"60%"} color="primary" pl={5}>
                    {/* {memberInfo.address} */}
                  </Text>
                </HStack>

                <HStack alignItems={"center"}>
                  <Text w={"40%"} color="primary" fontFamily={"enFont"}>
                    {translate("city")}
                  </Text>
                  <Text w={"60%"} color="primary" pl={5}>
                    {/* {memberInfo.city} */}
                  </Text>
                </HStack>

                <HStack alignItems={"center"}>
                  <Text w={"40%"} color="primary" fontFamily={"enFont"}>
                    {translate("membersince")}
                  </Text>
                  <Text w={"60%"} color="primary" pl={5}>
                    {/* {memberInfo.created_date} */}
                  </Text>
                </HStack>
              </VStack>
            </CollapseBody>
          </Collapse>

          {/* Change Password */}
          <Collapse isExpanded={showPwTab} onToggle={()=>{
              setShowPwTab(true);
              setShowAccTab(false);
              console.log("Password tab clicked")
            }} >
            <CollapseHeader>
              <CollapseHeaderInner
                title="Change Password"
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
                  <Text color="primary" mb={2} fontWeight={"bold"} fontFamily={translate("nativebaseFont")}>
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
                  <Text color="primary" mb={2} fontWeight={"bold"} fontFamily={translate("nativebaseFont")}>
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
                  <Button size={"lg"}  bg={Colors.yellow} _text={{color:Colors.primary, textTransform:"uppercase", fontFamily:translate("headingFont")}} px={10} onPress={() => onPressSave()}>Save</Button>
                </HStack>

              </VStack>
            </CollapseBody>
          </Collapse>
        </VStack>
      </ContainerFluid>
    </ScrollView>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "",
    headerTintColor: "black",
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: Colors.primary,
    },

    headerLeft: () => (
      <TouchableOpacity onPress={() => navData.navigation.navigate("Home")}>
        <Text style={{ marginLeft: 20, color: Colors.white }}>
          {translate("backtohome")}
        </Text>
      </TouchableOpacity>
    ),
  };
};
