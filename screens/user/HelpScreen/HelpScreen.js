import { VStack } from "native-base";
import ContainerFluid from "../../../components/ContainerFluid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { TouchableOpacity, Image, Platform, View, Linking } from "react-native";
import Button from "../../../components/Button";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";
import i18n from "../../../I18n/i18n";

const HelpScreen = ({ navigation }) => {
  return (
    <ContainerFluid standardTop={true}>
      <VStack space={4}>
        {/* Hotline 1 */}
        <Button
          px={10}
          Icon={
            <MaterialCommunityIcons
              name="phone-dial"
              size={24}
              color="white"
            />
          }
          onPress={() => Linking.openURL("tel:017640371")}
          bg="primary"
          color="white"
        >
          Hotline 1
        </Button>

        {/* Hotline 2 */}
        <Button
          px={10}
          Icon={
            <MaterialCommunityIcons
              name="phone-dial"
              size={24}
              color="white"
            />
          }
          onPress={() => Linking.openURL("tel:09448999995")}
          bg="primary"
          color="white"
        >
          Hotline 2
        </Button>

        {/* Viber */}
        <Button
          onPress={() => {
            Platform.OS === "android"
              ? Linking.openURL("viber://contact?number=959448999995")
              : Linking.openURL("viber://contact?number=+959448999995");
          }}
          px={10}
          Icon={<FontAwesome5 name="viber" size={24} color="white" />}
          bg="primary"
          color="white"
        >
          {i18n.t("vibermsg")}
        </Button>
      </VStack>
    </ContainerFluid>
  );
};

export default HelpScreen;