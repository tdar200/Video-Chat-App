import React, { useState } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function DateTimeModal(props) {
  const [dateValue, setDateValue] = useState(moment());

  const { scheduleAppointmentId} = props;

  const handleDateTimePicker = (e) => {

    e.preventDefault();
    console.log(dateValue, "date Value")

    const teacher = {
      id :scheduleAppointmentId,
      date: "",
      time: ""
      
    }


  };

  

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Schedule an Appointment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleDateTimePicker }>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              label="Pick Date and Time"
              renderInput={(params) => <TextField {...params} />}
              value={dateValue}
              onChange={(newValue) => {
                setDateValue(newValue);
              }}
            />
          </LocalizationProvider>

          <Button type="submit" className="float-end">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default DateTimeModal;
