/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import PropTypes from 'prop-types';

function Calendario({ initialDate, disableDates }) {
  const weekDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const [value, setValue] = useState(new Date(2022, 3, 19));
  console.log(value);

  const isDisableDate = (date) => {
    console.log(new Date(date), new Date(2022, 3, 18), new Date(date) === new Date(2022, 3, 18));
    if (new Date(date).getTime() === new Date(2022, 3, 18).getTime()
    ) {
      console.log('weona que brutal');
      return {
        disabled: true,
      };
    }
    if ([0, 6].includes(date.weekDay.index)) {
      return {
        disabled: true,
      };
    }
  };
  return (
    <Calendar
      value={value}
      onChange={setValue}
      weekDays={weekDays}
      months={months}
      minDate={new Date()}
      weekStartDayIndex={1}
      mapDays={({ date }) => isDisableDate(date)}
    />
  );
}
export default Calendario;