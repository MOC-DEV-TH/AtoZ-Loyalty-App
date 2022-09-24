import { SET_HOME_PROMOTION } from "../actions/home";

const initialState = {
    home_promotions: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case SET_HOME_PROMOTION:
          return {
            ...state,
            home_promotions: action.home_promotions,
          };
        default:
          return state;
      }
  };