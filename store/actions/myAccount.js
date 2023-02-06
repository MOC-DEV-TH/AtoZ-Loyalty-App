import AppVersion from "../../constants/AppVersion";
import Global from "../../constants/Global";
import MemberInfo from "../../model/memberInfo";
export const SET_MEMBER_INFO = "SET_MEMBER_INFO";
export const SET_RESPONSE_CODE = "SET_RESPONSE_CODE";
export const SET_EMPTY_RESPONSE_CODE = "SET_EMPTY_RESPONSE_CODE";
export const SET_OUTLET_LOCATIONS_INFO = "SET_OUTLET_LOCATIONS_INFO";
import { translate } from "react-native-translate";
import { Alert } from "react-native";

export const setEmptyResponseCode = () => {
  return (dispatch) => {
    dispatch({
      type: SET_EMPTY_RESPONSE_CODE,
    });
  };
};




export const getMemberInfo = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    console.log("token", token);
    const response = await fetch(
      Global.baseUrl + "/get_member_info?app_version=" + AppVersion.app_version,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization : token,
        },
      }
    );

    if (!response.ok) {
      const errorResData = await response.text();
      console.log(errorResData);
      let message = "Something went wrong!";
      throw new Error(message);
    }

    const respData = await response.json();
    if(respData.response_code=="005"){
      dispatch({
        type: SET_RESPONSE_CODE,
        response_code : respData.response_code
      })
    }
    const memberInfoObj = new MemberInfo(
      respData.details.name,
      respData.details.dob,
      respData.details.nrc,
      respData.details.address,
      respData.details.city,
      respData.details.township,
      respData.details.member_level,
      respData.details.current_point,
      respData.details.user_id,
      respData.details.created_date,
      respData.details.isVIP
    );
    console.log(memberInfoObj);
    dispatch({
      type: SET_MEMBER_INFO,
      member_info: memberInfoObj,
    });
  };
};

export const deactivateAccount = (props) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(Global.baseUrl + "/deactivate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=utf-8",
          Authorization: token,
        },
        body: JSON.stringify({
          app_version: AppVersion.app_version,
        }),
      });

      if (!response.ok) {
        let message = "Something went wrong!";
        console.log(response);
        throw new Error(message);
      }

      const respData = await response.json();
      console.log("Deactivate Account");
      console.log(respData);
      if(respData.status==="Success"){
        props.navigation.navigate("AccountDashboard")
      }
      else {
        alert(respData.description);
      }
    } catch (err) {
      throw err;
    }
  };
};

export const updateAccount = (oldPassword, newPassword,props) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(Global.baseUrl + "/change_password", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=utf-8",
          Authorization: token,
        },
        body: JSON.stringify({
          user_id: userId,
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });

      if (!response.ok) {
        let message = "Something went wrong!";
        console.log(response);
        throw new Error(message);
      }

      const respData = await response.json();
      console.log("register user response");
      console.log(respData);
      if(respData.status==="Success"){
        showAlert(respData.description,props)
      }
      else{
        alert(respData.description);
      }
      //alert(translate("changepwdmsg"));
    } catch (err) {
      throw err;
    }
  };
};

export function getOutletLocationsInfo(language){

  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      Global.baseUrl + "/get_outlet_locations?app_version=" + AppVersion.app_version,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      }
    );

    if(response.status !== 200){
      const errorResData = await response.text();
      console.log(errorResData);
      let message = "Something went wrong!";
      throw new Error(message);
    }

    const respData = await response.json();
    const respDataDetails = respData.details;
    const respDataByLang = respDataDetails.find((location) => location.type == language);
    const respDataByLangDetail = respDataByLang.detail;
    dispatch({
      type: SET_OUTLET_LOCATIONS_INFO,
      outlet_locations_info: respDataByLangDetail,
    });

  }
}

const showAlert = (desc,props) =>
  Alert.alert(
    "Alert",
    desc,
    [
      {
        text: "Ok",
        onPress: () => props.navigation.navigate("AccountDashboard"),
        style: "ok",
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        ),
    }
  );
