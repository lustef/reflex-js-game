import { infoSpan, timeContainerClass } from "./classes";

export class TimeCounter {
  constructor(parentNode) {
    this._time = 60;
    this._interval = null;

    //DOM
    this._parentNode = parentNode;
    this._timerContainer = null;
    this._timerSpan = null;

    //patterns
    this._mediator = null;
  }

  //function to set mediator class
  setMediator(mediator) {
    this._mediator = mediator;
  }

  //update display text
  bindTimeToSpan() {
    this._timerSpan.innerText = `Pozostało: ${this._time}s`;
  }

  //starting the timer
  startTimer() {
    this._time--
    this._interval = setInterval(() => {
      this.bindTimeToSpan();
      this._time--;
      if (this._time < 0) {
        clearInterval(this._interval);
        this._mediator.gameOver();
      }
    }, 1000);
  }


  //reset timer
  resetTimer() {
    this._time = 60;
    this.bindTimeToSpan();
    clearInterval(this._interval);
  }
  
  //build DOM elements of this class
  init() {
    this._timerContainer = document.createElement('div');
    this._timerContainer.classList.add('time-container');

    this._parentNode.appendChild(this._timerContainer);
    this._timerSpan = document.createElement('span');
    this._timerSpan.className += infoSpan;

    this.bindTimeToSpan();
    this._timerContainer.appendChild(this._timerSpan);
  }
}