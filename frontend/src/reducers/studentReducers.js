import {
    STUDENT_UPDATE_REQUEST,
    STUDENT_UPDATE_SUCCESS,
    STUDENT_UPDATE_FAIL,
    STUDENT_DETAIL_SUCCESS,
    STUDENT_DETAIL_REQUEST,
    STUDENT_DETAIL_FAIL

} from "../constants/studentConstants"

export const studentDetailReducer = (state = {student: {}}, action) => {
    switch (action.type) {
        case STUDENT_DETAIL_REQUEST:
          return {
            loading: true,
          };
        case STUDENT_DETAIL_SUCCESS:
          return {
            loading: false,
            student: action.payload,
            success: true,
          };
        case STUDENT_DETAIL_FAIL:
          return {
            loading: false,
            error: action.payload,
          };
    
        default:
          return state;
      }
}

export const studentUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_UPDATE_REQUEST:
          return {
            loading: true,
          };
        case STUDENT_UPDATE_SUCCESS:
          return {
            loading: false,
            success: true,
          };
        case STUDENT_UPDATE_FAIL:
          return {
            loading: false,
            error: action.payload,
          };
    
        default:
          return state;
      }
}