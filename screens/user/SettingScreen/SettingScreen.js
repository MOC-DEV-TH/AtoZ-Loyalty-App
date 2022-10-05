import { useDispatch } from "react-redux";
import { translate } from "react-native-translate";
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
import styles from "./styles";

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
              onPress={()=>navigation.navigate("OutLetLocation")}
            >
              Outlet Locations
            </Button>
            <Button
              px={10}
              Icon={<FontAwesome name="language" size={24} color="white" />}
              bg="primary"
              color="white"
              onPress = {()=>navigation.navigate("Language")}
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
  );
};

SettingScreen.navigationOptions = (props) => {
  return {
    headerTitle: "",
    headerLeft: () => (
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
