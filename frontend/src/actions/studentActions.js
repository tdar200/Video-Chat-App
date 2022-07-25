import axios from "axios";
import {
  STUDENT_UPDATE_REQUEST,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_UPDATE_FAIL,
  STUDENT_DETAIL_REQUEST,
  STUDENT_DETAIL_SUCCESS,
  STUDENT_DETAIL_FAIL,
  STUDENT_DETAIL_USER_POPULATE_REQUEST,
  STUDENT_DETAIL_USER_POPULATE_SUCCESS,
  STUDENT_DETAIL_USER_POPULATE_FAIL,
} from "../constants/studentConstants";

export const studentDetailAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_DETAIL_REQUEST,
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

    const { data } = await axios.get(`/api/students/${id}`, config);

    console.log("data from redux action", data)

    dispatch({
      type: STUDENT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: STUDENT_DETAIL_FAIL,
      payload: message,
    });
  }
};

export const studentDetailUserPopulateAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_DETAIL_USER_POPULATE_REQUEST,
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

    const { data } = await axios.get(`/api/students/populateUser/${id}`, config);

    dispatch({
      type: STUDENT_DETAIL_USER_POPULATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: STUDENT_DETAIL_USER_POPULATE_FAIL,
      payload: message,
    });
  }
};


export const studentUpdate = (student) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_UPDATE_REQUEST,
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

    const { data } = await axios.put(
      `/api/students/${student.id}/credit`,
      student,
      config
    );

    dispatch({
      type: STUDENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: STUDENT_UPDATE_FAIL,
      payload: message,
    });
  }
};
