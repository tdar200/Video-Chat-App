import {
  SESSION_CREATE_REQUEST,
  SESSION_CREATE_SUCCESS,
  SESSION_CREATE_FAIL,
  SESSION_UPDATE_REQUEST,
  SESSION_UPDATE_SUCCESS,
  SESSION_UPDATE_FAIL,
  SESSION_DETAIL_REQUEST,
  SESSION_DETAIL_SUCCESS,
  SESSION_DETAIL_FAIL
} from "../constants/sessionContants";
import axios from "axios";


export const sessionDetailAction = (teacherId, studentId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SESSION_DETAIL_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();

      console.log(userInfo, " session action token")
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/session/${teacherId}/${studentId}`, config);
  
      dispatch({
        type: SESSION_DETAIL_SUCCESS,
        payload: data,
      });
  
      // const {data: data2} = await axios.get(`/api/queries/${data._id}`);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: SESSION_DETAIL_FAIL,
        payload: message,
      });
    }
  };


export const sessionCreateAction = (session) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SESSION_CREATE_REQUEST,
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

    const { data } = await axios.post("/api/session", session, config);

    dispatch({
      type: SESSION_CREATE_SUCCESS,
      payload: data,
    });

    // const {data: data2} = await axios.get(`/api/queries/${data._id}`);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SESSION_CREATE_FAIL,
      payload: message,
    });
  }
};

export const sessionUpdateAction = (session, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SESSION_UPDATE_REQUEST,
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

// console.log(session)

    const { data } = await axios.put(
      `/api/session/update/${id}`,
      session,
      config
    );

    dispatch({
      type: SESSION_UPDATE_SUCCESS,
      payload: data,
    });

    // const {data: data2} = await axios.get(`/api/queries/${data._id}`);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SESSION_UPDATE_FAIL,
      payload: message,
    });
  }
};
