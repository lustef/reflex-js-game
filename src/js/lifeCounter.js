import { infoSpan } from "./classes";

export class LifeCounter {
  constructor(parentNode) {
    this._lifes = 0;
    this._initialLifes = 0;

    //DOM
    this._parentNode = parentNode;
    this._timerContainer = null;
    this._timerSpan = null;

    this._mediator = null;
  }

  setMediator(mediator) {
    this._mediator = mediator;
  }

  setLifes(number) {
    this._lifes = number;
    this._initialLifes = number;
  }

  resetLifes() {
    this._lifes = this._initialLifes;
    this.bindLifesToSpan();
  }

  decreaseLifes() {
    this._lifes--;
    this.bindLifesToSpan();
    if (this._lifes == 0) {
      this._mediator.gameOver();
    }
  }

  bindLifesToSpan() {
    this._timerSpan.innerText = `Zostało: ${this._lifes} żyć`;
  }

  init() {
    this._timerContainer = document.createElement('div');
    this._timerContainer.classList.add('lifes-container')
    this._parentNode.appendChild(this._timerContainer);
    this._timerSpan = document.createElement('span');
    this._timerSpan.className += infoSpan;
    this.bindLifesToSpan();
    this._timerContainer.appendChild(this._timerSpan);
  }

}