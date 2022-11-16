import { useDispatch } from "react-redux";
import { translate } from "react-native-translate";
import { Heading, View, Box, HStack, Link, VStack, Stack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, Image,ActivityIndicator } from "react-native";
import { FontAwesome,FontAwesome5 } from "@expo/vector-icons";
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
import { storeData } from "../../../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import DeactivateAccountAlert from "../../../components/DeactivateAccountAlert";
import * as myAccountActions from "../../../store/actions/myAccount";

export default SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  let [showAlert, setShowAlert] = useState(false);
  let [showDeactivateAlert, setShowDeactivateAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  function onPressConfirm() {
    setShowAlert(false);
    storeData(AsyncStorageKey.IS_LOGIN,"0")
    navigation.navigate("AccountDashboard");
  }

  function onPressCancel() {
    setShowAlert(false);
  }

  function onPressDeactivateCancel(){
   setShowDeactivateAlert(false)
  }

  const onPressDeactivateNow = async () =>{
    setShowDeactivateAlert(false);
    setShowLoading(true);
    await dispatch(myAccountActions.deactivateAccount(navigation));
    setShowLoading(false);
  }
  
  return (
    <>
      {/* Logout box */}
      <AwesomeAlert
        show={showAlert}
        title={translate("surewanttologout")}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={translate("cancel")}
        confirmText={translate("yes")}
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
      <DeactivateAccountAlert
        showAlert={showDeactivateAlert}
        onConfirmPressed={onPressDeactivateNow}
        onCancelPressed={onPressDeactivateCancel}
      />

      <ContainerFluid standardTop={true}>
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
              {translate("myaccount")}
            </Button>
            <Button
              px={10}
              Icon={<Entypo name="location" size={24} color="white" />}
              bg="primary"
              color="white"
              onPress={()=>navigation.navigate("OutLetLocation")}
            >
              {translate("outletlocation")}
            </Button>
            <Button
              px={10}
              Icon={<FontAwesome name="language" size={24} color="white" />}
              bg="primary"
              color="white"
              onPress = {()=>navigation.navigate("Language")}
            >
              {translate("language")}
            </Button>
            <Button
              px={10}
              Icon={<FontAwesome5 name="user-minus" size={24} color="white" />}
              bg="primary"
              color="white"
              onPress = {()=>setShowDeactivateAlert(true)}
            >
              {translate("deactivate")}
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
              {translate("logout")}
            </Button>
          </VStack>
        </ContainerFluid>
        {showLoading ? <View style={styles.loading}><ActivityIndicator size={"large"} color={Colors.primary}/></View>  : undefined}
      </ContainerFluid>
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
        <TouchableOpacity onPress={()=>{props.navigation.navigate('Home', { screen: 'DashboardNavigator' })}}>
          <Image
            style={styles.headerIcon}
            source={require("../../../assets/logo.png")}
          />
        </TouchableOpacity>
      </View>
    ),
  };
};