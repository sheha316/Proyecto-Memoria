/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React from 'react';
import { Calendar } from 'react-multi-date-picker';
import Box from '@mui/material/Box';

function Calendario({ disableDates, fecha, setFecha }) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
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
  return (
    <Box sx={{ marginTop: 1 }}>
      <Calendar
        value={fecha}
        onChange={setFecha}
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
