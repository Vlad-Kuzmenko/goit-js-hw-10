import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0].toISOString());
      const currentDay = new Date();
      
      if (selectedDates[0].toISOString() < currentDay.toISOString()) {
          iziToast.show({
            title: '⮾',
            titleSize: '48',
            color: 'red',
            position: 'topRight',
            message: 'Please choose a date in the future'
        });
          btn.disabled = true;
      } else if (selectedDates[0].toISOString() > currentDay.toISOString()) { 
          btn.disabled = false;
          userSelectedDate = selectedDates[0];
      }
  },
};

const selector = document.querySelector("#datetime-picker");
const btn = document.querySelector("button");
const timer = document.querySelector(".timer");

btn.disabled = true;

flatpickr(selector, options);

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

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function tick() {
    btn.disabled = true;
    selector.disabled = true;

    const showTimer = setInterval(() => {
        let interval = userSelectedDate - new Date();
        const convertDay = convertMs(interval);


        timer.children[0].children[0].textContent = addLeadingZero(convertDay.days);      
        timer.children[1].children[0].textContent = addLeadingZero(convertDay.hours);        
        timer.children[2].children[0].textContent = addLeadingZero(convertDay.minutes);        
        timer.children[3].children[0].textContent = addLeadingZero(convertDay.seconds);        

        if (interval <= 1000) {
            clearInterval(showTimer);
            selector.disabled = false;
        }
    }, 1000)
    
}

btn.addEventListener('click', tick);

