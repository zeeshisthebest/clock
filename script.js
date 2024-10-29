let updateIntervalId;

const app = () => {
  const UNIT_DEGREE = 6; // Degrees difference for each second/minute
  const HOUR_DEGREE = 30; // Degrees difference between each hour
  const OFFSET_DEGREE = 270;

  const minuteDial = document.getElementById("minutes");
  const secondDial = document.getElementById("seconds");
  const hourDial = document.getElementById("hours");
  const dateDiv = document.getElementById("date");
  const timeDiv = document.getElementById("time");
  const dayDiv = document.getElementById("day");

  // Insert minute markers
  function insertMinutes () {
    let minutesMarkup = '';
    for (let i = 0; i < 60; i++) {
      const angle = UNIT_DEGREE * i;
      const deg = `transform: rotate(${angle}deg)`;
      const dash = angle % 90 === 0 ? "&#8212;" : "&#8211;";
      minutesMarkup += `<div class="minute_arm" style="${deg}">
                          <div class="minute_content">
                            <span class="min">${String(i).padStart(2, '0')}</span>
                            <span class="min_mark">${dash}</span>
                          </div>
                        </div>`;
    }
    minuteDial.innerHTML = minutesMarkup;
  }

  // Insert second markers
  function insertSeconds () {
    let secondsMarkup = '';
    for (let i = 0; i < 60; i++) {
      const angle = UNIT_DEGREE * i;
      const deg = `transform: rotate(${angle}deg)`;
      secondsMarkup += `<div class="second_arm" style="${deg}">
                          <span class="second_content">${String(i).padStart(2, '0')}-</span>
                        </div>`;
    }
    secondDial.innerHTML = secondsMarkup;
  }

  // Insert hour markers
  function insertHours () {
    let hoursMarkup = '';
    for (let i = 1; i <= 12; i++) {
      const angle = HOUR_DEGREE * i;
      const deg = `transform: rotate(${angle}deg)`;
      hoursMarkup += `<div class="hour_arm" style="${deg}">
                        <span class="hour">${i}</span>
                      </div>`;
    }
    hourDial.innerHTML = hoursMarkup;
  }

  // Update clock hands and date/time display
  const timeRotate = () => {
    const date = new Date();
    const hour = date.getHours() % 12;
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const hrDegree = (hour * HOUR_DEGREE) + OFFSET_DEGREE;
    const minDegree = (minute * UNIT_DEGREE) + OFFSET_DEGREE;
    const secDegree = (second * UNIT_DEGREE) + OFFSET_DEGREE;

    hourDial.style.transform = `rotate(-${hrDegree}deg)`;
    minuteDial.style.transform = `rotate(-${minDegree}deg)`;
    secondDial.style.transform = `rotate(-${secDegree}deg)`;

    dateDiv.innerText = `${date.getDate()}, ${date.toLocaleDateString([], { month: "long" })}`;
    timeDiv.innerText = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    dayDiv.innerText = date.toLocaleDateString([], { weekday: "long" });
  }

  // Initial setup
  insertMinutes();
  insertSeconds();
  insertHours();
  timeRotate();

  // Start the clock update interval
  updateIntervalId = setInterval(timeRotate, 1000);
};

// Initialize app on DOM load
document.addEventListener("DOMContentLoaded", app);

// Clean up interval on page unload
window.onbeforeunload = () => {
  window.clearInterval(updateIntervalId);
};
