import { SET_MEMBER_INFO,SET_EMPTY_RESPONSE_CODE,SET_RESPONSE_CODE, SET_OUTLET_LOCATIONS_INFO } from "../actions/myAccount";

const initialState = {
    memberInfo: {},
    outletLocationsInfo: null,
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
        case SET_OUTLET_LOCATIONS_INFO:
          return {
            ...state,
            outletLocationsInfo: action.outlet_locations_info,
          }
        default:
          return state;
      }
  };