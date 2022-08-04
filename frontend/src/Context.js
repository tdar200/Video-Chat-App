import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { useDispatch, useSelector } from "react-redux";
import { callAcceptedAction } from "./actions/callActions";
import { updateTeacherAction } from "./actions/teacherActions";
import useLocalStorage from "./hooks/useLocalStorage";
import axios from "axios";
const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // const socket = io("https://new-video-chat-app.herokuapp.com/",

  const socket = io("http://localhost:5000/", {
    query: { id: userInfo?._id },
  });

  const dispatch = useDispatch();

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [userIdState, setUserIdState] = useState({});
  const [callAcceptedOtherEnd, setCallAcceptedOtherEnd] = useState(false);
  const [userId, setUserId] = useState("");

  const [teacherId, setTeacherId] = useState("");
  const [studentId, setStudentId] = useState("");

  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [myRecorder, setMyRecorder] = useState(null);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(
    conversations.length - 1
  );

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const uploadFile = async (blob) => {
    console.log("request sent with this BLOBL", { blob });
    if (blob) {
      const fd = new FormData();

      fd.append("file", blob);

      const res = axios
        .post("http://localhost:5000/upload", fd)
        .then((res) => console.log({ res }));
    }
  };

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }

          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  function sendMessage(recipients, text) {
    socket.emit("send-message", { recipients, text });

    addMessageToConversation({ recipients, text, sender: userInfo?._id });
  }

  useEffect(() => {
    if (socket == null) return;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        if (currentStream) {
          setStream(currentStream);
          myVideo.current.srcObject = currentStream;
        }
      });

    const sessionID = socket.id;

    // getting the call_Accepted_signal

    if (socket?.id) {
      socket.emit("logged", {
        userId: userInfo?._id,
        socketId: sessionID,
      });

      setUserIdState({ userId: userInfo?._id, socketId: sessionID });
    }

    socket.on("callAccepted", () => {
      console.log({ stream }, "this is my streammmmmmmmmmmmm");

      setCallAccepted(true);
    });

    socket.on("call-accecpted-teacher", () => {
      setCallAcceptedOtherEnd(true);
    });

    socket.on("receive-message", addMessageToConversation);

    return () => socket.off("receive-message");
  }, [userInfo?._id, socket.id]);

  useEffect(() => {
    socket.on("callUser", ({ from, signal, userId, otherUserId }) => {
      setStudentId(otherUserId);
      setTeacherId(userId);
      setCall({ isReceivingCall: true, from, signal, userId, otherUserId });
    });
  }, [socket, studentId, teacherId]);

  useEffect(() => {
    console.log("useeffect of calls", { myRecorder, callEnded });
    if (myRecorder && callEnded == true) {
      myRecorder.stop();
    }
  }, [callEnded]);
  useEffect(() => {
    // socket.on("disconnect", () => {

    // });

    socket.on("callEnded", () => {
      if (myRecorder) myRecorder.stop();
      setCallEnded(true);
      const teacher = { id: userInfo?._id, from: null };
      // dispatch(updateTeacherAction(teacher));
    });

    return () => socket.off("callEnded");
  }, [dispatch, socket, userInfo?._id]);

  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
      const teacher = { id: userInfo?._id, from: null };

      dispatch(updateTeacherAction(teacher));
    }
  }, [dispatch, userInfo?._id]);

  function createConversation(recipients) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  function createContact(id, name) {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact?.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = userInfo?._id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const answerCall = () => {
    setCallAccepted(true);
    dispatch(callAcceptedAction);
    // setUserId(call.from)

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      // setCallAccepted(true);

      socket.emit("answerCall", {
        signal: data,
        to: call.from,
        from: userInfo?._id,
        callAccepted: true,
      });
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        if (currentStream) {
          setStream(currentStream);
          myVideo.current.srcObject = currentStream;
        }
      });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("answerCall", () => {
      setCallAccepted(true);
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: userInfo?._id,
      });
    });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        if (currentStream) {
          setStream(currentStream);
          const recorder = new MediaRecorder(currentStream);

          console.log({ recorder });

          const chunks = [];
          recorder.ondataavailable = (e) => chunks.push(e.data);
          recorder.onstop = (e) => {
            console.log({ chunkType: chunks[0].type });
            const blob = new Blob(chunks, { type: chunks[0].type });

            stream.getVideoTracks()[0].stop();

            const filename = "Shutah.mkv";

            // console.log(blob.stream().pipe(()))
            if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveBlob(blob, filename);
            } else {
              var elem = window.document.createElement("a");
              elem.href = window.URL.createObjectURL(blob);
              elem.download = filename;
              document.body.appendChild(elem);
              elem.click();
              document.body.removeChild(elem);
            }
            const file = new File([blob], "shutah.mkv", {
              type: chunks[0].type,
            });
            console.log({ uploaded: file });
            uploadFile(blob);
          };
          recorder.start();

          setMyRecorder(recorder);
          myVideo.current.srcObject = currentStream;

          return currentStream;
        }
      });
    socket.on("callAccepted", (signal) => {
      peer.on("stream", (currentStream) => {
        socket.emit("startRecording", signal);
        userVideo.current.srcObject = currentStream;
      });

      dispatch(callAcceptedAction);
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = (id) => {
    setCallEnded(true);
    connectionRef.current.destroy();

    const teacher = { id, from: null };

    dispatch(updateTeacherAction(teacher));

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
        setCallEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        userIdState,
        callAcceptedOtherEnd,
        conversations,
        createConversation,
        selectConversationIndex: setSelectedConversationIndex,
        sendMessage,
        selectedConversation: formattedConversations[selectedConversationIndex],
        contacts,
        createContact,
        setUserId,
        userId,
        studentId,
        teacherId,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}

export { ContextProvider, SocketContext };