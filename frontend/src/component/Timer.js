import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../Context";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherDetails } from "../actions/teacherActions";
import { studentUpdate } from "../actions/studentActions";
import { updateTeacherCreditAction } from "../actions/teacherActions";

function Timer() {
  const params = useParams();
  const dispatch = useDispatch();

  const { callEnded, leaveCall, setCallEnded, userId } =
    useContext(SocketContext);

  console.log("user Id from timer", userId);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const teacherDetail = useSelector((state) => state.teacherDetail);
  const { teacher, loading } = teacherDetail;
  // console.log(params.id)

  useEffect(() => {
    if (params?.id && !teacher && loading) {
      console.log("is this running");
      dispatch(getTeacherDetails(params?.id));
    }
  }, [dispatch, loading, params?.id, teacher]);

  useEffect(() => {
    const setTimer = setInterval(() => {
      if (seconds < 59) {
        setSeconds((prev) => prev + 1);
      } else {
        setSeconds(0);
        setMinutes((prev) => prev + 1);
      }

      if (minutes >= 59) {
        setMinutes(0);
        setHours((prev) => prev + 1);
      }
    }, 1000);

    return () => {
      clearInterval(setTimer);
    };
  }, [minutes, seconds]);

  useEffect(() => {
    if (callEnded) {

      let convertedHours = hours * 60;
      let convertedSeconds = seconds / 60;

      let totalTime = convertedHours + convertedSeconds + minutes;

      console.log("total Time", totalTime);
      console.log("teacher", teacher);

      const studentCredit = {
        id: userId,
        credit: -totalTime,
      };

      const teacherCredit = {
        id: userId,
        credit: totalTime,
      };

      dispatch(studentUpdate(studentCredit));
      dispatch(updateTeacherCreditAction(teacherCredit));

      setCallEnded(false);
    }
  }, [callEnded]);

  return (
    <div>
      <h3>
        {hours === 0 ? "00" : hours < 10 ? `0${hours}` : hours}:
        {minutes === 0 ? "00" : minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </h3>
    </div>
  );
}

export default Timer;
