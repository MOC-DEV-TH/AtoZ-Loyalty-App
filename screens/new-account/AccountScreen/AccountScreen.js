import {
  View,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ActivityIndicator,
  Image,
  BackHandler,
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
  Pressable,
  Icon,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ContainerFluid from "../../../components/ContainerFluid";
import { useState, useEffect, useCallback } from "react";
import Colors from "../../../constants/Colors";
import i18n from "../../../I18n/i18n";
import { storeData, getStoreData } from "../../../AsyncStorage/AsyncStorage";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as myAccountActions from "../../../store/actions/myAccount";
import SessionExpireAlert from "../../../components/SessionExpireAlert";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DeactivateAccountAlert from "../../../components/DeactivateAccountAlert";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import Text, { Heading } from "../../../components/Typography";

const getFontFamily = () => {
  return i18n.locale === "my" ? "myFont" : "enFont";
};

const CollapseHeaderInner = ({ title, icon }) => {
  return (
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
        fontFamily={getFontFamily()}
      >
        {title}
      </Heading>
    </Stack>
  );
};

const AccountScreen = (props) => {
  const [currentPwshow, setcurrentPwShow] = useState(false);
  const [newPwshow, setNewPwShow] = useState(false);
  const [showDeactivateAlert, setShowDeactivateAlert] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [locale, setLocale] = useState(i18n.locale || "en");
  const [sessionAlert, setSessionAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const [showAccTab, setShowAccTab] = useState(false);
  const [showPwTab, setShowPwTab] = useState(false);

  const dispatch = useDispatch();

  const memberInfo = useSelector(
    (state) => state.myAccount.memberInfo,
    shallowEqual
  );

  const responseCode = useSelector(
    (state) => state.myAccount.response_code,
    shallowEqual
  );

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
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonClick
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    getStoreData(AsyncStorageKey.LANGUAGE).then((value) => {
      if (value === "my") {
        i18n.locale = "my";
        setLocale("my");
      } else {
        i18n.locale = "en";
        setLocale("en");
      }
    });
  }, []);

  const onPressChangeLanguage = async () => {
    if (locale === "en") {
      i18n.locale = "my";
      setLocale("my");
      await storeData(AsyncStorageKey.LANGUAGE, "my");
    } else {
      i18n.locale = "en";
      setLocale("en");
      await storeData(AsyncStorageKey.LANGUAGE, "en");
    }
  };

  const loadMemberInfo = useCallback(async () => {
    try {
      await dispatch(myAccountActions.getMemberInfo());
    } catch (error) {
      console.log(error?.message);
    }
  }, [dispatch]);

  useEffect(() => {
    loadMemberInfo();
  }, [loadMemberInfo]);

  useEffect(() => {
    if (responseCode === "005") {
      setSessionAlert(true);
    }
  }, [responseCode]);

  const onPressSave = () => {
    if (currentPassword !== "" || newPassword !== "") {
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

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Box alignItems={"center"} pt={30} pb={45}>
          <FontAwesome name="user-circle-o" size={50} color={Colors.primary} />
          <Box maxW="250" w="100%" mt={25}>
            <VStack space={3}>
              <HStack alignItems="center">
                <Text color="primary" w={"50%"} style={styles.description}>
                  {i18n.t("userid")}
                </Text>
                <Text color="primary" w={"50%"} style={styles.description}>
                  {memberInfo.user_id}
                </Text>
              </HStack>

              <HStack alignItems="center">
                <Text color="primary" w={"50%"} style={styles.description}>
                  {i18n.t("pointcollected")}
                </Text>
                <Text color="primary" w={"50%"} style={styles.description}>
                  {memberInfo.current_point}
                </Text>
              </HStack>

              <HStack alignItems="center">
                <Text color="primary" w={"50%"} style={styles.description}>
                  {i18n.t("membertype")}
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
                          fontFamily: getFontFamily(),
                          fontWeight: "bold",
                          paddingLeft: 5,
                          paddingTop: Platform.OS == "ios" ? 4 : 0,
                        }}
                      >
                        VIP
                      </Text>
                    </ImageBackground>
                  ) : null}
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </Box>

        <ContainerFluid px={5}>
          <VStack space={25}>
            <Collapse
              isExpanded={showAccTab}
              onToggle={() => {
                setShowAccTab(true);
                setShowPwTab(false);
              }}
            >
              <CollapseHeader>
                <CollapseHeaderInner
                  title={i18n.t("accountInformation")}
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
                      {i18n.t("name")}
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
                      {i18n.t("dob")}
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
                      {i18n.t("nrc")}
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
                      {i18n.t("address")}
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
                      {i18n.t("city")}
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
                      {i18n.t("membersince")}
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

            <Collapse
              isExpanded={showPwTab}
              onToggle={() => {
                setShowPwTab(true);
                setShowAccTab(false);
              }}
            >
              <CollapseHeader>
                <CollapseHeaderInner
                  title={i18n.t("changepwd")}
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
                      fontFamily={getFontFamily()}
                    >
                      {i18n.t("currentpwd")}
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
                        fontFamily={getFontFamily()}
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
                            />
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
                      fontFamily={getFontFamily()}
                    >
                      {i18n.t("newpwd")}
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
                        fontFamily={getFontFamily()}
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
                            />
                          </Pressable>
                        }
                      />
                    </Box>
                  </Box>

                  <HStack justifyContent={"flex-end"} mt={5}>
                    <TouchableOpacity onPress={onPressSave}>
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
                            fontFamily: getFontFamily(),
                          }}
                        >
                          {i18n.t("save")}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </HStack>
                </VStack>
              </CollapseBody>
            </Collapse>

            <TouchableOpacity onPress={() => setShowDeactivateAlert(true)}>
              <CollapseHeaderInner
                title={i18n.t("deactivate")}
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
          ) : null}
        </ContainerFluid>

        <SessionExpireAlert
          showAlert={sessionAlert}
          onConfirmPressed={onConfirm}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;