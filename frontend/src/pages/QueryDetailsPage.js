import React, { useState, useEffect, useContext } from "react";
// import { queryDetail } from '../reducers/queryReducers'
import VideoPlayer from "../component/VideoPlayer";
import { getQueryDetails } from "../actions/queryActions";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Options from "../component/Options";
import Notifications from "../component/Notifications";
import { SocketContext } from "../Context";
import Sidebar from "../component/Sidebar";
import OpenConversation from "../component/OpenConversation";
import { getTeacherDetails } from "../actions/teacherActions";
import Timer from "../component/Timer";

function QueryDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const {
    selectedConversation,
    myVideo,
    stream,
    userVideo,
    callEnded,
    leaveCall,
    callAccepted,
    call
  } = useContext(SocketContext);

  // console.log(callEnded)



  // useEffect(() => {
  //   if (callEnded) {
  //     navigate("/");
  //   }
  // }, [callEnded, leaveCall, navigate]);

  return (
    <div>
      <Timer />
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
      <div className='d-flex'>
        <Sidebar id={userInfo?._id} />
        {selectedConversation && <OpenConversation />}
      </div>
    </div>
  );
}

export default QueryDetailsPage;
