import Moment from "moment";

export const DATE_LITERALS = {
  TODAY: "Today",
  TOMORROW: "Tomorrow",
  MMDDYYYY: "MM/DD/YYYY",
};

export const toDateString = (value: number): string => {
  const dt = new Date(value);
  dt.setHours(0, 0, 0, 0);

  let today: Date = new Date();
  today.setHours(0, 0, 0, 0);

  if (dt.getTime() === today.getTime()) {
    return DATE_LITERALS.TODAY;
  }

  let tomorrow: Date = addDays(new Date(), 1);
  tomorrow.setHours(0, 0, 0, 0);

  if (dt.getTime() === tomorrow.getTime()) {
    return DATE_LITERALS.TOMORROW;
  }

  return Moment(dt).format(DATE_LITERALS.MMDDYYYY);
};

export const formatDate = (dt: Date, format: string): string => {
  return Moment(dt).format(format);
};

export const toTimeString = (dt: Date): string => {
  return Moment(dt).format("LT");
};

export const addDays = (day: Date, days: number): Date => {
  let newDate = new Date(day);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};
