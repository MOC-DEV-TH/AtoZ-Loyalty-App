import { SafeAreaView } from "react-native-safe-area-context";
import { AspectRatio, Image, Text } from "native-base";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { translate } from "react-native-translate";
import Colors from "../../../constants/Colors";
import Button from "../../../components/Button";

export default GetStartScreen = (props) => {
  const getStart = () => {
    props.navigation.navigate("AccountDashboard");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          resizeMode="cover"
          source={require("../../../assets/logo.png")}
          style={{
            width: "60%",
            height: undefined,
            aspectRatio: 512 / 212,
          }}
          alt="logo"
        ></Image>
        {/* <Button
          padding={3}
          mt={40}
          bg={Colors.yellow}
          _text={{ color: "primary", fontWeight: "bold", fontFamily:translate("nativebaseFont"), fontSize:"lg" }}
          onPress={() => getStart()}
        >
          {translate("getstart")}
        </Button> */}
        <Button bg={Colors.yellow} justifyContent={"center"} role="button" color="primary" onPress={() => getStart()} mt={40}>Get Started</Button>
      </View>
    </SafeAreaView>
  );
};

GetStartScreen.navigationOptions = (props) => {
  return {
    headerShown: false,
  };
};
