const dayjs = require("dayjs");

module.exports = function(date, format = "MMMM D, YYYY") {
  return dayjs(date).format(format);
};
