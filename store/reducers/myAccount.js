import { SET_MEMBER_INFO,SET_EMPTY_RESPONSE_CODE,SET_RESPONSE_CODE } from "../actions/myAccount";

const initialState = {
    memberInfo: {},
    response_code : null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MEMBER_INFO:
          return {
            memberInfo: action.member_info,
          };
          case SET_RESPONSE_CODE:
          return {
            ...state,
            response_code: action.response_code,
          };
          case SET_EMPTY_RESPONSE_CODE:
          return {
            ...state,
            response_code: null,
          };
        default:
          return state;
      }
  };