import { AUTHENTICATE,SET_ALL_DROP_DOWN } from "../actions/auth";

const initialState = {
    token: null,
    userId : null,
    createDate : null,
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
            allDropDownData: action.allDropDownData,
          };
        default:
          return state;
      }
  };