import { SET_POINT_HISTORY,SET_RESPONSE_CODE,SET_EMPTY_RESPONSE_CODE } from "../actions/point_history";

const initialState = {
    pointHistoryData: [],
    response_code : null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case SET_POINT_HISTORY:
          return {
            pointHistoryData: action.point_history,
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