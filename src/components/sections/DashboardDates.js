import React from 'react';
import isSameDay from 'date-fns/isSameDay';
import format from 'date-fns/format';
import startOfISOWeek from 'date-fns/startOfISOWeek';
import endOfISOWeek from 'date-fns/endOfISOWeek';

import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import DayCard from 'components/DayCard';

import { getDatesOfCurrentWeek } from 'utils/date';

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'auto',
    height: 'fit-content',
    '@media (min-width: 1628px)': {
      overflow: 'initial',
    },
  },
  datesContainer: {
    display: 'flex',
    gridGap: theme.spacing(3),
  },
}));

const DashboardDates = ({ selectedDate, setSelectedDate }) => {
  const classes = useStyles();

  const firstDayOfWeek = startOfISOWeek(new Date());
  const lastDayOfWeek = endOfISOWeek(new Date());

  return (
    <div className={classes.root}>
      <Box component="header" mb={2}>
        <Typography variant="h5" component="h3">
          {format(selectedDate, 'EEEE, LLLL d')}
        </Typography>
        <Typography variant="body1" component="span">
          {format(firstDayOfWeek, 'LLL d')} - {format(lastDayOfWeek, 'LLL d')}
        </Typography>
      </Box>

      <div className={classes.datesContainer}>
        {getDatesOfCurrentWeek().map(date => (
          <DayCard
            key={date}
            date={date}
            selected={isSameDay(date, selectedDate)}
            setSelectedDate={setSelectedDate}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardDates;
