import { Heading, View, Box, Text } from "native-base"
import { SafeAreaView } from "react-native-safe-area-context";
import ContainerFluid from "../../../components/ContainerFluid";
import EntryBaner from "../../../components/EntryBaner";
import i18n from "../../../I18n/i18n";
import { StyleSheet, TouchableOpacity,Image } from "react-native";
import { setLocalization,translate } from 'react-native-translate';
import Colors from "../../../constants/Colors";

const OverlapContentBox = (props) => {
    return (
        <>
            <Box bg={"white"} roundedTopLeft="3xl" roundedTopRight="3xl" py="30" style={{flex: 1}} marginTop={-30}>
                <ContainerFluid>
                   {props.children}
                </ContainerFluid>
            </Box>
        </>
    )
}

const Para = (props) => {
    return (
        <Text mb={3}>
            {props.children}
        </Text>
    );
}

export default AboutScreen = (props) => {
    return (
        <View style={{flex: 1}}>
            <EntryBanner
            title = {translate("aboutcompany")}
            ></EntryBanner>
            <OverlapContentBox>
                <Para>Royal A to Z Co., Ltd provides a one stop solution for Home Decoration, Electronic appliances, construction, renovation and home improvement. A to Z is a place where you can have comprehensive range of construction materials and home decoration materials</Para>
                <Para>Royal A to Z Holdings Co., Ltd mission is to become a market leader of Home Solution and Living Standard in Myanmar. It is a place fill range of goods, standardized both from domestic manufactures and imported from abroad, and most importantly, there is also a collection of products that are sufficient to meet the needs of customers who come to seek our services.</Para>
            </OverlapContentBox>
        </View>
    )
}



AboutScreen.navigationOptions = (props) => {
    return {
      headerTitle: "",
      headerTintColor: "black",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: Colors.primary,
      },
  
      headerLeft: () => (
        <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
          <Text style={{marginLeft:20,color:Colors.white}}>{translate("backtohome")}</Text>
        </TouchableOpacity>
      ),
    };
  };