import axios from "axios";
import {
  TEACHER_LIST_FAIL,
  TEACHER_LIST_SUCCESS,
  TEACHER_LIST_REQUEST,
  TEACHER_UPDATE_FAIL,
  TEACHER_UPDATE_SUCCESS,
  TEACHER_UPDATE_REQUEST,
  TEACHER_DETAIL_FAIL,
  TEACHER_DETAIL_SUCCESS,
  TEACHER_DETAIL_REQUEST,
  TEACHER_UPDATE_CREDIT_REQUEST,
  TEACHER_UPDATE_CREDIT_SUCCESS,
  TEACHER_UPDATE_CREDIT_FAIL
} from "../constants/teacherConstants";

export const listTeachers = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEACHER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/teachers/${category}`, config);

    dispatch({
      type: TEACHER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {


    dispatch({
      type: TEACHER_LIST_FAIL,
    });
  }
};


export const updateTeacherAction = (teacher) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEACHER_UPDATE_REQUEST,
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
      `/api/teachers/update/${teacher.id}/${teacher.from}`,
      {},
      config
    );

    dispatch({
      type: TEACHER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
 
    dispatch({ 
      type: TEACHER_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const getTeacherDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEACHER_DETAIL_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/teachers/detail/${id}`, config);

    dispatch({
      type: TEACHER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: TEACHER_DETAIL_FAIL,
      payload: message,
    });
  }
};

export const updateTeacherCreditAction = (teacher) => async(dispatch, getState) => {
  try {
    dispatch({
      type: TEACHER_UPDATE_CREDIT_REQUEST,
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
      `/api/students/${teacher.id}/credit`,
      teacher,
      config
    );

    dispatch({
      type: TEACHER_UPDATE_CREDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: TEACHER_UPDATE_CREDIT_FAIL,
      payload: message,
    });
  }


}
