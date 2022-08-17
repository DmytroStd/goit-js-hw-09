import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
require("flatpickr/dist/themes/dark.css")

const startBtn = document.querySelector('button[data-start]');
const picker = document.querySelector('#datetime-picker');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const min = document.querySelector('span[data-minutes]');
const sec = document.querySelector('span[data-seconds]');
const timerBox = document.querySelector('.timer');

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.info('Please choose a date in the future');
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
    }
};
flatpickr(picker, options)
///////////////Для подсчета значений используй готовую функцию convertMs,
///////////////где ms - разница между конечной и текущей датой в миллисекундах.
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// function updatePicker({ days, hours, minutes, seconds }) {
//     picker.textContent = `${days}:${hours}:${minutes}:${seconds}`
// }

/// добавляет к числам с одним значением второе со значением 0 ///////
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

startBtn.addEventListener('click', startCoutdown);
    
function startCoutdown() {
        let timer = setInterval(() => {
            let countdown = new Date(picker.value) - new Date();
            startBtn.disabled = true;
            if (countdown >= 0) {
                let timeObject = convertMs(countdown);
                days.textContent = addLeadingZero(timeObject.days);
                hours.textContent = addLeadingZero(timeObject.hours);
                min.textContent = addLeadingZero(timeObject.minutes);
                sec.textContent = addLeadingZero(timeObject.seconds);
                if (countdown <= 3000) {
                    timerBox.style.color = 'red';
                }
            } else {
                Notiflix.Notify.warning('Countdown finished');
                clearInterval(timer);
                timerBox.style.color = 'black';
            }
        }, 1000)
    };
