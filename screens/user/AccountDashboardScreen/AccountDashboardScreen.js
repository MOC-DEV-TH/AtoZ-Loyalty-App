import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  Box,
  Text,
  HStack,
  VStack,
  Input,
  Stack,
  FormControl,
  Pressable,
  Heading,
  Image,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  Button,
} from "native-base";

export default AccountDashboardScreen = (props) => {
  const onLoginPress = () => {
    props.navigation.navigate("SignIn");
  };

  const onRegisterPress = () => {
    props.navigation.navigate("SignUp");
  };

  const onHelpPress = () => {
    props.navigation.navigate("Help");
  }

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
        <Text style={{ color: Colors.primary, alignSelf: "center" }}>
          Already have an account?
        </Text>
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

      <View style={{ margin: 30 }}>
        <Text style={{ color: Colors.primary }}>OR</Text>
      </View>

      <View>
        <Text style={{ color: Colors.primary, alignSelf: "center" }}>
          Create New Account
        </Text>
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

      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={()=>onHelpPress()}>
          <HStack>
            <AntDesign name="questioncircle" size={24} color={Colors.primary} />

            <Text style={{ marginLeft: 5, color: Colors.primary }}>Help</Text>
          </HStack>
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <Text color={Colors.primary}>မြန်မာ / Eng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

AccountDashboardScreen.navigationOptions = (props) => {
  return {
    headerShown: false,
  };
};
