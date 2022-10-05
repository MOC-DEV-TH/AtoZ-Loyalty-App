import {
  SET_POINT_HISTORY,
  SET_RESPONSE_CODE,
  SET_EMPTY_RESPONSE_CODE,
  SET_POINT_HISTORY_AVAILABLE_POINT,
} from "../actions/point_history";

const initialState = {
  pointHistoryData: [],
  response_code: null,
  available_point: "0",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POINT_HISTORY:
      return {
        pointHistoryData: action.point_history,
        available_point : action.available_point
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
