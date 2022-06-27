import {
  QUERY_CREATE_REQUEST,
  QUERY_CREATE_SUCCESS,
  QUERY_CREATE_FAIL,
  QUERY_CREATE_RESET,
  QUERY_LIST_REQUEST,
  QUERY_LIST_SUCCESS,
  QUERY_LIST_FAIL,
  QUERY_DETAILS_REQUEST,
  QUERY_DETAILS_SUCCESS,
  QUERY_DETAILS_FAIL,
  QUERY_DELETE_REQUEST,
  QUERY_DELETE_SUCCESS,
  QUERY_DELETE_FAIL,
} from "../constants/queryConstants";

export const queryListReducer = (state = { queries: [] }, action) => {
  switch (action.type) {
    case QUERY_LIST_REQUEST:
      return {
        loading: true,
      };
    case QUERY_LIST_SUCCESS:
      return {
        loading: false,
        queries: action.payload,
        success: true
      };
    case QUERY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const queryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUERY_CREATE_REQUEST:
      return {
        loading: true,
      };
    case QUERY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        queries: action.payload,
      };
    case QUERY_CREATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    case QUERY_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const queryDetailReducer = (
  state = { loading: true, query: [] },
  action
) => {
  switch (action.type) {
    case QUERY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case QUERY_DETAILS_SUCCESS:
      return {
        loading: false,
        query: action.payload,
        success: true
      };
    case QUERY_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const queryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUERY_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case QUERY_DELETE_SUCCESS:
      return {
        loading: false,
        query: action.payload,
      };
    case QUERY_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
