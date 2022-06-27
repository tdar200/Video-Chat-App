import React, {useContext} from 'react'
import { SocketContext } from '../Context';
import { Button } from '@material-ui/core';

function Notifications() {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
 
 
  // console.log(useContext(SocketContext), "context from notifications")
  // console.log(call, "call from notifications")
 
  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is trying to connect:</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Connect
          </Button>
        </div>
      )}
    </>
  );
}

export default Notifications