import AppVersion from "../../constants/AppVersion";
import Global from "../../constants/Global";
import MemberInfo from "../../model/memberInfo";
export const SET_MEMBER_INFO = "SET_MEMBER_INFO";
export const SET_RESPONSE_CODE = "SET_RESPONSE_CODE";
export const SET_EMPTY_RESPONSE_CODE = "SET_EMPTY_RESPONSE_CODE";
export const SET_OUTLET_LOCATIONS_INFO = "SET_OUTLET_LOCATIONS_INFO";

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
          token: token,
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
      respData.details.created_date
    );
    console.log(memberInfoObj);
    dispatch({
      type: SET_MEMBER_INFO,
      member_info: memberInfoObj,
    });
  };
};

export const updateAccount = (oldPassword, newPassword) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(Global.baseUrl + "/change_password", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=utf-8",
          token: token,
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
      // alert(respData.description);
      alert("Success! Login again with New Password");
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
          token: token,
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
