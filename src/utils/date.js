import startOfISOWeek from 'date-fns/startOfISOWeek';
import addDays from 'date-fns/addDays';

export const getDatesOfCurrentWeek = () => {
  const firstDayOfWeek = startOfISOWeek(new Date());

  const currentWeek = Array.from(Array(7)).map((_, index) => {
    const date = addDays(firstDayOfWeek, index);
    return date;
  });

  return currentWeek;
};
