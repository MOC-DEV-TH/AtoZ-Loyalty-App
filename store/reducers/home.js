import { SET_HOME_PROMOTION ,SET_RESPONSE_CODE,SET_EMPTY_RESPONSE_CODE,SET_AVAILABLE_POINT} from "../actions/home";

const initialState = {
    home_promotions: [],
    response_code : null,
    available_point : 0
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case SET_HOME_PROMOTION:
          return {
            ...state,
            home_promotions: action.home_promotions,
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
          case SET_AVAILABLE_POINT:
          return {
            ...state,
            available_point: action.available_point,
          };
        default:
          return state;
      }
  };