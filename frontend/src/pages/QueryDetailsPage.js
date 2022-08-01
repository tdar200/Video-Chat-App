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
import { sessionCreateAction } from "../actions/sessionActions";
import moment from "moment";
import Dropzone from "../component/Dropzone";
import Ratings from "../component/Ratings";
import Timer from "../component/Timer";

function QueryDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [showRatingModal, setShowRatingModal] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const sessionCreate = useSelector((state) => state.sessionCreate )

  const {loading, success , session} = sessionCreate

  console.log("sessionCreate", sessionCreate)

  const {
    selectedConversation,
    myVideo,
    stream,
    userVideo,
    callEnded,
    leaveCall,
    callAccepted,
    call,
  } = useContext(SocketContext);

  console.log("call Ended", callEnded)

  useEffect(() => {
    if (callEnded) {
      setShowRatingModal(true);
    }
  }, [callEnded]);

  // console.log(call);

  useEffect(() => {
    if (call) {
      const session = {
        teacher: call.otherUserId,
        student: call.userId,
        session_started: moment(),
        active: true,
      };

      dispatch(sessionCreateAction(session));
    }
  }, [call, dispatch]);

  return (
    <div>
      <Timer />
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
      <Dropzone />
      <div className='d-flex'>
        <Sidebar id={userInfo?._id} />
        {selectedConversation && <OpenConversation />}
      </div>
      <Ratings
        setshowmodal={setShowRatingModal}
        show={showRatingModal}
        onHide={() => setShowRatingModal(false)}
      />
    </div>
  );
}

export default QueryDetailsPage;
