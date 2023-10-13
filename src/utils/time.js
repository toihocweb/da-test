// 2023-10-13T12:24
const timeToRow = (start, end) => {
  const [_, time] = start.split("T");
  const [hour, minute] = time.split(":");
  const row = Math.round(12 * parseInt(hour) + parseInt(minute) / 5) + 2;

  const [__, endTime] = end.split("T");
  const [endHour, endMinute] = endTime.split(":");
  const endRow =
    Math.round(12 * parseInt(endHour) + parseInt(endMinute) / 5) + 2;

  const span = endRow - row;
  return {
    row,
    span,
  };
};

// 2023-10-13T12:24 -> 12:24
const getTime = (date) => {
  const [_, time] = date.split("T");
  return time;
};

// 2023-10-13T12:24 -> 2023-10-13
const getDate = (date) => {
  const [d, _] = date.split("T");
  return d;
};

export { timeToRow, getTime, getDate };
