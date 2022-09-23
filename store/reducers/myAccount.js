import { SET_MEMBER_INFO } from "../actions/myAccount";

const initialState = {
    memberInfo: {},
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MEMBER_INFO:
          return {
            memberInfo: action.member_info,
          };
        default:
          return state;
      }
  };