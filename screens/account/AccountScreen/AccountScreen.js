import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  Text,
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
  Button,
} from "native-base";
import Img from "../../../components/Img";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ContainerFluid from "../../../components/ContainerFluid";
import { useState, useEffect, useCallback } from "react";
import Colors from "../../../constants/Colors";
import i18n from "../../../I18n/i18n";
import * as Localization from "expo-localization";
import { storeData,getStoreData } from "../../../AsyncStorage/AsyncStorage";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as myAccountActions from "../../../store/actions/myAccount";
import { setLocalization,translate } from 'react-native-translate';
import my from "../../../locales/my";
import en from "../../../locales/en";

export default AccountScreen = (props) => {
  const [currentPwshow, setcurrentPwShow] = useState(false);
  const [confirmPwshow, setconfirmPwShow] = useState(false);
  const [newPwshow, setNewPwShow] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let [locale, setLocale] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getStoreData().then((value) => {
      setLocale(value)
    });
   
  }, []);

  const onPressChangeLanguage = () => {
    console.log("LanguageValue"+locale)
    if(locale=="en"){
      setLocalization(my)
      setLocale("my")
      storeData("my")
    }
    else if(locale=="my") {
      setLocalization(en)
      setLocale("en")
      storeData("en")
    }
    
};
 const setLocalValue = useCallback(()=>{i18n.locale = local})
  const loadMemberInfo = useCallback(async () => {
    try {
      await dispatch(myAccountActions.getMemberInfo());
    } catch (error) {
      setError(error.message);
    }
  });
  useEffect(() => {
    loadMemberInfo();
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
  const logoutAlert = () =>
    Alert.alert("Logout!", "Are you sure to logout!", [
      {
        text: translate("yes"),
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: translate("Cancel"),
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);

  return (
    <View>
      <ScrollView>
        <Box bg="primary" alignItems={"center"} pt={30} pb={45}>
          <FontAwesome name="user-circle-o" size={40} color="white" />
          <Box maxW="250" w="100%" mt={25}>
            <VStack space={2}>
              <HStack alignItems="center">
                <Text color="white" w={"50%"}>
                  {translate("userid")}
                </Text>
                <Text color="white" w={"50%"}>
                  {memberInfo.user_id}
                </Text>
              </HStack>
              <HStack alignItems="center">
                <Text color="white" w={"50%"}>
                  {translate("pointcollected")}
                </Text>
                <Text color="white" w={"50%"}>
                  {memberInfo.current_point}
                </Text>
              </HStack>
              <HStack alignItems="center">
                <Text color="white" w={"50%"}>
                  {translate("membertype")}
                </Text>
                <Text color="white" w={"50%"}>
                {memberInfo.member_level}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Box>

        <Img
          source={require("../../../assets/wave.png")}
          intWidth={1712}
          intHeight={237}
        ></Img>

        <ContainerFluid pt={5} pb={8}>
          <VStack space={2}>
            <HStack alignItems={"center"}>
              <Text w={"40%"} color="primary">
                {translate("name")}
              </Text>
              <Text w={"60%"} color="primary" pl={5}>
                {memberInfo.name}
              </Text>
            </HStack>


            <HStack alignItems={"center"}>
              <Text w={"40%"} color="primary">
                {translate("dob")}
              </Text>
              <Text w={"60%"} color="primary" pl={5}>
                {memberInfo.dob}
              </Text>
            </HStack>

            <HStack alignItems={"center"}>
              <Text w={"40%"} color="primary">
                {translate("nrc")}
              </Text>
              <Text w={"60%"} color="primary" pl={5}>
                {memberInfo.nrc}
              </Text>
            </HStack>

            <HStack alignItems={"center"}>
              <Text w={"40%"} color="primary">
                {translate("address")}
              </Text>
              <Text w={"60%"} color="primary" pl={5}>
                {memberInfo.address}
              </Text>
            </HStack>

            <HStack alignItems={"center"}>
              <Text w={"40%"} color="primary">
                {translate("city")}
              </Text>
              <Text w={"60%"} color="primary" pl={5}>
                {memberInfo.city}
              </Text>
            </HStack>

            <HStack alignItems={"center"}>
              <Text w={"40%"} color="primary">
                {translate("membersince")}
              </Text>
              <Text w={"60%"} color="primary" pl={5}>
                {memberInfo.created_date}
              </Text>
            </HStack>
          </VStack>

          <KeyboardAvoidingView>
            <Box mt={5}>
              <Heading size="sm" mb={3} color="primary">
                {translate("changepwd")}
              </Heading>

              <VStack space={4}>
                <HStack alignItems={"center"}>
                  <Text w={"40%"} color="primary" fontWeight={"bold"}>
                    {translate("currentpwd")}
                  </Text>
                  <Box w={"60%"} pl={5} color="primary">
                    <Input
                      size="md"
                      type={currentPwshow ? "text" : "password"}
                      onChangeText={(text) => setCurrentPassword(text)}
                      value={currentPassword}
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
                                size={24}
                                color="black"
                              />
                            }
                            mr={3}
                          ></Icon>
                        </Pressable>
                      }
                    />
                  </Box>
                </HStack>

                <HStack alignItems={"center"}>
                  <Text w={"40%"} color="primary" fontWeight={"bold"}>
                    {translate("newpwd")}
                  </Text>
                  <Box w={"60%"} pl={5} color="primary">
                    <Input
                      size="md"
                      type={newPwshow ? "text" : "password"}
                      onChangeText={(text) => setNewPassword(text)}
                      value={newPassword}
                      InputRightElement={
                        <Pressable onPress={() => setNewPwShow(!newPwshow)}>
                          <Icon
                            as={
                              <MaterialIcons
                                name={
                                  newPwshow ? "visibility" : "visibility-off"
                                }
                                size={24}
                                color="black"
                              />
                            }
                            mr={3}
                          ></Icon>
                        </Pressable>
                      }
                    />
                  </Box>
                </HStack>

                <HStack alignItems={"center"}>
                  <Text w={"40%"} color="primary" fontWeight={"bold"}>
                    {translate("confirmpwd")}
                  </Text>
                  <Box w={"60%"} pl={5} color="primary">
                    <Input
                      size="md"
                      type={confirmPwshow ? "text" : "password"}
                      onChangeText={(text) => setConfirmPassword(text)}
                      value={confirmPassword}
                      InputRightElement={
                        <Pressable
                          onPress={() => setconfirmPwShow(!confirmPwshow)}
                        >
                          <Icon
                            as={
                              <MaterialIcons
                                name={
                                  confirmPwshow
                                    ? "visibility"
                                    : "visibility-off"
                                }
                                size={24}
                                color="black"
                              />
                            }
                            mr={3}
                          ></Icon>
                        </Pressable>
                      }
                    />
                  </Box>
                </HStack>

                <HStack alignItems={"center"}>
                  <Text w={"40%"} color="primary" fontWeight={"bold"}>
                    {translate("changeLanguage")}                    
                  </Text>
                  <TouchableOpacity onPress={() => onPressChangeLanguage()}>
                    <Text style={{fontSize:11}} w={"100%"} pl={5} mt={3} color="primary">
                      မြန်မာ / Eng
                    </Text>
                  </TouchableOpacity>
                </HStack>
              </VStack>
            </Box>
          </KeyboardAvoidingView>

          <HStack justifyContent={"space-between"} mt={8}>
            <VStack>
              <TouchableOpacity onPress={() => logoutAlert()}>
                <Text>{translate("logout")}</Text>
              </TouchableOpacity>
            </VStack>
            <VStack>
              <Button
                bg={Colors.yellow}
                _text={{
                  color: Colors.primary,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
                px={10}
                fontWeight="bold"
                onPress={() => onPressSave()}
              >
                {translate("save")}
              </Button>
            </VStack>
          </HStack>
        </ContainerFluid>
      </ScrollView>
    </View>
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
        <Text style={{marginLeft:20,color:Colors.white}}>{translate("backtohome")}</Text>
      </TouchableOpacity>
    ),
  };
};
