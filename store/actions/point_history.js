import AppVersion from "../../constants/AppVersion";
import Global from "../../constants/Global";
import getEnvVars from "../../environment";

const { apiUrl } = getEnvVars();
export const SET_POINT_HISTORY = "SET_POINT_HISTORY";
export const SET_RESPONSE_CODE = "SET_RESPONSE_CODE"
export const SET_EMPTY_RESPONSE_CODE = "SET_EMPTY_RESPONSE_CODE"
export const SET_POINT_HISTORY_AVAILABLE_POINT = "SET_POINT_HISTORY_AVAILABLE_POINT"

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
      apiUrl +
        "/get_point_history?app_version=" +
        AppVersion.app_version,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      }
    );
    const respData = await response.json();
    if (!response.ok) {
      const errorResData = await response.text();
      console.log(errorResData);
      let message = "Something went wrong!";
      throw new Error(message);
    }
      dispatch({
        type: SET_RESPONSE_CODE,
        response_code : respData.response_code,
      })
      
      dispatch({
        type: SET_POINT_HISTORY,
        point_history: respData.details.details,
        available_point : respData.details.available_point
      });
  };
};
