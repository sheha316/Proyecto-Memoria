/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import Box from '@mui/material/Box';

function Calendario({ initialDate, disableDates }) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const weekDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const [value, setValue] = useState(new Date(2022, 3, 19));
  // new Date(date).getTime() === new Date(2022, 3, 18).getTime()
  const isDisableDate = (date) => {
    if ([0, 6].includes(date.weekDay.index)) {
      return {
        disabled: true,
      };
    }
  };
  return (
    <Box sx={{ marginTop: 1 }}>
      <Calendar
        value={value}
        onChange={setValue}
        weekDays={weekDays}
        months={months}
        minDate={minDate}
        weekStartDayIndex={1}
        numberOfMonths={2}
        mapDays={({ date }) => isDisableDate(date)}
      />
    </Box>
  );
}
export default Calendario;
