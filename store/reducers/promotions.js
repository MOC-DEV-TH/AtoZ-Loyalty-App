import { SET_PROMOTION,SET_EMPTY_RESPONSE_CODE,SET_RESPONSE_CODE } from "../actions/promotions";

const initialState = {
    promotions: [],
    response_code : null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PROMOTION:
          return {
            promotions: action.promotions,
          };
          case SET_RESPONSE_CODE:
          return {
            response_code: action.response_code,
          };
          case SET_EMPTY_RESPONSE_CODE:
          return {
            response_code: null,
          };
        default:
          return state;
      }
  };