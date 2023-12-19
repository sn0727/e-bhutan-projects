// Calculate hours and minutes
export function ConvertToTime(number) {
  var hours = Math.floor(number / 60);
  var minutes = number % 60;
  var timeString = hours + "h " + minutes + "m";
  return timeString;
}