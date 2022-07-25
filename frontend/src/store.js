import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  queryListReducer,
  queryDetailReducer,
  queryCreateReducer,
  queryDeleteReducer
} from "./reducers/queryReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userAllTeachersReducer
} from "./reducers/userReducers";

import {
  teacherListReducer,
  teacherUpdateReducer,
  teacherDetailsReducer,
  teacherUpdateCreditReducer
} from "./reducers/teacherReducer"

import {
  studentDetailReducer,
  studentUpdateReducer
} from "./reducers/studentReducers"

import {
  roomCreateReducer,
  roomDetailReducer
} from "./reducers/roomReducers"

import { callAcceptedReducer } from "./reducers/callReducers";



const reducer = combineReducers({
  queryList: queryListReducer,
  queryDetail: queryDetailReducer,
  queryCreate: queryCreateReducer,
  queryDelete: queryDeleteReducer,
  teacherList: teacherListReducer,
  teacherUpdate: teacherUpdateReducer,
  teacherDetail: teacherDetailsReducer,
  teacherUpdateCredit: teacherUpdateCreditReducer,
  studentDetail: studentDetailReducer,
  studentUpdate: studentUpdateReducer,
  roomCreate: roomCreateReducer,
  roomDetail: roomDetailReducer,
  callAccepted : callAcceptedReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userAllTeachers :userAllTeachersReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
  }

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;