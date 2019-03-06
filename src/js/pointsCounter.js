import { infoSpan } from "./classes";

export class PointsCounter {
  constructor(parentNode) {
    this._points = 0;

    //DOM
    this._parentNode = parentNode;
    this._pointsContainer = null;
    this._pointsSpan = null;

    this._mediator = null;
  }

  setMediator(mediator) {
    this._mediator = mediator;
  }

  bindPointsToSpan() {
    this._pointsSpan.innerText = `Zdobyłeś: ${this._points}pkt.`;
  }

  increasePoints() {
    this._points++;
    this.bindPointsToSpan();
  }

  clearPoints() {
    this._points = 0;
    this.bindPointsToSpan();
  }

  init() {
    this._pointsContainer = document.createElement('div');
    this._pointsContainer.classList.add('points-container')
    this._parentNode.appendChild(this._pointsContainer);
    this._pointsSpan = document.createElement('span');
    this._pointsSpan.className += infoSpan;

    this.bindPointsToSpan();
    this._pointsContainer.appendChild(this._pointsSpan);
  }
}