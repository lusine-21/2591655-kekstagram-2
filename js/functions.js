/* eslint-disable no-console */
// 1 задание
function isLengthEqualOrLess(str, maxLenght) {

  return str.length <= maxLenght;
}

console.log(isLengthEqualOrLess('проверяемая строка', 20)); // true
console.log(isLengthEqualOrLess('проверяемая строка', 18)); // true
console.log(isLengthEqualOrLess('проверяемая строка', 10)); // false

// 2 задание
function isPalindrome(str) {
  const normalized = str.replaceAll(' ', '').toLowerCase();
  let reversedLine = '';
  for (let i = normalized.length - 1; i >= 0; i--) {
    reversedLine += normalized[i];
  }
  return normalized === reversedLine;
}

console.log(isPalindrome('топот')); // true
console.log(isPalindrome('ДовОд')); // true
console.log(isPalindrome('Кекс')); // false
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true

// 3 задание
function digitsToNumber(value) {
  const str = value.toString();
  let digits = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const digit = parseInt(char, 10);

    if (!Number.isNaN(digit)) {
      digits += digit;
    }
  }

  return parseInt(digits, 10);
}

console.log(digitsToNumber('2023 год')); // 2023
console.log(digitsToNumber('ECMAScript 2022')); // 2022
console.log(digitsToNumber('1 кефир, 0.5 батона')); // 105
console.log(digitsToNumber('агент 007')); // 7
console.log(digitsToNumber('а я томат')); // NaN
console.log(digitsToNumber(2023)); // 2023
console.log(digitsToNumber(-1)); // 1
console.log(digitsToNumber(1.5)); //15

//ЗАДАНИЕ 5.16
const canScheduleMeeting = (startWork, endWork, meetingStart, meetingDuration) => {
  const toMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const workStartMinutes = toMinutes(startWork);
  const workEndMinutes = toMinutes(endWork);
  const meetingStartMinutes = toMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return (
    meetingStartMinutes >= workStartMinutes &&
    meetingEndMinutes <= workEndMinutes
  );
};

console.log(canScheduleMeeting('08:00', '17:30', '14:00', 90)); // true
console.log(canScheduleMeeting('8:0', '10:0', '8:0', 120)); // true
console.log(canScheduleMeeting('08:00', '14:30', '14:00', 90)); // false
console.log(canScheduleMeeting('14:00', '17:30', '08:0', 90)); // false
console.log(canScheduleMeeting('8:00', '17:30', '08:00', 900)); // false
