import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.5.min.css';

let intervalId = null;
let selectedTime;

const refs = {
  start: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    const isPastTime = selectedTime < Date.now();

    if (isPastTime) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.start.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

refs.start.addEventListener('click', onStart);

function onStart() {
  refs.start.disabled = true;
  refs.input.disabled = true;
  refs.input.style.cursor = 'default';
  intervalId = setInterval(() => {
    if (selectedTime - Date.now() <= 0) {
      clearInterval(intervalId);
      return;
    }
    const timeElements = convertMs(selectedTime - Date.now());
    updateOutput(timeElements);
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateOutput({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
