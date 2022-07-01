import {
  CALL_ANSWER_REQUEST,
  CALL_ANSWER_SUCCESS,
  CALL_ANSWER_DECLINE,
} from "../constants/callConstants";

export const callAcceptedAction = () => (dispatch) => {
  try {
    dispatch({
      type: CALL_ANSWER_REQUEST,
    });

    dispatch({
      type: CALL_ANSWER_SUCCESS,
      payload: true,
    });
  } catch (error) {
    console.error(error);
  }
};
