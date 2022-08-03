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
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(
    conversations.length - 1
  );

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

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
    // console.log("recipients from contec", recipients);
    socket.emit("send-message", { recipients, text });

    addMessageToConversation({ recipients, text, sender: userInfo?._id });
  }

  // console.log("user ID FROM Context", userId)

  useEffect(() => {
    if (socket == null) return;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        if (currentStream) {
          // console.log("stream from context", currentStream);
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
      // console.log("first call accepted");
      setCallAccepted(true);
    });

    socket.on("call-accecpted-teacher", () => {
      // console.log("accepted the call aand connection established");
      setCallAcceptedOtherEnd(true);
    });

    socket.on("receive-message", addMessageToConversation);

    return () => socket.off("receive-message");
  }, [userInfo?._id, socket.id]);

  useEffect(() => {
    socket.on("callUser", ({ from, signal, userId, otherUserId }) => {
      setStudentId(otherUserId);
      setTeacherId(userId);
      console.log("context", { otherUserId, userId, studentId, teacherId });
      setCall({ isReceivingCall: true, from, signal, userId, otherUserId });
    });
  }, [socket, studentId, teacherId]);

  useEffect(() => {
    // socket.on("disconnect", () => {

    // });

    socket.on("callEnded", () => {
      setCallEnded(true);
      const teacher = { id: userInfo?._id, from: null };
      leaveCall()
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
      const name = (contact && contact.name) || recipient;
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
    // console.log("callWas accccpected");
    setCallAccepted(true);
    dispatch(callAcceptedAction);
    // setUserId(call.from)

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      // setCallAccepted(true);

      // console.log(data, "data from context")
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
          // console.log("stream from context", currentStream);
          setStream(currentStream);
          myVideo.current.srcObject = currentStream;
        }
      });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("answerCall", () => {
      // console.log("accepted ma ");
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

    socket.on("callAccepted", (signal) => {
      // console.log("this function is triggerd 2");

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          if (currentStream) {
            // console.log("stream from context", currentStream);
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
          }
        });

      peer.on("stream", (currentStream) => {
        userVideo.current.srcObject = currentStream;
      });

      dispatch(callAcceptedAction);
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = (id) => {

    // socket.emit("disconnect")

    setCallEnded(true);
    connectionRef?.current?.destroy();

    // const teacher = { id, from: null };

    // dispatch(updateTeacherAction(teacher));

    // window.location.reload();
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
      }}>
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
