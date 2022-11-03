import { SET_NOTIFICATION_DATA,NOTIFICATION_RECEIVE, SET_EMPTY_NOTIFICATION } from "../actions/notification";
  
  const initialState = {
    notification_data: [],
    notificationCount: 0
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_NOTIFICATION_DATA:
        return {
            notification_data: action.notification_data,
        };
        case NOTIFICATION_RECEIVE:
        return {
          notificationCount: action.notiCount,
        };
        case SET_EMPTY_NOTIFICATION:
        return {
          notificationCount: action.count,
        };
      default:
        return state;
    }
  };
  