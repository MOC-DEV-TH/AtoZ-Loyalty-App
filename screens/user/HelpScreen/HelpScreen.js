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
import { TouchableHighlight } from "react-native";
import { Linking } from "react-native";

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
          FAQs
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
          Hotline
        </Button>
        <Button
          onPress={()=>{Linking.openURL("viber://contact?number=09123456789")}}
          px={10}
          Icon={<FontAwesome5 name="viber" size={24} color="white" />}
          bg="primary"
          color="white"
        >
          Viber Message
        </Button>
      </VStack>
    </ContainerFluid>
  );
};

HelpScreen.navigationOptions = (props) => {
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
