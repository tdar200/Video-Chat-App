import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';

function ScheduleAppointment() {
  const [dateValue, setDateValue] = useState(new Date('2018-01-01T00:00:00.000Z'));

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        label='Responsive'
        renderInput={(params) => <TextField {...params} />}
        value={dateValue}
        onChange={(newValue) => {
          setDateValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}

export default ScheduleAppointment;
