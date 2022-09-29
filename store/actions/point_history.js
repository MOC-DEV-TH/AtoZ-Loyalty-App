import AppVersion from "../../constants/AppVersion";
import Global from "../../constants/Global";
export const SET_POINT_HISTORY = "SET_POINT_HISTORY";
export const SET_RESPONSE_CODE = "SET_RESPONSE_CODE"
export const SET_EMPTY_RESPONSE_CODE = "SET_EMPTY_RESPONSE_CODE"

export const setEmptyResponseCode = () => {
  return (dispatch) => {
    dispatch({
      type: SET_EMPTY_RESPONSE_CODE,
    });
  };
};

export const getPointHistory = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      Global.baseUrl +
        "/get_point_history?app_version=" +
        AppVersion.app_version,
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
    dispatch({
      type: SET_RESPONSE_CODE,
      response_code : respData.response_code
    })
    console.log("Point History data" + respData.details);

    
    dispatch({
      type: SET_POINT_HISTORY,
      point_history: respData.details,
    });
  };
};
