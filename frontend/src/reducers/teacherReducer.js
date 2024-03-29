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
  TEACHER_UPDATE_CREDIT_FAIL,
  TEACHER_ADD_APPOINTMENT_REQUEST,
  TEACHER_ADD_APPOINTMENT_SUCCESS,
  TEACHER_ADD_APPOINTMENT_FAIL
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

export const teacherUpdateReducer = (
  state = { loading: true, teacher: "" },
  action
) => {
  switch (action.type) {
    case TEACHER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case TEACHER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        teacher: action.payload,
      };
    case TEACHER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const teacherDetailsReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case TEACHER_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case TEACHER_DETAIL_SUCCESS:
      return {
        loading: false,
        teacher: action.payload,
      };
    case TEACHER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const teacherUpdateCreditReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case TEACHER_UPDATE_CREDIT_REQUEST:
      return {
        loading: true,
      };
    case TEACHER_UPDATE_CREDIT_SUCCESS:
      return {
        loading: false,
        teacher: action.payload,
      };
    case TEACHER_UPDATE_CREDIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const teacherAddAppointmentReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case TEACHER_ADD_APPOINTMENT_REQUEST:
      return {
        loading: true,
      };
    case TEACHER_ADD_APPOINTMENT_SUCCESS:
      return {
        loading: false,
        teacher: action.payload,
      };
    case TEACHER_ADD_APPOINTMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
