import React from 'react';
import isToday from 'date-fns/isToday';
import format from 'date-fns/format';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import TodayIcon from '@material-ui/icons/Today';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'grid',
    justifyItems: 'center',
    minWidth: 90,
    maxWidth: 90,
    borderRadius: 25,
    textAlign: 'center',
    textTransform: 'uppercase',
    backgroundColor: selected => {
      return selected === true
        ? theme.palette.secondary.dark
        : theme.palette.secondary.main;
    },
    transform: 'scale(0.75)',
    '@media (min-width: 1800px)': {
      transform: 'scale(1)',
      // Prevent card from scaling with container
      height: 'fit-content',
    },
  },
  dayTitle: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  icon: {
    display: 'inline-block',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  dayOfMonth: {
    fontSize: '1.4rem',
    fontWeight: 700,
  },
}));

const DayCard = ({ date, selected, setSelectedDate }) => {
  const classes = useStyles(selected);

  const todayDate = new Date();
  const dayOfWeek = format(date, 'EEE');
  const dayOfMonth = format(date, 'd');

  const icon = isToday(date) ? (
    <TodayIcon />
  ) : date < todayDate ? (
    <EventAvailableIcon />
  ) : (
    <AddCircleIcon />
  );

  const handleClick = () => {
    setSelectedDate(date);
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography className={classes.dayTitle} variant="h6" component="h4">
            {dayOfWeek}
          </Typography>

          <Icon className={classes.icon}>{icon}</Icon>

          <Typography className={classes.dayOfMonth}>{dayOfMonth}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DayCard;
