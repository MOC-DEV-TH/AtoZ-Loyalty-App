import { STATUS,SET_EMPTY_STATUS } from "../actions/users";

const initialState = {
    status : null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case STATUS:
          return {
            ...state,
            status: action.status,
          };
          case SET_EMPTY_STATUS:
          return {
            ...state,
            status: null,
          };
        
        default:
          return state;
      }
  };