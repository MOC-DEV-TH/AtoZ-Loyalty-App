import { translate } from "react-native-translate";
import { Heading, View, Box, Text, HStack, Link, VStack, Button} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity,Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";



export default SettingScreen = (props) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <Button bg={"primary"} leftIcon={<Icon as={<FontAwesome name="user-circle-o" size={45} color={Colors.primary} />} name="cloud-upload-outline" size="md" fontFamily={translate("nativebaseFont")} />}>My Account</Button>
    </SafeAreaView>
  );
};

SettingScreen.navigationOptions = (props) => {
  return {
    headerTitle: "",
    headerTintColor: "black",
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "white",
    },

    headerLeft: () => (
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Image
          style={{ height: 15, width: 20, marginLeft: 10 }}
          source={require("../../../assets/back_arrow.png")}
        />
      </TouchableOpacity>
    ),
  };
};