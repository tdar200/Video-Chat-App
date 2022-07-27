import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback,
} from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuery, listQueries } from "../actions/queryActions";
import { getAllTeachers } from "../actions/userActions";
import { listTeachers } from "../actions/teacherActions";
import { studentUpdate } from "../actions/studentActions";
import { createRoom } from "../actions/roomActions";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../component/ModalComponent";
import { SocketContext } from "../Context";
import { getTeacherDetails } from "../actions/teacherActions";
import Sidebar from "../component/Sidebar";

import data from "../MOCK_DATA.json";
import Options from "../component/Options";
import Notifications from "../component/Notifications";
import VideoPlayer from "../component/VideoPlayer";
import OpenConversation from "../component/OpenConversation";
import QueryDetailsPage from "./QueryDetailsPage";
import DateTimeModal from "../component/DateTimeModal";

function CreateQuery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("context in create query", useContext(SocketContext));

  const {
    me,
    name,
    setName,
    leaveCall,
    callUser,
    callEnded,
    answerCall,
    call,
    userIdState,
    stream,
    callAccepted,
    callAcceptedOtherEnd,
    selectedConversation,
    myVideo,
    setUserId,
    setCallEnded,
    createContact,
    createConversation,
  } = useContext(SocketContext);

  // console.log(useContext(SocketContext), "context front");

  // console.log("userIdState", userIdState);

  const [idToCall, setIdToCall] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  console.log(userInfo);

  const queryList = useSelector((state) => state.queryList);
  const { loading, queries, success: queriesSuccess } = queryList;

  const teacherList = useSelector((state) => state.teacherList);
  const { loading: teachersLoading, teachers } = teacherList;

  const roomCreate = useSelector((state) => state.roomCreate);
  const { room } = roomCreate;

  const teacherDetail = useSelector((state) => state.teacherDetail);
  const { loading: teacherLoading, teacher } = teacherDetail;

  const [showModal, setShowModal] = useState(false);
  const [dateTimeModal, setDateTimeModal] = useState(false);

  useEffect(() => {
    if (queries?.length === 0 && !loading && !queriesSuccess) {
      dispatch(listQueries());
    }
    if (teachers?.length === 0 && !teachersLoading && queries?.length > 0) {
      dispatch(listTeachers(queries[0].category));
      // dispatch(getAllTeachers(queries[0].category));
    }
  }, [
    dispatch,
    loading,
    queries,
    queriesSuccess,
    teachersLoading,
    teachers,
    callAccepted,
    callAcceptedOtherEnd,
  ]);

  useEffect(() => {
    if (idToCall && !teacher && teacherLoading) {
      dispatch(getTeacherDetails(idToCall));
    }
  }, [dispatch, idToCall, teacher, teacherLoading]);

  useEffect(() => {
    if (idToCall && callAccepted) {
      navigate(`/rooms/${idToCall}`);
    }
  }, [idToCall, callAccepted, navigate]);

  // useEffect(() => {
  //   if (performance.getEntriesByType("navigation")[0].type === "reload") {
  //     console.log("This page is reloaded");
  //   } else {
  //     console.log("This page is not reloaded");
  //   }
  // }, []);

  const handleDelete = () => {
    dispatch(deleteQuery(queries[0]._id));
    window.location.reload();
  };

  const handleClick = (id, name) => {
    setUserId(id);
    callUser(id);
    createContact(id, name);
    createConversation([id]);
    setIdToCall(id);
  };

  const handleDateTimePicker = (id) => {};

  useEffect(() => {
    if (!callAccepted) {
      return;
    } else {
      navigate(`/rooms/${idToCall}`);
    }
  }, [callAccepted, idToCall, navigate, setCallEnded, teacher?.call_connected]);

  const addCredit = () => {
    const student = {
      id: userInfo._id,
      credit: 100,
    };

    dispatch(studentUpdate(student));

    window.location.reload();
  };

  return (
    <>
      <Container>
        {queries?.length > 0 && teachers?.length > 0 ? (
          <div>
            <h1>Question : {queries[0].query}</h1>
            <div className="d-flex justify-content-between">
              <Button variant="danger" onClick={handleDelete}>
                {" "}
                Delete{" "}
              </Button>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Hourly Rate</th>

                  <th></th>
                  <th></th>
                </tr>
              </thead>
              {
                <tbody>
                  {teachers &&
                    teachers.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item?.user?._id}</td>
                          <td>{item?.user?.name}</td>
                          <td>{item?.gender}</td>
                          <td>{item?.user?.email}</td>
                          <td>{item?.hourly_rate}</td>
                          <td>
                            <Button
                              onClick={() =>
                                handleClick(item?.user?._id, item?.user?.name)
                              }
                              variant="success"
                            >
                              Connect
                            </Button>
                          </td>
                          <td>
                            <Button
                              onClick={() => setDateTimeModal(true)}
                              variant="success"
                            >
                              Schedule an Appointment
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              }
            </Table>
          </div>
        ) : null}

        <div className="d-flex justify-content-between">
          <Button onClick={() => setShowModal(true)} variant="secondary">
            Add Question
          </Button>
          <Button onClick={addCredit}>Add Credit</Button>
        </div>

        <DateTimeModal
          setshowmodal={setDateTimeModal}
          show={dateTimeModal}
          onHide={() => setDateTimeModal(false)}
        />

        <ModalComponent
          setshowmodal={setShowModal}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      </Container>

      {/* <div className='d-flex'>
        <Sidebar id={userInfo?._id} />
        {selectedConversation && <OpenConversation />}
      </div> */}
    </>
  );
}

export default CreateQuery;
