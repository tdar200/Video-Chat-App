import {
  TEACHER_LIST_FAIL,
  TEACHER_LIST_SUCCESS,
  TEACHER_LIST_REQUEST,
} from "../constants/teacherConstants";

export const teacherListReducer = (state = { teachers: [] }, action) => {
  switch (action.type) {
    case TEACHER_LIST_REQUEST:
      return {
        loading: true,
      };
    case TEACHER_LIST_SUCCESS:
      return {
        loading: false,
        teachers: action.payload,
      };
    case TEACHER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
