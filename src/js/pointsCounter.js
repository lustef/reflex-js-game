import { infoSpan, pointsContainerClass } from "./classes";

//this class is observer of gameboard
export class PointsCounter {
  constructor(parentNode) {
    this._points = 0;

    //DOM
    this._parentNode = parentNode;
    this._pointsContainer = null;
    this._pointsSpan = null;

    //patterns
    this._mediator = null;
  }

  //function to set mediator class
  setMediator(mediator) {
    this._mediator = mediator;
  }

  //update display text
  bindPointsToSpan() {
    this._pointsSpan.innerText = `Zdobyłeś: ${this._points}pkt.`;
  }

  //increase points
  increasePoints() {
    this._points++;
    this.bindPointsToSpan();
  }

  //reset points
  clearPoints() {
    this._points = 0;
    this.bindPointsToSpan();
  }

  //build DOM elements of this class
  init() {
    this._pointsContainer = document.createElement('div');
    this._pointsContainer.classList.add('points-container');

    this._parentNode.appendChild(this._pointsContainer);
    this._pointsSpan = document.createElement('span');
    this._pointsSpan.className += infoSpan;

    this.bindPointsToSpan();
    this._pointsContainer.appendChild(this._pointsSpan);
  }
}