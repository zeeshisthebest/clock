const app = () => {
  const unit_degree = 6; // 6 degree difference for each second / minutes
  const hour_degree = 30; // difference between each hour
  const second_hand = document.getElementById("second_hand");
  const minute_hand = document.getElementById("minute_hand");
  const hour_hand = document.getElementById("hour_hand");
  const digital_time1 = document.getElementById("digital");
  const digital_time2 = document.getElementById("digital2");
  let hour, minute, second, hr_degree, sec_degree, min_degree;

  function adjustFont() {
    let ids = document.querySelectorAll('.font');
    ids.forEach(element => {
        element.style.fontSize = `${0.1 * element.offsetHeight}px`;
    });
  }

  // Start
  let udpateTime = () => {
    setTimeout(() => {
      let date = new Date();
      hour = date.toLocaleString("en-US", { hour: "numeric", hour12: true });
      hour = hour.slice(0, hour.length - 2);
      minute = date.getMinutes();
      second = date.getSeconds();

      hr_degree = hour === "12" ? 0 : hour * hour_degree;
      // Plays chime on hour
      if (minute === 0 && second === 0) {
        new Audio("sounds/hour_chime.mp3").play();
      }
      sec_degree = second * unit_degree + 2;
      min_degree = (minute) * unit_degree;

      second_hand.style.transform = `rotate(${sec_degree}deg)`;
      hour_hand.style.transform = `rotate(${hr_degree}deg)`;
      minute_hand.style.transform = `rotate(${min_degree}deg)`;
      setTimeout(() => {
        second_hand.style.transform = `rotate(${sec_degree-2}deg)`;
      }, 100);
      digital_time1.innerHTML = date.toLocaleString("en-US", { hour: "numeric",minute:"numeric", hour12: true });
      digital_time2.innerHTML = date.toLocaleString("en-US", { hour: "numeric",minute:"numeric", hour12: false });
      // new Audio("sounds/second_chime.mp3").play();
      udpateTime();
    }, 1000);
  };

  adjustFont();
  udpateTime();
};

document.addEventListener("DOMContentLoaded", function () {
  app();
});
