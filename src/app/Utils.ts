export const getDate = (day: number, month: number, year: number): Date => {
  const date = new Date();
  date.setFullYear(year, month - 1, day)
  return date;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const getMonthName = (month: number): string => {
  return months[month - 1];
}
