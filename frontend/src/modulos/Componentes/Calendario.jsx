/* eslint-disable react/prop-types */
import React from 'react';
import { Calendar } from 'react-multi-date-picker';
import { Box } from '@mui/material/';
import '../../css/CalendarStyle.css';
import newDate from '../../utilities/newDate';

function Calendario({ agendasMedicos, fecha, setFecha }) {
  const now = newDate.getActualDate();
  const minDate = newDate.getActualDate();
  minDate.setDate(now.getDate() + 1);
  const maxDate = newDate.standarDate(new Date(minDate.getFullYear(), minDate.getMonth() + 5, 0));
  const weekDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const handleChange = (newValue) => {
    setFecha(
      newDate.standarDate(new Date(newValue)),
    );
  };
  const HayUnDoctorDisponible = (dateInDate) => {
    const DifferenceInTime = dateInDate.getTime() - minDate.getTime();
    const DifferenceInDays = Math.floor(DifferenceInTime / (1000 * 3600 * 24));
    for (let i = 0; i < agendasMedicos.Medicos.length; i++) {
      if (agendasMedicos.agendas[i][DifferenceInDays].disponible) {
        return true;
      }
    }
    return false;
  };
  const isDisableDate = (date) => {
    const dateInDate = newDate.standarDate(new Date(date));
    if (dateInDate.getTime() < minDate.getTime()) {
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
