import Global from "../../constants/Global";
import AppVersion from "../../constants/AppVersion";
import DropDownVO from "../../model/dropDown";

export const AUTHENTICATE = "AUTHENTICATE";
export const SET_ALL_DROP_DOWN = "SET_DROP_DOWN";

export const authenticate = (token, userID) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      token: token,
      userID: userID,
    });
  };
};

export const login = (userID, password) => {
  return async (dispatch) => {
    const response = await fetch(Global.baseUrl + "/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        security_key: Global.security_key,
      },
      body: JSON.stringify({
        user_id: userID,
        password: password,
        app_version: AppVersion.app_version,
      }),
    });

    if (!response.ok) {
      const errorResData = await response.text();
      console.log(errorResData);
      let message = "Something went wrong!";
      throw new Error(message);
    }

    const respData = await response.json();
    console.log(respData);

    if (respData.response_code == "003") {
      alert(respData.description);
    }

    dispatch(authenticate(respData.details.token, respData.details.user_id));
  };
};

export const getAllDDL = () => {
  return async (dispatch) => {
    const response = await fetch(Global.baseUrl + "/get_ddl_data", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResData = await response.text();
      console.log(errorResData);
      let message = "Something went wrong!";
      throw new Error(message);
    }
    const respData = await response.json();

    const ddlData = new DropDownVO(
      respData.details.member_level,
      respData.details.member_type,
      respData.details.status,
      respData.details.township,
      respData.details.city
    );
    ddlData.status.map((data) => {
      console.log("MemberLevel" + data.value);
    });
    dispatch({
      type: SET_ALL_DROP_DOWN,
      allDropDownData: ddlData,
    });
  };
};
