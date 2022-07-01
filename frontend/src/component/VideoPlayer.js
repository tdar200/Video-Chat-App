import React, { useContext, useEffect, useRef } from "react";
import { Paper, Grid, Typography, makeStyles } from "@material-ui/core";

import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

function VideoPlayer() {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
  } = useContext(SocketContext);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  console.log({userInfo})

  const classes = useStyles();

  // console.log("stream", stream);

  console.log("myvideo", myVideo);
  console.log("userVideo", userVideo)
  console.log(useContext(SocketContext));

  useEffect(() => {

  }, [userInfo])

  // console.log(callAccepted, "call accepted")

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant='h5' gutterBottom>
              {/* {userInfo?.name || "Name"} */}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant='h5' gutterBottom>
              {/* {userInfo?.name} */}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
}

export default VideoPlayer;
