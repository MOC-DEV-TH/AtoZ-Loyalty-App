import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import OTPInput from "../../../components/OTPInput";
import { ButtonContainer, ButtonText } from "./styles";
import React, { useEffect, useRef,useCallback } from "react";
import * as userActions from "../../../store/actions/users";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Img from "../../../components/Img";
import Colors from "../../../constants/Colors";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Box, Center } from "native-base";

export default AccountVerificationScreen = (navData) => {
  const dispatch = useDispatch();
  const [otpCode, setOTPCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(()=>{
    dispatch(userActions.setEmptyStatus())
  })

  var submitButtonState = "false";
  const CELL_COUNT = 4;

  if(value.length==4){
    submitButtonState = "true"
  }
  
  return (
    <KeyboardAwareScrollView
    style={{flex:1}}
    >
    <View style={{alignSelf:"center"}} onPress={Keyboard.dismiss}>
      <Box  justifyContent={"center"} alignItems="center" height={250} mb={55}>
        <Img
            source={require("../../../assets/atoz_blue.png")}
            width={150}
            intWidth={512}
            intHeight={212}
            mx={"auto"}
            mb={35}
            alignSelf="center"
          ></Img>
      </Box>
      <View style={{alignItems:"center"}}>
      <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: "bold" }}>
        Yo're almost done!
      </Text>
      <Text
        style={{
          color: Colors.primary,
          fontWeight: "bold",
          textAlign: "center",
          margin: 25,
        }}
      >
        Please verify your phone number{"\n"}by typing 4 digits via SMS.
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      
      <ButtonContainer
        onPress={()=>navData.navigation.replace("Success")}
        disabled={submitButtonState=="false" ? true : false}
        style={{
          backgroundColor: submitButtonState=="false" ? Colors.dimGray :  Colors.yellow,
        }}
      >
        <ButtonText
          style={{
            color: submitButtonState=="false" ? Colors.white : Colors.primary,fontWeight:"bold"
          }}
        >
          Submit
        </ButtonText>
      </ButtonContainer>
      </View>
    </View>
    </KeyboardAwareScrollView>
  
  );
};
AccountVerificationScreen.navigationOptions = (props) => {
  return {
    headerTitle: "",
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "white",
      height: 0,
    },
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex:1,
  },
  title: { textAlign: "center", fontSize: 20 },
  codeFieldRoot: { marginTop: 0 },
  cell: {
    width: 50,
    height: 50,
    paddingVertical: 5,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.primary,
    textAlign: "center",
    alignItems: "center",
    margin: 10,
    fontSize: 16
  },
  focusCell: {
    borderColor: Colors.yellow,
  },
  
});
