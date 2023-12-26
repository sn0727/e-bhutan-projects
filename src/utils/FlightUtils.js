import moment from "moment";

// Calculate hours and minutes
export function ConvertToTime(number) {
  var hours = Math.floor(number / 60);
  var minutes = number % 60;
  var timeString = hours + "h " + minutes + "m";
  return timeString;
}

// filterTime
export function filterTime(time) {
  // Parse the date and time using Moment.js
  const startdateTime = moment(time);
  // Format to display only the time in 12-hour format
  const startformattedTime = startdateTime.format('h:mm A');
  return startformattedTime; // Output: 4:13 PM
}

export function durationWithTwoTime(a, b) {
  const arrivalTime = new Date(a);
  const departureTime = new Date(b);

  // Calculate the difference in milliseconds
  const durationMs = arrivalTime.getTime() - departureTime.getTime();
  // Convert milliseconds to hours and minutes
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  var timeString = hours + "h " + minutes + "m";
  return timeString

}


export function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
  }
  return age;
}