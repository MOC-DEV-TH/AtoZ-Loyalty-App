import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AspectRatio, Image, Button } from "native-base";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import { color } from "react-native-reanimated";

export default AccountDashboardScreen = (props) => {
  const onLoginPress = () => {
    props.navigation.navigate("SignIn");
  };

  const onRegisterPress = () => {
    props.navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="stretch"
        source={require("../../../assets/top_image.png")}
        style={{
          width: "100%",
          alignSelf: "center",
          height: undefined,
          aspectRatio: 512 / 212,
          position: "absolute",
          top: 0,
        }}
      ></Image>

      <View>
      <Text style={{color:Colors.primary,alignSelf:"center"}}>Already have an account?</Text>
        <Button
        mt={2}
          width="250"
          backgroundColor={Colors.primary}
          _text={{ color: "white" }}
          onPress={() => onLoginPress()}
          fontWeight="bold"
        >
          Login
        </Button>
      </View>

      <View style={{margin:30}}>
        <Text style={{color:Colors.primary}}>
          OR
        </Text>
      </View>

      <View>
      <Text style={{color:Colors.primary,alignSelf:"center"}}>Create New Account</Text>
        <Button
         mt={2}
          width="250"
          backgroundColor={Colors.primary}
          _text={{ color: "white" }}
          onPress={() => onRegisterPress()}
          fontWeight="bold"
        >
          Register Now
        </Button>
      </View>
    </View>
  );
};

AccountDashboardScreen.navigationOptions = (props) => {
  return {
    headerShown: false,
  };
};
