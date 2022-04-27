/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import { Box } from '@mui/material/';
import './CalendarStyle.css';

function Calendario({ agendasMedicos, fecha, setFecha }) {
  const now = new Date();
  console.log(now);
  console.log(now.toISOString());
  const minDate = new Date();
  minDate.setDate(now.getDate() + 1);
  const maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 5, 0);

  const weekDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  let Dia = -1;
  // new Date(date).getTime() === new Date(2022, 3, 18).getTime()
  const isDisableDate = (date) => {
    // console.log(new Date(date).toISOString().split('T')[0]);
    if (new Date(date).getTime() < new Date().getTime()) {
      return {};
    }
    if ([0, 6].includes(date.weekDay.index)) {
      return {
        disabled: true,
      };
    }
    Dia += 1;
    console.log(Dia);
    for (let i = 0; i < agendasMedicos.Medicos.length; i++) {
      if (agendasMedicos.agendas[i][Dia].disponible) {
        return {};
      }
    }

    return {
      disabled: true,
    };
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
