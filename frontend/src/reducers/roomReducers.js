import {
    ROOM_CREATE_REQUEST,
    ROOM_CREATE_SUCCESS,
    ROOM_CREATE_FAIL,
    ROOM_DETAILS_REQUEST,
    ROOM_DETAILS_SUCCESS,
    ROOM_DETAILS_FAIL
} from "../constants/roomConstants"

export const roomCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ROOM_CREATE_REQUEST:
        return {
          loading: true,
        };
      case ROOM_CREATE_SUCCESS:
        return {
          loading: false,
          success: true,
          room: action.payload,
        };
      case ROOM_CREATE_FAIL: {
        return {
          loading: false,
          error: action.payload,
        };
      }
   
      default:
        return state;
    }
  };

  export const roomDetailReducer = (
    state = { loading: true, room: [] },
    action
  ) => {
    switch (action.type) {
      case ROOM_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case ROOM_DETAILS_SUCCESS:
        return {
          loading: false,
          room: action.payload,
          success: true
        };
      case ROOM_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  