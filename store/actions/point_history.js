import AppVersion from "../../constants/AppVersion";
import Global from "../../constants/Global";
export const SET_POINT_HISTORY = "SET_POINT_HISTORY";


export const getPointHistory = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    console.log("token", token);
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
    console.log("Point History data" + respData.details);

    
    dispatch({
      type: SET_POINT_HISTORY,
      point_history: respData.details,
    });
  };
};
