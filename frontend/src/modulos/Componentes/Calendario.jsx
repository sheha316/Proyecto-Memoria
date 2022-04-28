/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import { Box } from '@mui/material/';
import './CalendarStyle.css';

function Calendario({ agendasMedicos, fecha, setFecha }) {
  const now = new Date();
  const minDate = new Date();
  minDate.setDate(now.getDate() + 1);
  const maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 5, 0);
  const weekDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const handleChange = (newValue) => {
    setFecha(new Date(newValue));
  };
  const HayUnDoctorDisponible = (dateInDate) => {
    const DifferenceInTime = dateInDate.getTime() - now.getTime();
    const DifferenceInDays = Math.floor(DifferenceInTime / (1000 * 3600 * 24));
    for (let i = 0; i < agendasMedicos.Medicos.length; i++) {
      if (agendasMedicos.agendas[i][DifferenceInDays].disponible) {
        return true;
      }
    }
    return false;
  };
  const isDisableDate = (date) => {
    const dateInDate = new Date(date);
    if (dateInDate.getTime() < new Date().getTime()) {
      return {};
    }
    if ([0, 6].includes(date.weekDay.index)
     || !HayUnDoctorDisponible(dateInDate)) {
      return {
        disabled: true,
      };
    }
    return {};
  };

  return (
    <Box sx={{ marginTop: 1 }}>
      <Calendar
        value={fecha}
        onChange={handleChange}
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
