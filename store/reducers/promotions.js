import { SET_PROMOTION } from "../actions/promotions";

const initialState = {
    promotions: [],

  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PROMOTION:
          return {
            promotions: action.promotions,
          };
        default:
          return state;
      }
  };