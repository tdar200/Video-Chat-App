import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import { SocketContext } from "../Context";
import { updateTeacherAction } from "../actions/teacherActions";
import { useDispatch, useSelector } from "react-redux";
import { studentDetailUserPopulateAction } from "../actions/studentActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
  },
}));

function Options() {
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
    userIdState,
    setCallEnded,
    createContact,
    createConversation,
  } = useContext(SocketContext);

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const dispatch = useDispatch();

  const studentDetailUserPopulate = useSelector((state) => state.studentDetailUserPopulate);
  const { loading, student, success } = studentDetailUserPopulate;

  const [idToCall, setIdToCall] = useState("");
  const classes = useStyles();

  // console.log("student detail user populate", studentDetailUserPopulate)

  

  useEffect(() => {
    if (call?.from && !success &&  loading) {
      // console.log("is this function being run")
      dispatch(studentDetailUserPopulateAction(call?.from));
    }
  }, [call?.from, dispatch, loading, student, success]);

 


  function handleClick() {
    answerCall();

    if (call.isReceivingCall && call.from) {
      const teacher = { id: userInfo?._id, from: call.from };

      createContact(call.from, "student");
      createConversation([call.from]);
      dispatch(updateTeacherAction(teacher));
    }

    navigate(`/rooms/${userInfo?._id}`);
  }

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        {/* <form className={classes.root} noValidate autoComplete='off'>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant='h6'>
                Account Info
              </Typography>
              <TextField
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <CopyToClipboard text={me} className={classes.margin}>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  startIcon={<Assignment fontSize='large' />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant='h6'>
                Make a call
              </Typography>
              <TextField
                label='ID to call'
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />
              : (
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<Phone fontSize='large' />}
                  fullWidth
                  onClick={() => callUser(idToCall)}
                  className={classes.margin}>
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form> */}

        {call.isReceivingCall && !callAccepted && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <h1> is trying to connect:</h1>
            {/* <h1>gender: {student[0]?.user.name} </h1> */}
            <Button variant='contained' color='primary' onClick={handleClick}>
              Connect
            </Button>
          </div>
        )}

        {callAccepted && !callEnded && (
          <Button
            variant='contained'
            color='secondary'
            startIcon={<PhoneDisabled fontSize='large' />}
            fullWidth
            onClick={() => leaveCall(userInfo?._id)}
            className={classes.margin}>
            Disconnect
          </Button>
        )}
      </Paper>
    </Container>
  );
}

export default Options;
