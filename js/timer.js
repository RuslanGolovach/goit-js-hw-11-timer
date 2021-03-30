const refs = {
  startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]'),
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  secs: document.querySelector('span[data-value="secs"]'),
};

class Timer {
  constructor({ onTick, targetDate, selector }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.init();
    this.clearTime();
    this.targetDate = targetDate.getTime();
    this.selector = selector;
  }
  clearTime() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }
  init() {
    this.clearTime();
  }
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);
      this.onTick(time);
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    this.clearTime();
  }
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  selector: '#timer-1',
  targetDate: new Date('Jul 25, 2021'),
  onTick: updateClockFace,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

function updateClockFace({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}
