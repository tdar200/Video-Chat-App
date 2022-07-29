import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherDetails } from "../actions/teacherActions";
import { useParams } from "react-router-dom";
import { Table, Container, Button } from "react-bootstrap";

import moment from "moment";

function Appointments() {
  const dispatch = useDispatch();
  const { id } = useParams();

  console.log(id, "params");

  const teacherDetail = useSelector((state) => state.teacherDetail);

  const { loading, teacher } = teacherDetail;

  //   const newValue =
  //     teacher?.appointments[0] &&
  //     new Date(teacher?.appointments[0]?.date).toLocaleDateString();

  //   console.log(newValue);

  useEffect(() => {
    dispatch(getTeacherDetails(id));
  }, [dispatch, id]);

  return (
    <Container>
      <Table responsive>
        <thead>
          <tr>
            <th>date</th>
            <th>time</th>
          </tr>
        </thead>
        <tbody>
          {teacher?.appointments.map((item, idx) => {
            return (
              <tr key={idx}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{new Date(item.date).toLocaleTimeString()}</td>
                <td>
                  <Button variant='success' disabled={true}>
                    Connect
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Appointments;
