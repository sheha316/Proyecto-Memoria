function getActualDate() {
  return new Date(new Date().toDateString());
}
function standarDate(date) {
  return new Date(date.toDateString());
}
export default {
  getActualDate,
  standarDate,
};
