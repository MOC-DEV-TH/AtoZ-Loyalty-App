import { useDispatch } from "react-redux";
import { translate } from "react-native-translate";
<<<<<<< HEAD
import {
  Heading,
  View,
  Box,
  Text,
  HStack,
  Link,
  VStack,
  Button,
  Icon
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import Colors from "../../../constants/Colors";

export default SettingScreen = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
      onPress={()=>props.navigation.navigate("MyAccount")}
        bg={"primary"}
        leftIcon={
          <Icon
            as={
              <FontAwesome
                name="user-circle-o"
                size={45}
                color={Colors.primary}
              />
            }
            name="cloud-upload-outline"
            size="md"
            fontFamily={translate("nativebaseFont")}
          />
        }
      >
        My Account
      </Button>
    </SafeAreaView>
=======
import { Heading, View, Box, HStack, Link, VStack, Stack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import Text from "../../../components/Typography";
import Button from "../../../components/Button";
import ContainerFluid from "../../../components/ContainerFluid";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import { useState } from "react";

export default SettingScreen = ({ navigation }) => {
  let [showAlert, setShowAlert] = useState(false);

  function onPressConfirm() {
    setShowAlert(false);
    navigation.navigate("AccountDashboard");
  }

  function onPressCancel() {
    setShowAlert(false);
  }

  return (
    <>
      {/* Logout box */}
      <AwesomeAlert
        show={showAlert}
        title="Are you sure you to logout!"
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Yes"
        confirmButtonColor={Colors.yellow}
        confirmButtonStyle={styles.alertButton}
        confirmButtonTextStyle={styles.alertButtonText}
        cancelButtonColor={Colors.yellow}
        cancelButtonStyle={styles.alertButton}
        cancelButtonTextStyle={styles.alertButtonText}
        titleStyle={styles.alertTitle}
        contentContainerStyle={styles.alertContentContainer}
        onCancelPressed={onPressCancel}
        onConfirmPressed={onPressConfirm}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.button}>
          <Text
            style={styles.text}
            fontWeight="bold"
            color="primary"
            fontSize="xl"
          >
            {translate("setting")}
          </Text>
        </View>

        <ContainerFluid mt={8}>
          <VStack space={4}>
            <Button
              px={10}
              Icon={
                <FontAwesome name="user-circle-o" size={24} color={"white"} />
              }
              bg="primary"
              color="white"
              onPress={() => navigation.navigate("MyAccount")}
            >
              My Account
            </Button>
            <Button
              px={10}
              Icon={<Entypo name="location" size={24} color="white" />}
              bg="primary"
              color="white"
            >
              Outlet Locations
            </Button>
            <Button
              px={10}
              Icon={<FontAwesome name="language" size={24} color="white" />}
              bg="primary"
              color="white"
            >
              Language
            </Button>
            <Button
              px={10}
              Icon={
                <MaterialCommunityIcons name="logout" size={24} color="white" />
              }
              bg="primary"
              color="white"
              onPress={() => setShowAlert(true)}
            >
              Logout
            </Button>
          </VStack>
        </ContainerFluid>
      </SafeAreaView>
    </>
>>>>>>> 6e6c9fbb37a498d716a7836fecee7b8ad611f2fb
  );
};

SettingScreen.navigationOptions = (props) => {
  return {
    headerTitle: "",
    headerLeft: () => (
<<<<<<< HEAD
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <Image
            style={styles.headerIcon}
            source={require("../../../assets/app_logo_blue.png")}
          />
        </TouchableOpacity>
      </View>
    ),

    headerRight: () => (
      <TouchableOpacity onPress={()=>props.navigation.navigate("Notification")}>
          <Image
            style={{height:20,width:20,marginRight:15}}
            source={require("../../../assets/notification_icon.png")}
          />
        </TouchableOpacity>
    ),
  };
};
=======
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Image
          style={{ height: 15, width: 20, marginLeft: 10 }}
          source={require("../../../assets/back_arrow.png")}
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.yellow,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  alertButton: {
    width: 100,
    textAlign: "center",
    justifyContent: "center",
  },
  alertButtonText: {
    textAlign: "center",
    color: Colors.primary,
  },
  alertTitle: {
    color: Colors.white,
    fontSize: 16,
  },
  alertContentContainer: {
    backgroundColor: Colors.primary,
    padding: 25,
  },
});
>>>>>>> 6e6c9fbb37a498d716a7836fecee7b8ad611f2fb
