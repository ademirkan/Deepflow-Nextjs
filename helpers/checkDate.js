// returns if date is the same day as today
export function isDateToday(date) {
  const otherDate = new Date(date);
  const todayDate = new Date();

  return otherDate.getDate() === todayDate.getDate() &&
    otherDate.getMonth() === todayDate.getMonth() &&
    otherDate.getYear() === todayDate.getYear()
    ? true
    : false;
}
