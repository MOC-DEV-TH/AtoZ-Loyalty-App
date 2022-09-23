import Global from "../../constants/Global";
import AppVersion from "../../constants/AppVersion";

export const AUTHENTICATE = "AUTHENTICATE";

export const authenticate = (token) => {
    return (dispatch) => {
      dispatch({
        type: AUTHENTICATE,
        token: token,
      });
  
    };
  };


export const login = (userID,password) => {
    return async (dispatch) => {
        const response = await fetch(
         Global.baseUrl+"login",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "security_key" : Global.security_key
            },
            body: JSON.stringify({
              user_id: userID,
              password: password,
              app_version: AppVersion.app_version,
            }),
          }
        );

        if (!response.ok) {
            const errorResData = await response.text();
            console.log(errorResData);
            let message = "Something went wrong!";
            throw new Error(message);
          }
      
          const respData = await response.json();
          console.log(respData);

          if(respData.response_code=="003"){
            alert(respData.description);
          }

          dispatch(
            authenticate(
              respData.details.token
            )
          );
         
}
}