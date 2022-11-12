import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useState } from "react";
import { useDispatch,useSelector,shallowEqual } from "react-redux";
import OTPInput from "../../../components/OTPInput";
import { ButtonContainer, ButtonText } from "./styles";
import React, { useEffect, useRef, useCallback } from "react";
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
import { translate } from "react-native-translate";


const RESEND_OTP_TIME_LIMIT = 60;
let resendOtpTimerInterval;

export default AccountVerificationScreen = (navData) => {
  const dispatch = useDispatch();
  const [otpCode, setOTPCode] = useState("");
  const [otpFailStatus, setOtpFailStatus] = useState(false);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT
    );

    const response_status = useSelector(
      (state) => state.user.status,
      shallowEqual
    );
    useEffect(() => {
      if (response_status == "Success") {
        navData.navigation.replace("Success");
      }
    });

  useEffect(() => {
    dispatch(userActions.setEmptyStatus());
  });

  useEffect(() => {
     sendOTP();
    console.log("User Phone",parseInt(navData.navigation.getParam("userObj").phone))
  }, [sendOTP]);

  //resend otp timer
  useEffect(() => {
    startResendOtpTimer();
    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  var submitButtonState = "false";
  const CELL_COUNT = 6;

  if (value.length == 6) {
    submitButtonState = "true";
  }

  const OTPVerification = async () => {
    setIsLoading(true)
    let formData = new FormData();
    let base64 = require("base-64");

    formData.append("otp", value);
    formData.append("otpId", otpCode);
    
    const response = await fetch("https://api.smsbrix.com/v1/otp/verify", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          base64.encode(
            "SB12510518965458117423836966132112" +
              ":" +
              "v2m3gSCHsSq27IGiw6IZ7LzpDyKEa9B!#OiUgPHbK7vm"
          ),
      },
      body: formData,
    });
    const respData = await response.json();
    console.log("OTP Verification" + respData.status);
    if (respData.status == "Success") {
     await dispatch(userActions.registerUser(navData.navigation.getParam("userObj")));
      setIsLoading(false)
    } else {
      setOtpFailStatus(true)
      setIsLoading(false)
    }
  };

  const sendOTP = async () => {
    let formData = new FormData();
    let base64 = require("base-64");

    formData.append("senderid", "AtoZ");
    formData.append("number", parseInt(navData.navigation.getParam("userObj").phone));
    formData.append(
      "message",
      "You had successfully register in our system your otp is {otp}.This OTP is valid only for 1min"
    );
    formData.append("expiry", 1);

    const response = await fetch("https://api.smsbrix.com/v1/otp/send", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          base64.encode(
            "SB12510518965458117423836966132112" +
              ":" +
              "v2m3gSCHsSq27IGiw6IZ7LzpDyKEa9B!#OiUgPHbK7vm"
          ),
      },
      body: formData,
    });
    const respData = await response.json();
    if (respData.status == "success") {
      console.log("OTP Response:::" + respData.otpId);
      setOTPCode(respData.otpId);
    }
  };

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };
  const onResendOtpButtonPress = () => {
    sendOTP();
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={{ alignSelf: "center" }} onPress={Keyboard.dismiss}>
        <Box justifyContent={"center"} alignItems="center" height={250} mb={55}>
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
        <View style={{ alignItems: "center" }}>
          <Text
            style={{ color: Colors.primary, fontSize: 18, fontWeight: "bold",padding:5 }}
          >
            {otpFailStatus ? translate("verification_fail") :translate("almost_done")}
          </Text>
          <Text
            style={{
              color: Colors.primary,
              fontWeight: "bold",
              textAlign: "center",
              margin: 25,
              padding:5
            }}
          >
            {otpFailStatus ? translate("invalid_otp") : translate("verify_by_phone_number")}
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
                style={otpFailStatus? [styles.cellFailState, isFocused && styles.focusCell] : [styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />

        {isLoading ? <ActivityIndicator style={{marginTop:22}}/> :<ButtonContainer
            onPress={() => OTPVerification()}
            disabled={submitButtonState == "false" ? true : false}
            style={{
              backgroundColor:
                submitButtonState == "false" ? Colors.dimGray : Colors.yellow,
            }}
          >
            <ButtonText
              style={{
                color:
                  submitButtonState == "false" ? Colors.white : Colors.primary,
                fontWeight: "bold",padding:5
              }}
            >
              {translate("submit")}
            </ButtonText>
          </ButtonContainer> }  
          <View style={{ marginTop: 30 }} />
          {resendButtonDisabledTime > 0 ? (
            <Text style={{marginRight:5,padding:5}}>
              {translate("resend_otp_in")}
              <Text style={{ fontWeight:"bold" ,paddingLeft:5, color:"black" }}>{resendButtonDisabledTime}s</Text>
              
            </Text>
          ) : (
            <TouchableOpacity onPress={()=>onResendOtpButtonPress()}>
              <Text style={styles.otpResendButtonText}>{translate("resend_otp")}</Text>
            </TouchableOpacity>
          )}
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
    flex: 1,
  },
  otpResendButton: {
    alignItems: "center",
    width: "100%",
    marginTop: 16,
  },
  otpResendButtonText: {
    color: Colors.primary,
    textTransform: "none",
    textDecorationLine: "underline",
    fontWeight:"bold",
    padding:5
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
    margin: 2.5,
    fontSize: 16,
  },
  cellFailState: {
    width: 50,
    height: 50,
    paddingVertical: 5,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'red',
    textAlign: "center",
    alignItems: "center",
    margin: 2.5,
    fontSize: 16,
  },
  focusCell: {
    borderColor: Colors.yellow,
  },
});
