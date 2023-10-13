import moment from "moment";

// generate dates in a week
const generateDates = (next = 0) => {
  const dates = [];
  const startDate = moment().add(next, "weeks").startOf("week");
  for (let i = 0; i < 7; i++) {
    dates.push({
      date: moment(startDate).add(i, "days").format("D"),
      fullDate: moment(startDate).add(i, "days").format("YYYY-MM-DD"),
      isToday: moment().isSame(moment(startDate).add(i, "days"), "day"),
      day: moment(startDate).add(i, "days").format("ddd"),
    });
  }
  return dates;
};

// January 2020
const currentMonth = () => {
  return moment().format("MMMM YYYY");
};

export { generateDates, currentMonth };
