import { Icon, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import ContainerFluid from "../../../components/ContainerFluid";
import Img from "../../../components/Img";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { TouchableOpacity, Image,Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../../components/Button";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableHighlight,View } from "react-native";
import { Linking } from "react-native";
import styles from "./styles";
import { translate } from "react-native-translate";

export default HelpScreen = ({navigation}) => {
  return (
    <ContainerFluid standardTop={true}>
      <VStack space={4}>
        {/* <Button
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
        </Button> */}
        <Button
          px={10}
          Icon={
            <MaterialCommunityIcons name="phone-dial" size={24} color="white" />
          }
          onPress={()=>{Linking.openURL("tel:017640371")}}
          bg="primary"
          color="white"
        >
          Hotline 1
        </Button>
        <Button
          px={10}
          Icon={
            <MaterialCommunityIcons name="phone-dial" size={24} color="white" />
          }
          onPress={()=>{Linking.openURL("tel:09448999995")}}
          bg="primary"
          color="white"
        >
          Hotline 2
        </Button>
        <Button
          onPress={()=>{
            Platform.OS=="android" ? Linking.openURL("viber://contact?number=959448999995") :
            Linking.openURL("viber://contact?number=+959448999995")
            }}
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
        <TouchableOpacity onPress={()=>{props.navigation.navigate('Home', { screen: 'DashboardNavigator' })}}>
          <Image
            style={styles.headerIcon}
            source={require("../../../assets/logo.png")}
          />
        </TouchableOpacity>
      </View>
    ),

    // headerRight: () => (
    //   <TouchableOpacity onPress={()=>props.navigation.navigate("Notification")}>
    //       <Image
    //         style={{height:20,width:20,marginRight:18}}
    //         source={require("../../../assets/notification_icon.png")}
    //       />
    //     </TouchableOpacity>
    // ),
  };
};