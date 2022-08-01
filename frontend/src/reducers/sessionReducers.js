import {
    SESSION_CREATE_REQUEST,
    SESSION_CREATE_SUCCESS,
    SESSION_CREATE_FAIL,
    SESSION_UPDATE_REQUEST,
    SESSION_UPDATE_SUCCESS,
    SESSION_UPDATE_FAIL,
    SESSION_DETAIL_REQUEST,
    SESSION_DETAIL_SUCCESS,
    SESSION_DETAIL_FAIL
} from "../constants/sessionContants"

export const sessionDetailReducer = (state = {}, action) => {
    switch (action.type) {
      case SESSION_DETAIL_REQUEST:
        return {
          loading: true,
        };
      case SESSION_DETAIL_SUCCESS:
        return {
          loading: false,
          success: true,
          session: action.payload,
        };
      case SESSION_DETAIL_FAIL: {
        return {
          loading: false,
          error: action.payload,
        };
      }
  
      default:
        return state;
    }
  };

export const sessionCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SESSION_CREATE_REQUEST:
        return {
          loading: true,
        };
      case SESSION_CREATE_SUCCESS:
        return {
          loading: false,
          success: true,
          session: action.payload,
        };
      case SESSION_CREATE_FAIL: {
        return {
          loading: false,
          error: action.payload,
        };
      }
  
      default:
        return state;
    }
  };


  export const sessionUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case SESSION_UPDATE_REQUEST:
        return {
          loading: true,
        };
      case SESSION_UPDATE_SUCCESS:
        return {
          loading: false,
          success: true,
          session: action.payload,
        };
      case SESSION_UPDATE_FAIL: {
        return {
          loading: false,
          error: action.payload,
        };
      }
      default:
        return state;
    }
  };
