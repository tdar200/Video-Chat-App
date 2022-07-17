import React, { useEffect, useContext } from "react";
// import { queryDetail } from '../reducers/queryReducers'
import VideoPlayer from "../component/VideoPlayer";
import { getQueryDetails } from "../actions/queryActions";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Options from "../component/Options";
import Notifications from "../component/Notifications";
import { SocketContext } from "../Context";
import Sidebar from "../component/Sidebar";
import OpenConversation from "../component/OpenConversation";

function QueryDetailsPage() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let params = useParams();
  let queryId = params.id;
  const dispatch = useDispatch();

  const queryDetails = useSelector((state) => state);

  const {selectedConversation, myVideo, stream, userVideo} = useContext(SocketContext)


  // console.log("context",  useContext(SocketContext))
  // console.log("stream", stream)
  // console.log("my video", myVideo?.current?.srcObject )
  // console.log("user video", userVideo?.current?.srcObject)


  // console.log({ queryDetails });
  const { loading, query, error } = queryDetails;

  useEffect(() => {}, [dispatch, queryId]);

  return (
    <div>
      <VideoPlayer />

      <Options>
        <Notifications />
      </Options>

      <div className='d-flex' >
        <Sidebar id={userInfo?._id} />
        {selectedConversation && <OpenConversation />}
      </div>
    </div>
  );
}

export default QueryDetailsPage;
