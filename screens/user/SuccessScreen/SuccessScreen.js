import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Keyboard,
    SafeAreaView,
    TouchableOpacity
  } from "react-native";
  import React, { useEffect, useRef,useCallback } from "react";
  import Img from "../../../components/Img";
  import Colors from "../../../constants/Colors";
  import styles from "./styles";

  
  export default SuccessScreen = (navData) => {

    const login = () => {
        navData.navigation.replace("SignIn")
    }
    
    return (
      <View style={styles.container} onPress={Keyboard.dismiss}>
        <View style={{ position: "absolute", top: 80 }}>
          <Img
            source={require("../../../assets/atoz_blue.png")}
            width={150}
            intWidth={512}
            intHeight={212}
            mx={"auto"}
          ></Img>
        </View>
        <Img
            source={require("../../../assets/mark_icon.png")}
            width={150}
            intWidth={512}
            intHeight={212}
            mx={"auto"}
          ></Img>
        <Text style={{ color: Colors.primary,fontSize:22,fontWeight:"bold",marginTop:15}}>
        Welcome
        </Text>
        <Text
          style={{
            color: Colors.primary,
            fontWeight: "normal",
            textAlign: "center",
            margin: 6,
            lineHeight:25
          }}
        >
          Your Loyalty account is{"\n"}created successfully Your{"\n"}account ID will be notify shorty...
        </Text>

        <TouchableOpacity
            style={styles.button}
            onPress={() => login()}
          >
            <Text style={styles.buttonTitle}>Login Now</Text>
          </TouchableOpacity>

      </View>
    );
  };
  SuccessScreen.navigationOptions = (props) => {
    return {
      headerTitle: "",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "white",
        height: 0,
      },
    };
  };
  
  