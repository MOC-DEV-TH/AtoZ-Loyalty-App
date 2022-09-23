import { Heading, View, Box, Text, HStack, Link, VStack, } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import ContainerFluid from "../../../components/ContainerFluid";
import Img from "../../../components/Img";
import { Feather } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { TouchableOpacity,Image } from "react-native";

const OverlapContentBox = (props) => {
  return (
    <>
      <Box
        bg={"white"}
        roundedTopLeft="3xl"
        roundedTopRight="3xl"
        py="30"
        style={{ flex: 1 }}
        marginTop={-30}
      >
        <ContainerFluid>{props.children}</ContainerFluid>
      </Box>
    </>
  );
};

const Icon = (props) => {
  return (
    <Box
      bg={"primary"}
      width={39}
      height={39}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"full"}
    >
      {props.children}
    </Box>
  );
};

export default HelpScreen = (props) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box my={25}>
        <Img
          source={require("../../../assets/help.png")}
          width="80%"
          mx="auto"
        ></Img>
      </Box>
      <OverlapContentBox>
        <VStack space={4}>
          <Link href="tel:017640371" isExternal isUnderlined={false}  borderWidth={1} borderColor={"#f9f9f9"} borderRadius={6} p={3} style={{elevation: 6,
      shadowColor: Colors.primary}} bg={"white"}>
            <HStack alignItems={"center"} space={4}>
                <Icon><Feather name="phone" size={18} color="white" /></Icon>
                <Text fontWeight={"bold"} style={{fontSize:16}}>017640371</Text>
              </HStack>
          </Link>
          <Link href="tel:017640370" isExternal isUnderlined={false}  borderWidth={1} borderColor={"#f9f9f9"} borderRadius={6} p={3} style={{elevation: 6,
      shadowColor: Colors.primary}} bg={"white"}>
            <HStack alignItems={"center"} space={4}>
                <Icon><Feather name="phone" size={18} color="white" /></Icon>
                <Text fontWeight={"bold"} style={{fontSize:16}}>017640370</Text>
              </HStack>
          </Link>
          <Box bg={"white"} borderWidth={1} borderColor={"#f9f9f9"} p={8} borderRadius={6} style={{elevation: 6,
      shadowColor: Colors.primary}}>
              <Heading size={"md"} color={"primary"} mb={2}>Working Hour</Heading>
              <Text>Monday to Saturday</Text>
              <Text>Office Hour - 9:00 AM to 5:00 PM</Text>
          </Box>
        </VStack>
      </OverlapContentBox>
    </SafeAreaView>
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