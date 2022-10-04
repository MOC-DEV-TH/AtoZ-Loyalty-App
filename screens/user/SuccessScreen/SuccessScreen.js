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
        THANK YOU
        </Text>
        <Text
          style={{
            color: Colors.primary,
            fontWeight: "normal",
            textAlign: "center",
            margin: 6,
            lineHeight:25,
            marginTop:40
          }}
        >
          Your Loyalty Program Membership{"\n"}Account Creation has been{"\n"}submitted successfully.
        </Text>

        <Text
          style={{
            color: Colors.primary,
            fontWeight: "normal",
            textAlign: "center",
            margin: 6,
            lineHeight:25,
            marginTop:25
          }}
        >
          Account verification process is{"\n"}already underway.
        </Text>

        <Text
          style={{
            color: Colors.primary,
            fontWeight: "normal",
            textAlign: "center",
            margin: 6,
            lineHeight:25,
            marginTop:25
          }}
        >
          Your Login credentials will be{"\n"}notified via SMS after verification.
        </Text>

        <TouchableOpacity
            style={styles.button}
            onPress={() => login()}
          >
            <Text style={styles.buttonTitle}>Login</Text>
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
  
  