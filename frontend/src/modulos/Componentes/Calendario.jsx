/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import { Box, TextField } from '@mui/material/';
import './CalendarStyle.css';

function Calendario({ disableDates, fecha, setFecha }) {
  const now = new Date();
  const minDate = new Date();
  minDate.setDate(now.getDate() + 1);
  const maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 5, 0);

  const weekDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // new Date(date).getTime() === new Date(2022, 3, 18).getTime()
  const isDisableDate = (date) => {
    if (new Date(date).getTime() < new Date().getTime()) {
      return;
    }
    if ([0, 6].includes(date.weekDay.index)) {
      return {
        disabled: true,
      };
    }
  };
  console.log(minDate);
  console.log(maxDate);
  const [value, setValue] = useState(
    new Date('2014-08-18T21:11:54'),
  );

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ marginTop: 1 }}>
      <Calendar
        value={fecha}
        onChange={setFecha}
        weekDays={weekDays}
        months={months}
        minDate={minDate}
        maxDate={maxDate}
        disableYearPicker
        weekStartDayIndex={1}
        numberOfMonths={1}
        mapDays={({ date }) => isDisableDate(date)}
      />
    </Box>
  );
}
export default Calendario;
