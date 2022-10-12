import { SET_NOTIFICATION_DATA } from "../actions/notification";
  
  const initialState = {
    notification_data: []
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_NOTIFICATION_DATA:
        return {
            notification_data: action.notification_data,
        };
      default:
        return state;
    }
  };
  