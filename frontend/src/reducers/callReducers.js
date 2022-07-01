import { PlaylistAddOutlined } from "@material-ui/icons";
import {
  CALL_ANSWER_REQUEST,
  CALL_ANSWER_SUCCESS,
  CALL_ANSWER_DECLINE,
} from "../constants/callConstants";

export const callAcceptedReducer = (
  state = { callAccepted: false },
  action
) => {
  switch (action.type) {
    case CALL_ANSWER_REQUEST:
      return {
        loading: true,
      };
    case CALL_ANSWER_SUCCESS:
      return {
        loading: false,
        callAccepted: action.payload,
        success: true,
      };

    default:
      return state;
  }
};
