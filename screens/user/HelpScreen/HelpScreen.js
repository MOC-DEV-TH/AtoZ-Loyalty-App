import { Icon, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import ContainerFluid from "../../../components/ContainerFluid";
import Img from "../../../components/Img";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../../components/Button";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableHighlight,View } from "react-native";
import { Linking } from "react-native";
import styles from "./styles";
import { translate } from "react-native-translate";

export default HelpScreen = ({navigation}) => {
  return (
    <ContainerFluid pt={30}>
      <VStack space={4}>
        <Button
          px={10}
          Icon={
            <MaterialCommunityIcons
              name="file-document"
              size={24}
              color="white"
            />
          }
          bg="primary"
          color="white"
          onPress={()=>{navigation.navigate("Faq")}}
        >
          {translate("faq")}
        </Button>
        <Button
          px={10}
          Icon={
            <MaterialCommunityIcons name="phone-dial" size={24} color="white" />
          }
          onPress={()=>{Linking.openURL("tel:09123456789")}}
          bg="primary"
          color="white"
        >
          {translate("hotline")}
        </Button>
        <Button
          onPress={()=>{Linking.openURL("viber://contact?number=09123456789")}}
          px={10}
          Icon={<FontAwesome5 name="viber" size={24} color="white" />}
          bg="primary"
          color="white"
        >
          {translate("vibermsg")}
        </Button>
      </VStack>
    </ContainerFluid>
  );
};

HelpScreen.navigationOptions = (props) => {
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