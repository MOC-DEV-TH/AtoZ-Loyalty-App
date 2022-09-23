import AppVersion from "../../constants/AppVersion";
import Global from "../../constants/Global";
import MemberInfo from "../../model/memberInfo";
export const SET_MEMBER_INFO = "SET_MEMBER_INFO";

export const getMemberInfo = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    console.log("token", token);
    const response = await fetch(
      Global.baseUrl + "get_member_info?app_version=" + AppVersion.app_version,
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

    const respData = await response.json()
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
      );
      console.log(memberInfoObj);
      dispatch({
        type : SET_MEMBER_INFO,
        member_info : memberInfoObj
      })
  };
};
