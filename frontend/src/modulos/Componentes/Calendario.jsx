/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
import {
  Box, FormLabel, Grid, Stack, Button,
} from '@mui/material/';
import '../../css/CalendarStyle.css';
import Icon from 'react-multi-date-picker/components/icon';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import newDate from '../../utilities/newDate';
import { primary, secondary, success } from '../../constantes';
import DatesHour from '../../utilities/Dates&Hour';
import BasicPopover from './BasicPopover';

function circleColors(disponible, seleccionado) {
  if (!disponible) {
    return 'gray';
  }
  if (seleccionado) {
    return success;
  }
  return secondary;
}
const HayUnDoctorDisponible = (dateInDate, minDate, maxDate, agendasMedicos) => {
  if (dateInDate.getTime() < minDate.getTime() || dateInDate.getTime() > maxDate.getTime()) {
    return false;
  }
  const date = newDate.getActualDate();
  date.setDate(date.getDate() + 1);
  const DifferenceInTime = dateInDate.getTime() - date.getTime();
  const DifferenceInDays = Math.floor(DifferenceInTime / (1000 * 3600 * 24));
  for (let i = 0; i < agendasMedicos.length; i++) {
    if (agendasMedicos[i].agenda[DifferenceInDays].disponible) {
      return true;
    }
  }
  return false;
};
function WEEKLESELECTOR(
  cellphone,
  fecha,
  addDaysToSelectedDate,
  setFecha,
  weekDaysofDateSelected,
  weekDays,
  setCursor,
  cursor,
  minDate,
  maxDate,
  agendasMedicos,
) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={cellphone ? 2 : 10}
    >
      <IconButton onClick={() => setFecha(addDaysToSelectedDate(fecha, -7))}>
        <ArrowBackIosNewIcon fontSize="large" sx={{ color: 'white' }} />
      </IconButton>
      {weekDaysofDateSelected.length > 0 && weekDays.map((dia, index) => {
        if (index !== 0) {
          const colorCirculo = circleColors(
            HayUnDoctorDisponible(
              weekDaysofDateSelected[index - 1],
              minDate,
              maxDate,
              agendasMedicos,
            ),
            newDate.standarDate(
              new Date(weekDaysofDateSelected[index - 1]),
            ).getTime() === fecha.getTime(),
          );
          return (
            <Stack
              key={weekDays[(index)]}
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
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
              <Box
                onMouseEnter={() => { setCursor('pointer'); }}
                onClick={() => {
                  if (colorCirculo !== 'gray') {
                    setFecha(weekDaysofDateSelected[index - 1]);
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
                  {weekDaysofDateSelected[index - 1].getDate()}
                </FormLabel>
              </Box>
            </Stack>
          );
        }
      })}
      <IconButton onClick={() => setFecha(addDaysToSelectedDate(fecha, 7))}>
        <ArrowForwardIosIcon fontSize="large" sx={{ color: 'white' }} />
      </IconButton>
    </Stack>
  );
}
function Calendario({
  agendasMedicos,
  fecha, optionsSucursales, setFecha, FirstDay, LastDay, sucursalSeleccionada, TODASLASSUCURSALES,
}) {
  const [cursor, setCursor] = useState('crosshair');
  const minDate = FirstDay;
  const maxDate = LastDay;
  const [weekDaysofDateSelected, setweekDays] = useState([]);
  const theme = useTheme();
  const cellphone = useMediaQuery(theme.breakpoints.down('sm'));
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

  const isDisableDate = (date) => {
    const dateInDate = newDate.standarDate(new Date(date));
    if (dateInDate.getTime() < minDate.getTime()) {
      return {};
    }
    if ([0, 6].includes(date.weekDay.index)
    || !HayUnDoctorDisponible(dateInDate, minDate, maxDate, agendasMedicos)) {
      return {
        disabled: true,
      };
    }
    return {};
  };
  return (

    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      sx={{
        backgroundColor: primary,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        p: 1,
      }}
    >
      <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 1 }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            alignSelf={cellphone ? 'flex-end' : ''}
            spacing={5}
          >
            <DatePicker
              className="custom-calendar"
              render={(value, openCalendar) => (
                <Button
                  onMouseEnter={() => { setCursor('pointer'); }}
                  variant="outlined"
                  color="secondary"
                  style={{
                    color: 'white', fontWeight: 'bold', whiteSpace: 'break-spaces', border: 'solid', borderColor: secondary,
                  }}
                  onClick={openCalendar}
                >
                  <Icon color="white" />
                  {' '}
                  Fecha:
                  {' '}
                  <span>
                    {' '}
                    {' '}
                    {DatesHour.StringDateToDate(fecha.toISOString().split('T')[0])}
                  </span>

                </Button>
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
            {TODASLASSUCURSALES !== undefined && (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={0}
              >
                <BasicPopover
                  sucursalSeleccionada={sucursalSeleccionada}
                  TODASLASSUCURSALES={TODASLASSUCURSALES}
                  optionsSucursales={optionsSucursales}
                />
              </Stack>
            </Stack>
            )}
          </Stack>
          { WEEKLESELECTOR(
            cellphone,
            fecha,
            addDaysToSelectedDate,
            setFecha,
            weekDaysofDateSelected,
            weekDays,
            setCursor,
            cursor,
            minDate,
            maxDate,
            agendasMedicos,
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
export default Calendario;
