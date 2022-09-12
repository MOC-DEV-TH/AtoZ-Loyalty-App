import { SafeAreaView } from "react-native-safe-area-context";
import { AspectRatio, Image, Button } from "native-base";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default GetStartScreen = (props) => {

  const getStart = () => {
    props.navigation.navigate("SignIn");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image resizeMode="cover" source={require("../../../assets/logo.png")} style={{
          width: '60%',
          height: undefined,
          aspectRatio: 512 / 212,
        }}></Image>
        <Button mt={40} colorScheme="dark" _text={{color:"primary"}} onPress={()=>getStart()} fontWeight="bold">Get Start</Button>
      </View>
    </SafeAreaView>
  );
};

GetStartScreen.navigationOptions = (props) => {
  return {
    headerShown: false,
  };
};

