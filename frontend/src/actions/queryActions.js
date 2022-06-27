import axios from "axios";

import {
  QUERY_CREATE_REQUEST,
  QUERY_CREATE_SUCCESS,
  QUERY_CREATE_FAIL,
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

export const listQueries = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUERY_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/queries", config);

    dispatch({
      type: QUERY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: QUERY_LIST_FAIL,
      payload: message,
    });
  }
};

export const getQueryDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUERY_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/queries/${id}`);

    dispatch({
      type: QUERY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: QUERY_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const createQuery = (query) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUERY_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/queries", query, config);

    dispatch({
      type: QUERY_CREATE_SUCCESS,
      payload: data,
    });

    // const {data: data2} = await axios.get(`/api/queries/${data._id}`);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: QUERY_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteQuery = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUERY_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/queries/${id}`, config);

    dispatch({
      type: QUERY_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: QUERY_DELETE_FAIL,
      payload: message,
    });
  }
};
