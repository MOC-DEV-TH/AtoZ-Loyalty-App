import Global from "../../constants/Global";
import AppVersion from "../../constants/AppVersion";

export const registerUser = (userObj) => {
    console.log("register user");
    console.log(userObj);
    return async (dispatch) => {
      try {
        const response = await fetch(
          Global.baseUrl+"/signup",
          {
            method: "POST",
            headers: {
              "Accept": "application/json",
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
          }
        );
  
        if (!response.ok) {
          let message = "Something went wrong!";
          console.log(response);
          throw new Error(message);
        }
  
        const respData = await response.json();
        console.log("register user response");
        console.log(respData);

        if(respData.response_code=="000")
        {
            alert(respData.description)
        }

      } catch (err) {
        throw err;
      }
    };
  };
  