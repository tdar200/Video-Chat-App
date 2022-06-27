import axios from "axios";

import {
  ROOM_CREATE_REQUEST,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAIL,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
} from "../constants/roomConstants";


export const createRoom = (room) => async (dispatch, getState) => {
    try {
        dispatch({
          type: ROOM_CREATE_REQUEST,
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
    
        const { data } = await axios.post("/api/rooms", room, config);
    
        dispatch({
          type: ROOM_CREATE_SUCCESS,
          payload: data,
        });
    
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
          type: ROOM_CREATE_FAIL,
          payload: message,
        });
      }
}

export const getRoomDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ROOM_DETAILS_REQUEST,
      });
  
      const { data } = await axios.get(`/api/rooms/${id}`);
  
      dispatch({
        type: ROOM_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
  
      dispatch({
        type: ROOM_DETAILS_FAIL,
        payload: message,
      });
    }
  };