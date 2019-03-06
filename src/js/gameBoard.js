import { Box } from './box';

import { getRandomInt } from './util';

import { boxesContainerClass } from './classes';

export class GameBoard {
  constructor(parentNode) {
    this._numerofBoxes = 16;
    this._boxList = [];
    this._indexOfActive = null;

    //DOM
    this._parentNode = parentNode;
    this._boxesContainer = null;

    //functions
    this._boxesEvent = () => { };
    this._timeoutFunction = () => { };

    this._observer = null;
    this._mediator = null;
  }

  attachObserver(observer) {
    this._observer = observer;
  }

  notify() {
    this._observer.increasePoints();
  }

  setMediator(mediator) {
    this._mediator = mediator;
  }

  generateBoxes(parentNode) {
    for (let i = 0; i < this._numerofBoxes; i++) {
      const box = new Box(parentNode, i);
      this._boxList.push(box);
      box.init();
      box.setDisabled();
    }
  }

  enableBoxes() {
    this._boxList.forEach(box=>{
      box.setEnabled();
    })
  }

  disableBoxes() {
    this._boxList.forEach(box=>{
      box.setDisabled();
    })
  }

  continueGame() {
    this.clearBoard();
    this.setRandomActive();
  }

  handleClick(_target) {
    clearTimeout(this._timeoutFunction);
    if (this._indexOfActive !== null) {
      if (_target.dataset.id === this._indexOfActive.toString()) {
        this.notify();
        this.continueGame();
      } else {
        alert('straciłeś życie');
        this.continueGame();
        this._mediator.decreaseLife();
      }
    }
    else {
      alert('straciłeś życie');
      this.continueGame();
      this._mediator.decreaseLife();
    }
  }

  boxHandler(e) {
    if (e.target.tagName.toLowerCase() === 'div' && e.target.classList.contains('box')) {
      this.handleClick(e.target);
    }
  }

  clearEventsForBoxes() {
    this._boxesEvent = () => { };
  }

  addEventsForBoxes() {
    this._boxesEvent = this.boxHandler;
  }

  bindEventToBoxes() {
    this._boxesContainer.addEventListener('click', (e) => {
      this._boxesEvent(e);
    })
  }

  awaitForClick() {
    this._timeoutFunction = setTimeout(() => {
      this.continueGame();
      alert('straciłeś życie');
      this._mediator.decreaseLife();
    }, 2000);
  }

  setRandomActive() {
    const random = getRandomInt(0, this._numerofBoxes - 1);
    this._timeoutFunction = setTimeout(() => {
      this._indexOfActive = random;
      this._boxList[this._indexOfActive].setActive();
      this.awaitForClick();
    }, 3000);
  }

  clearBoard() {
    clearTimeout(this._timeoutFunction);
    if (this._indexOfActive !== null) {
      this._boxList[this._indexOfActive].setInactive();
      this._indexOfActive = null;
    }
  }

  init() {
    this._boxesContainer = document.createElement('div');
    this._boxesContainer.classList.add('boxes-container');
    this._boxesContainer.className += boxesContainerClass;

    this._parentNode.appendChild(this._boxesContainer);
    this.generateBoxes(this._boxesContainer);
    this.bindEventToBoxes();
  }
}