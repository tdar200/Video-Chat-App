import axios from "axios";
import {
  TEACHER_LIST_FAIL,
  TEACHER_LIST_SUCCESS,
  TEACHER_LIST_REQUEST,
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
