import { storeData } from "../../AsyncStorage/AsyncStorage";
import AppVersion from "../../constants/AppVersion";
import AsyncStorageKey from "../../constants/AsyncStorageKey";
import Global from "../../constants/Global";
import getEnvVars from "../../environment";

const { apiUrl } = getEnvVars();
export const SET_NOTIFICATION_DATA = "SET_NOTIFICATION_DATA"
export const NOTIFICATION_RECEIVE = "NOTIFICATION_RECEIVE"
export const SET_EMPTY_NOTIFICATION = "SET_EMPTY_NOTIFICATION"


export const receiveNotification = (notificationCount) => {
  return (dispatch) => {
    dispatch({
      type: NOTIFICATION_RECEIVE,
      notiCount : notificationCount
    });
  };
};

export const setEmptyNotification = (count) => {
  return (dispatch) => {
    dispatch({
      type: SET_EMPTY_NOTIFICATION,
      count : count
    });
  };
};


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
    console.log("NotiLenght",respData.details.length)
    storeData(AsyncStorageKey.LAST_NOTI_COUNT,respData.details.length.toString())
      dispatch({
        type: SET_NOTIFICATION_DATA,
        notification_data : respData.details,
      })
  };
};
