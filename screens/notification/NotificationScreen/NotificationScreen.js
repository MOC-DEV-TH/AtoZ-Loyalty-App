import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import i18n from "../../../I18n/i18n";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import { Menu, Pressable, Box, Center } from "native-base";
import { translate } from "react-native-translate";

export default NotificationScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.text}>{translate("inbox")}</Text>
      </View>
    </SafeAreaView>
  );
};

NotificationScreen.navigationOptions = (props) => {
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
      <Box w="90%" alignItems="center">
        <Menu
          w="140"
          trigger={(triggerProps) => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <Ionicons
                  size={38}
                  style={{ color: Colors.white }}
                  name="menu"
                ></Ionicons>
              </Pressable>
            );
          }}
        >
          <Menu.Item
            onPress={() =>
              props.navigation.navigate("MyAccount")
            }
          >
            {translate("myaccount")}
          </Menu.Item>
          <Menu.Item onPress={() => props.navigation.navigate("AboutUs")}>
            {translate("aboutus")}
          </Menu.Item>
          <Menu.Item
            onPress={() => props.navigation.navigate("TermAndCondition")}
          >
            {translate("termandcondition")}
          </Menu.Item>
          <Menu.Item onPress={() => props.navigation.navigate("Faq")}>
            {translate("faq")}
          </Menu.Item>
        </Menu>
      </Box>
    ),
  };
};
