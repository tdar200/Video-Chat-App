import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:5000");

// console.log("list of sockets", socket.clients())

// console.log("socket", socket);

const ContextProvider = ({ children }) => {
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

  console.log("call accepted value context", callAccepted)

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
    }


    socket.on("callUser", ({ from, signal }) => {
      console.log("this from the context, signal and data call user function", {
        from,
        signal,
      });

      setCall({ isReceivingCall: true, from, signal });
    });

 
    // return () => {
    //   setUserId();
    // };

    // });
  }, [userInfo?._id, socket?.id, socket, callAccepted]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };


  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    // console.log("this is triggered, call user function");

    // console.log("peer " ,peer)

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: userInfo?.id,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;

      // console.log(
      //   "userVideo.current from callUser",
      //   userVideo.current.srcObject
      // );
    });

    socket.on("callAccepted", (signal) => {
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
