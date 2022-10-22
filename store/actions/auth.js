import Global from "../../constants/Global";
import AppVersion from "../../constants/AppVersion";
import DropDownVO from "../../model/dropDown";
import { getStoreData, storeData } from "../../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../../constants/AsyncStorageKey";
import getEnvVars from "../../environment";

const { apiUrl } = getEnvVars();
export const AUTHENTICATE = "AUTHENTICATE";
export const SET_ALL_DROP_DOWN = "SET_DROP_DOWN";

export const authenticate = (token, userID, createDate) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      token: token,
      userID: userID,
      createDate: createDate,
    });
  };
};

export const login = (userID, password, expoToken) => {
  return async (dispatch) => {
    const response = await fetch(apiUrl + "/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": Global.security_key,
      },
      body: JSON.stringify({
        user_id: userID,
        password: password,
        app_version: AppVersion.app_version,
        expo_token: expoToken,
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
    else if(respData.status==="Success"){
       storeData(AsyncStorageKey.USER_ID,userID);
    }
    
    if(respData.status==="Success"){
      storeData(AsyncStorageKey.IS_LOGIN,"1");
    }

    dispatch(
      authenticate(
        respData.details.token,
        respData.details.user_id,
        respData.details.created_date
      )
    );
  };
};

export const getAllDDL = () => {
  return async (dispatch) => {
    const response = await fetch(apiUrl + "/get_ddl_data", {
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
    // ddlData.city.map((data) => {
    //   console.log("MemberLevel" + data.value);
    // });
    dispatch({
      type: SET_ALL_DROP_DOWN,
      allDropDownData: ddlData,
    });
  };
};
