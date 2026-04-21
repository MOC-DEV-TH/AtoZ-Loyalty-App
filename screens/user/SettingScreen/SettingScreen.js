import { useDispatch } from "react-redux";
import { View, VStack, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import Button from "../../../components/Button";
import ContainerFluid from "../../../components/ContainerFluid";
import AwesomeAlert from "react-native-awesome-alerts";
import { useState } from "react";
import styles from "./styles";
import { storeData } from "../../../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import i18n from "../../../I18n/i18n";

const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const onPressConfirm = () => {
    setShowAlert(false);
    storeData(AsyncStorageKey.IS_LOGIN, "0");
    navigation.navigate("AccountDashboard");
  };

  const onPressCancel = () => {
    setShowAlert(false);
  };

  return (
    <>
      {/* Logout Alert */}
      <AwesomeAlert
        show={showAlert}
        title={i18n.t("surewanttologout")}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={i18n.t("cancel")}
        confirmText={i18n.t("yes")}
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

      <ContainerFluid standardTop={true}>
        {/* Title */}
        <View style={styles.button}>
          <Text
            style={styles.text}
            fontWeight="bold"
            color="primary"
            fontSize="xl"
          >
            {i18n.t("setting")}
          </Text>
        </View>

        {/* Menu */}
        <ContainerFluid mt={8}>
          <VStack space={4}>
            <Button
              px={10}
              Icon={
                <FontAwesome name="user-circle-o" size={24} color="white" />
              }
              bg="primary"
              color="white"
              onPress={() => navigation.navigate("MyAccount")}
            >
              {i18n.t("myaccount")}
            </Button>

            <Button
              px={10}
              Icon={<Entypo name="location" size={24} color="white" />}
              bg="primary"
              color="white"
              onPress={() => navigation.navigate("OutLetLocation")}
            >
              {i18n.t("outletlocation")}
            </Button>

            <Button
              px={10}
              Icon={<FontAwesome name="language" size={24} color="white" />}
              bg="primary"
              color="white"
              onPress={() => navigation.navigate("Language")}
            >
              {i18n.t("language")}
            </Button>

            <Button
              px={10}
              Icon={
                <MaterialCommunityIcons
                  name="logout"
                  size={24}
                  color="white"
                />
              }
              bg="primary"
              color="white"
              onPress={() => setShowAlert(true)}
            >
              {i18n.t("logout")}
            </Button>
          </VStack>
        </ContainerFluid>
      </ContainerFluid>
    </>
  );
};

export default SettingScreen;