import Global from "../../constants/Global";

export const STATUS = "STATUS";
export const SET_EMPTY_STATUS = "SET_EMPTY_STATUS";

export const setEmptyStatus = () => {
  return (dispatch) => {
    dispatch({
      type: SET_EMPTY_STATUS,
    });
  };
};

export const registerUser = (userObj) => {
  console.log("register user");
  console.log(userObj);
  return async (dispatch) => {
    try {
      const response = await fetch(Global.baseUrl + "/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          name: userObj.name,
          dob: userObj.dob,
          nrc: userObj.nrc,
          address: userObj.address,
          city: userObj.city,
          township: userObj.township,
          phone: userObj.phone,
          password: userObj.password,
          confirm_password: userObj.confirm_password,
        }),
      });

      if (!response.ok) {
        let message = "Something went wrong!";
        console.log(response);
        throw new Error(message);
      }

      const respData = await response.json();
      console.log("register user response"+respData);
      if(respData.response_code=="016")
      {
        alert(respData.description)
      }
        dispatch({
          type: STATUS,
          status: respData.status,
        });
      
    } catch (err) {
      throw err;
    }
  };
};
