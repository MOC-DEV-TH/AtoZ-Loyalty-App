import { SafeAreaView } from "react-native-safe-area-context";
import { AspectRatio, Image, Button } from "native-base";
import { View, Text, TouchableOpacity } from "react-native";
import ContainerFluid from "../../../components/ContainerFluid";

export default OutletLocationsScreen = (props) => {
  return (
    <SafeAreaView>
      <ContainerFluid>
        <Text>Hello World</Text>
      </ContainerFluid>
    </SafeAreaView>
  );
};

OutletLocationsScreen.navigationOptions = (props) => {
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