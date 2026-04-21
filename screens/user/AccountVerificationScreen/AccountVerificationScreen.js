import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import React from "react";
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
import { Box } from "native-base";
import i18n from "../../../I18n/i18n";

const RESEND_OTP_TIME_LIMIT = 60;
let resendOtpTimerInterval;

const AccountVerificationScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const userObj = route?.params?.userObj;

  const [otpCode, setOTPCode] = useState("");
  const [otpFailStatus, setOtpFailStatus] = useState(false);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT
  );

  const CELL_COUNT = 6;

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const response_status = useSelector(
    (state) => state.user.status,
    shallowEqual
  );

  useEffect(() => {
    if (response_status === "Success") {
      navigation.replace("Success");
    }
  }, [response_status]);

  useEffect(() => {
    dispatch(userActions.setEmptyStatus());
  }, [dispatch]);

  const sendOTP = useCallback(async () => {
    let formData = new FormData();
    let base64 = require("base-64");

    formData.append("senderid", "AtoZ");
    formData.append("number", parseInt(userObj.phone));
    formData.append(
      "message",
      "Your OTP is {otp}. Valid for 1 minute"
    );
    formData.append("expiry", 1);

    const response = await fetch("https://api.smsbrix.com/v1/otp/send", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          base64.encode("API_KEY:API_SECRET"),
      },
      body: formData,
    });

    const respData = await response.json();
    if (respData.status === "success") {
      setOTPCode(respData.otpId);
    }
  }, [userObj]);

  useEffect(() => {
    sendOTP();
  }, [sendOTP]);

  const OTPVerification = async () => {
    setIsLoading(true);

    let formData = new FormData();
    let base64 = require("base-64");

    formData.append("otp", value);
    formData.append("otpId", otpCode);

    const response = await fetch("https://api.smsbrix.com/v1/otp/verify", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          base64.encode("API_KEY:API_SECRET"),
      },
      body: formData,
    });

    const respData = await response.json();

    if (respData.status === "Success") {
      await dispatch(userActions.registerUser(userObj));
    } else {
      setOtpFailStatus(true);
    }

    setIsLoading(false);
  };

  // timer
  useEffect(() => {
    resendOtpTimerInterval = setInterval(() => {
      setResendButtonDisabledTime((prev) => {
        if (prev <= 1) {
          clearInterval(resendOtpTimerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(resendOtpTimerInterval);
  }, []);

  const onResendOtpButtonPress = () => {
    sendOTP();
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
  };

  const isSubmitEnabled = value.length === 6;

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={{ alignSelf: "center" }} onTouchStart={Keyboard.dismiss}>
        <Box justifyContent="center" alignItems="center" height={250} mb={55}>
          <Img
            source={require("../../../assets/atoz_blue.png")}
            width={150}
            intWidth={512}
            intHeight={212}
          />
        </Box>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>
            {otpFailStatus
              ? i18n.t("verification_fail")
              : i18n.t("almost_done")}
          </Text>

          <Text style={styles.subTitle}>
            {otpFailStatus
              ? i18n.t("invalid_otp")
              : i18n.t("verify_by_phone_number")}
          </Text>

          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[
                  otpFailStatus ? styles.cellFailState : styles.cell,
                  isFocused && styles.focusCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />

          {isLoading ? (
            <ActivityIndicator style={{ marginTop: 22 }} />
          ) : (
            <TouchableOpacity
              onPress={OTPVerification}
              disabled={!isSubmitEnabled}
              style={[
                styles.button,
                {
                  backgroundColor: isSubmitEnabled
                    ? Colors.yellow
                    : Colors.dimGray,
                },
              ]}
            >
              <Text style={styles.buttonText}>{i18n.t("submit")}</Text>
            </TouchableOpacity>
          )}

          <View style={{ marginTop: 30 }} />

          {resendButtonDisabledTime > 0 ? (
            <Text>
              {i18n.t("resend_otp_in")}{" "}
              <Text style={{ fontWeight: "bold" }}>
                {resendButtonDisabledTime}s
              </Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={onResendOtpButtonPress}>
              <Text style={styles.otpResendButtonText}>
                {i18n.t("resend_otp")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AccountVerificationScreen;