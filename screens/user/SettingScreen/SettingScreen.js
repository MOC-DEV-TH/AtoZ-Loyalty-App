import { translate } from "react-native-translate";
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
