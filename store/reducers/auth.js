import { AUTHENTICATE,SET_SCREEN_NAME } from "../actions/auth";

const initialState = {
    token: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
          return {
            token: action.token,
          };
        default:
          return state;
      }
  };