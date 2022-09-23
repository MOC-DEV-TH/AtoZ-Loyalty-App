import { SET_HOME_PROMOTION } from "../actions/home";

const initialState = {
    promotions: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case SET_HOME_PROMOTION:
          return {
            promotions: action.promotions,
          };
        default:
          return state;
      }
  };