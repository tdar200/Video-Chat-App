import React, { useContext } from "react";
import { SocketContext } from "../Context";
import { Button, Container } from "@material-ui/core";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import Options from "../component/Options";
import Notifications from "../component/Notifications";
import VideoPlayer from "../component/VideoPlayer";

function TeacherQuery() {
  const {
    me,
    callAccepted,
    name,
    setName,
    leaveCall,
    callUser,
    callEnded,
    answerCall,
    call,
  } = useContext(SocketContext);

  // console.log("call.isReceivingCall", call.isReceivingCall);

  // console.log("teacher context", useContext(SocketContext))

  return (
    <Container>
      <VideoPlayer />
      <Options>
        <Notifications />
        {/* {call.isReceivingCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>{call.name} is trying to connect:</h1>
          <Button variant='contained' color='primary' onClick={answerCall}>
            Connect
          </Button>
        </div>
      )} */}
      </Options>
   
    
    </Container>
  );
}

export default TeacherQuery;
