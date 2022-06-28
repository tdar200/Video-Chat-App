import React, { useEffect, useState, useMemo, useContext } from "react";
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

import data from "../MOCK_DATA.json";
import Options from "../component/Options";
import Notifications from "../component/Notifications";

function CreateQuery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("context in create query", useContext(SocketContext));

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
  } = useContext(SocketContext);

  // console.log("userIdState", userIdState)

  const [idToCall, setIdToCall] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const queryList = useSelector((state) => state.queryList);
  const { loading, queries, success: queriesSuccess } = queryList;

  const teacherList = useSelector((state) => state.teacherList);
  const { loading: teacherLoading, teachers } = teacherList;

  const roomCreate = useSelector((state) => state.roomCreate);
  const { room } = roomCreate;

  // console.log(roomCreate)

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (queries?.length === 0 && !loading && !queriesSuccess) {
      dispatch(listQueries());
    }
    if (teachers?.length === 0 && !teacherLoading && queries?.length > 0) {
      dispatch(listTeachers(queries[0].category));
      // dispatch(getAllTeachers(queries[0].category));
    }
  }, [
    dispatch,
    loading,
    queries,
    queriesSuccess,
    teacherLoading,
    teachers,
  ]);

  const handleDelete = () => {
    dispatch(deleteQuery(queries[0]._id));
    window.location.reload();
  };

  const handleClick = (id) => {
    // console.log("ID STATE", userIdState);
    // console.log("handle click is triggered", id);
    callUser(id);

    console.log("call accepted", callAccepted);

    // console.log((localStorageValue), "localStorage");

    // window.location.replace(`/rooms/${id}`);
  };

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
            <div className='d-flex justify-content-between'>
              <Button variant='danger' onClick={handleDelete}>
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
                              onClick={() => handleClick(item?.user?._id)}
                              variant='success'>
                              Connect
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

        <div className='d-flex justify-content-between'>
          <Button onClick={() => setShowModal(true)} variant='secondary'>
            Add Question
          </Button>

          <Button onClick={addCredit}>Add Credit</Button>
        </div>

        <ModalComponent
          setshowmodal={setShowModal}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      </Container>

      <Notifications />
    </>
  );
}

export default CreateQuery;
