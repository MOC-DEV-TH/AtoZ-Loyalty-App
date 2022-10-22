import AppVersion from "../../constants/AppVersion";
import Global from "../../constants/Global";
import getEnvVars from "../../environment";

const { apiUrl } = getEnvVars();
export const SET_NOTIFICATION_DATA = "SET_NOTIFICATION_DATA"

export const getAllNotifications = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const createDate = getState().auth.createDate;
    const response = await fetch(
      apiUrl +
        "/get_notifications?app_version=" +
        AppVersion.app_version +"&created_date="+createDate,
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
        type: SET_NOTIFICATION_DATA,
        notification_data : respData.details,
      })
  };
};
