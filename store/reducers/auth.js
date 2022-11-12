import { AUTHENTICATE,SET_ALL_DROP_DOWN,SET_TOWNSHIP } from "../actions/auth";

const initialState = {
    token: null,
    userId : null,
    createDate : null,
    townShipDDL : [],
    cityDDL : [],
    allDropDownData : {}
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
          return {
            token: action.token,
            userId : action.userID,
            createDate : action.createDate
          };
          case SET_ALL_DROP_DOWN:
          return {
            townShipDDL: action.townShipDDL,
            cityDDL : action.cityDDL
          };
        default:
          return state;
      }
  };