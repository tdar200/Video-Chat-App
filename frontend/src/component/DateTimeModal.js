import React from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import ScheduleAppointment from "./ScheduleAppointment";

function DateTimeModal(props) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Schedule an Appointment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ScheduleAppointment}
      </Modal.Body>
    </Modal>
  );
}

export default DateTimeModal;
