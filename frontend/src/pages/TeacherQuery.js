import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context";
import { Button, Container } from "@material-ui/core";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import Options from "../component/Options";
import Notifications from "../component/Notifications";
import VideoPlayer from "../component/VideoPlayer";
import Sidebar from "../component/Sidebar";
import OpenConversation from "../component/OpenConversation";

function TeacherQuery() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [reloadOnce, setReloadOnce] = useState(false);

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

  useEffect(() => {
    if (!reloadOnce) {
      setReloadOnce(true);
      window.location.reload();
    }
  }, [reloadOnce]);

  return (
    <Container>
      {/* <VideoPlayer /> */}
      <Options>
        <Notifications />
      </Options>
    </Container>
  );
}

export default TeacherQuery;
