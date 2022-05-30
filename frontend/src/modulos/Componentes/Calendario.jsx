/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
import {
  Box, FormLabel, Grid, Stack,
} from '@mui/material/';
import '../../css/CalendarStyle.css';
import Icon from 'react-multi-date-picker/components/icon';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import newDate from '../../utilities/newDate';
import { COLOR_BASE_1, COLOR_BASE_2, COLOR_BUTTON_2 } from '../../constantes';
import DatesHour from '../../utilities/Dates&Hour';

function Calendario({ agendasMedicos, fecha, setFecha }) {
  const [cursor, setCursor] = useState('crosshair');
  const now = newDate.getActualDate();
  const minDate = newDate.getActualDate();
  const [weekDaysofDateSelected, setweekDays] = useState([]);
  minDate.setDate(now.getDate() + 1);
  const theme = useTheme();
  const cellphone = useMediaQuery(theme.breakpoints.down('sm'));
  const maxDate = newDate.standarDate(new Date(minDate.getFullYear(), minDate.getMonth() + 3, 0));
  const weekDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  function addDaysToDate(_date, _noOfDays) {
    const aux = new Date(_date);
    return new Date(aux.setDate(aux.getDate() + _noOfDays));
  }
  function addDaysToSelectedDate(_date, _noOfDays) {
    const aux = new Date(_date);
    aux.setDate(aux.getDate() + _noOfDays);
    if (aux.getTime() < minDate.getTime()) {
      return minDate;
    } if (aux.getTime() > maxDate.getTime()) {
      return maxDate;
    }
    return aux;
  }
  function circleColors(disponible, seleccionado) {
    if (!disponible) {
      return 'gray';
    }
    if (seleccionado) {
      return COLOR_BUTTON_2;
    }
    return COLOR_BASE_2;
  }
  useEffect(() => {
    const weekday = fecha.getDay();
    const aux = [{}, {}, {}, {}, {}, {}];
    for (let i = 1; i < 7; i++) {
      if (i - weekday !== 0) {
        aux[i - 1] = addDaysToDate(fecha, i - weekday);
      } else {
        aux[i - 1] = fecha;
      }
    }
    setweekDays(aux);
  }, [fecha]);
  const handleChange = (newValue) => {
    setFecha(
      newDate.standarDate(new Date(newValue)),
    );
  };
  const HayUnDoctorDisponible = (dateInDate) => {
    if (dateInDate.getTime() < minDate.getTime()) {
      return false;
    }
    const DifferenceInTime = dateInDate.getTime() - minDate.getTime();
    const DifferenceInDays = Math.floor(DifferenceInTime / (1000 * 3600 * 24));
    for (let i = 0; i < agendasMedicos.length; i++) {
      if (agendasMedicos[i].agenda[DifferenceInDays].disponible) {
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
    if ([0, 6].includes(date.weekDay.index) || !HayUnDoctorDisponible(dateInDate)) {
      return {
        disabled: true,
      };
    }
    return {};
  };
  return (
    <Box sx={{
      backgroundColor: COLOR_BASE_1,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: 1 }}
      >
        <Grid item xs={cellphone ? 12 : 3} />
        <Grid item xs={cellphone ? 12 : 6} sx={{ textAlign: 'center' }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >

            <DatePicker
              render={(value, openCalendar) => (
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={openCalendar}>
                  <FormLabel sx={{
                    color: 'white', fontWeight: 'bold',
                  }}
                  >
                    {DatesHour.StringDateToDate(fecha.toISOString().split('T')[0])}
                  </FormLabel>
                  <Icon color="white" style={{ backgroundColor: COLOR_BASE_1, borderRadius: 8 }} />
                </Box>
              )}
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
          </Stack>
        </Grid>
        <Grid item xs={cellphone ? 12 : 3} />

        <Grid item xs={cellphone ? 12 : 2} />
        <Grid item xs={cellphone ? 12 : 1} />
        {weekDays.map((dia, index) => {
          if (index !== 0) {
            return (
              <Grid key={weekDays[(index)]} style={{ display: 'flex', justifyContent: 'center' }} item xs={cellphone ? 1.6 : 1}>
                <Box sx={{
                  padding: 1,
                  width: 20,
                  height: 20,
                }}
                >
                  <FormLabel sx={{ color: 'white', fontWeight: 'bold' }}>
                    {weekDays[(index)]}
                  </FormLabel>
                </Box>
              </Grid>

            );
          }
        })}
        <Grid item xs={cellphone ? 12 : 3} />
        <Grid item xs={cellphone ? 12 : 2} />
        <Grid style={{ display: 'flex', justifyContent: 'center' }} item xs={1}>
          <IconButton onClick={() => setFecha(addDaysToSelectedDate(fecha, -7))}>
            <ArrowBackIosNewIcon fontSize="large" sx={{ color: 'white' }} />
          </IconButton>
        </Grid>
        {weekDaysofDateSelected.length > 0 && weekDaysofDateSelected.map((dia) => {
          const colorCirculo = circleColors(
            HayUnDoctorDisponible(dia),
            newDate.standarDate(new Date(dia)).getTime() === fecha.getTime(),
          );
          return (
            <Grid key={dia.getDate()} style={{ display: 'flex', justifyContent: 'center' }} item xs={cellphone ? 1.6 : 1}>
              <Box
                onMouseEnter={() => { setCursor('pointer'); }}
                onClick={() => {
                  if (colorCirculo !== 'gray') {
                    setFecha(dia);
                  }
                }}
                sx={{
                  backgroundColor: colorCirculo,
                  padding: 1,
                  borderRadius: 5000,
                  width: 20,
                  height: 20,
                  cursor: colorCirculo !== 'gray' ? cursor : '',
                  textAlign: 'center',
                }}
              >
                <FormLabel
                  onMouseEnter={() => { setCursor('pointer'); }}
                  sx={{
                    color: 'white', fontWeight: 'bold', cursor: colorCirculo !== 'gray' ? cursor : '',
                  }}
                >
                  {dia.getDate()}
                </FormLabel>
              </Box>
            </Grid>
          );
        })}
        {weekDaysofDateSelected.length === 0 && <Grid item xs={cellphone ? 12 : 6} />}
        <Grid style={{ display: 'flex', justifyContent: 'center' }} item xs={1}>
          <IconButton onClick={() => setFecha(addDaysToSelectedDate(fecha, 7))}>
            <ArrowForwardIosIcon fontSize="large" sx={{ color: 'white' }} />
          </IconButton>
        </Grid>
        <Grid item xs={cellphone ? 12 : 2} />
      </Grid>
      <Box />
    </Box>
  );
}
export default Calendario;
