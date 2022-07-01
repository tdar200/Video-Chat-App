import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { useDispatch, useSelector } from "react-redux";
import { callAcceptedAction } from "./actions/callActions";

const SocketContext = createContext();

const socket = io("https://new-video-chat-app.herokuapp.com/");

// console.log("list of sockets", socket.clients())

// console.log("socket", socket);

const ContextProvider = ({ children }) => {


  const dispatch = useDispatch()

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [userIdState, setUserIdState] = useState({});

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  // console.log("call accepted value context", callAccepted);

  // console.log("user id", userIdState);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    // socket.on("callUser", ({ from, signal }) => {
    //   console.log("this from the context, signal and data call user function", {
    //     from,
    //     signal,
    //   });

    // socket.on("me", (id) => setMe(id));

    // const setUserId = () => {
    //   socket.emit("userId", userInfo?._id);
    // };

    // setUserId();

    // socket.on("user", ({ userId, socketId }) => {
    //   // console.log("user Id from fronted", {userId, socketId})
    //   localStorage.setItem("users", JSON.stringify({ userId, socketId }));
    //   setUserIdState({ userId, socketId });
    // });
    // socket.on("connect", () => {
    // for (let key in socket) {
    //   console.log({ key, val: socket[key] });
    // }
    // console.log("socket id", socket);

    // socket.on("connect", () => {
    //   socket.emit("connect", userIdState.userId, userIdState.socketId);
    // }
    // );



    const sessionID = socket.id;
    if (socket?.id) {
      socket.emit("logged", {
        userId: userInfo?._id,
        socketId: sessionID,
      });

      setUserIdState({ userId: userInfo?._id, socketId: sessionID });
    }

    socket.on("callUser", ({ from, signal, userId }) => {
      // console.log("this from the context, signal and data call user function", {
      //   from,
      //   signal,
      // });

      setCall({ isReceivingCall: true, from, signal, userId });
    });

    socket.on("callAccepted", () => {
      console.log("first call accepted")
      setCallAccepted(true);
    })

    // return () => {
    //   setUserId();
    // };

    // });
  }, [userInfo?._id, socket?.id]);

  const answerCall = () => {
    setCallAccepted(true);
    dispatch(callAcceptedAction)
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {

      
   
      // setCallAccepted(true);
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;

      // myVideo.current.srcObject = currentStream;
    });

    // socket.on("callUser", ({ from, signal, userId }) => {
    //   // console.log("this from the context, signal and data call user function", {
    //   //   from,
    //   //   signal,
    //   // });

    //   setCall({ isReceivingCall: true, from, signal, userId });
    // });


    socket.on("answerCall", () => {

      console.log("callAccepted triggered context api")
      setCallAccepted(true)

    })

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: userIdState.userId,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      dispatch(callAcceptedAction)
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        userIdState,
      }}>
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
