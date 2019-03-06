import { Box } from './box';

import { getRandomInt } from './util';

import { boxesContainerClass } from './classes';

export class GameBoard {
  constructor(parentNode) {
    this._sizeOfSide = 0;
    this._numerofBoxes = 0;
    this._boxList = [];
    this._indexOfActive = null;

    //DOM
    this._parentNode = parentNode;
    this._boxesContainer = null;

    //functions
    this._boxesEvent = () => { };
    this._timeoutFunction = () => { };

    //patterns
    this._observer = null;
    this._mediator = null;
  }

  //adding obserwer
  attachObserver(observer) {
    this._observer = observer;
  }

  //function to notify to observer
  notify() {
    this._observer.increasePoints();
  }

  //function to set mediator class
  setMediator(mediator) {
    this._mediator = mediator;
  }

  //setting boxes
  setSizeOfSide(_number) {
    this._sizeOfSide = _number;
    this._numerofBoxes = _number * _number;
  }

  //function for generating boxes
  generateBoxes(parentNode) {
    for (let i = 0; i < this._numerofBoxes; i++) {
      const box = new Box(parentNode, i);
      this._boxList.push(box);
      box.init();
      const width = 100 / this._sizeOfSide;
      box.setCSSWidth(width);
      box.setDisabled();
    }
  }

  //function which set boxes into enabled view
  enableBoxes() {
    this._boxList.forEach(box => {
      box.setEnabled();
    })
  }

  //function which set boxes into disabled view
  disableBoxes() {
    this._boxList.forEach(box => {
      box.setDisabled();
    })
  }

  //function for reset awaiting for click and continue game
  continueGame() {
    this.clearBoard();
    this.setRandomActive();
  }

  //function to check what resultat should be
  checkClick(_target) {
    if (this._indexOfActive !== null) {
      if (_target.dataset.id === this._indexOfActive.toString()) {
        return 'CLICK_SUCCES';
      } else {
        alert('straciłeś życie');
        return 'CLICK_FAIL'
      }
    }
    else {
      alert('straciłeś życie');
      return 'CLICK_FAIL'
    }
  }

  //function to execute function based on result of click
  executeFunctionByResult(_result) {
    switch (_result) {
      case 'CLICK_SUCCES':
        this.notify();
        break;
      case 'CLICK_FAIL':
        this._mediator.decreaseLife();
        break;
    }
  }

  //function handling efect of click on box
  handleClick(_target) {
    clearTimeout(this._timeoutFunction);
    const result = this.checkClick(_target);
    this.continueGame();
    this.executeFunctionByResult(result);
  }

  //function to set to eventListener of boxes by addEventsForBoxes function
  boxHandler(e) {
    if (e.target.tagName.toLowerCase() === 'div' && e.target.classList.contains('box')) {
      this.handleClick(e.target);
    }
  }

  //function which set empty function which will be add to eventListener of boxes
  clearEventsForBoxes() {
    this._boxesEvent = () => { };
  }


  //function which set function which will be add to eventListener of boxes
  addEventsForBoxes() {
    this._boxesEvent = this.boxHandler;
  }

  //bind functionelities to boxes
  bindEventToBoxes() {
    this._boxesContainer.addEventListener('click', (e) => {
      this._boxesEvent(e);
    })
  }

  //timeout for awaiting for click at active box
  awaitForClick() {
    this._timeoutFunction = setTimeout(() => {
      this.continueGame();
      alert('straciłeś życie');
      this._mediator.decreaseLife();
    }, 2000);
  }
  //random and activate one of boxes
  setRandomActive() {
    const random = getRandomInt(0, this._numerofBoxes - 1);
    this._timeoutFunction = setTimeout(() => {
      this._indexOfActive = random;
      this._boxList[this._indexOfActive].setActive();
      this.awaitForClick();
    }, 3000);
  }
  //reset board game
  clearBoard() {
    clearTimeout(this._timeoutFunction);
    if (this._indexOfActive !== null) {
      this._boxList[this._indexOfActive].setInactive();
      this._indexOfActive = null;
    }
  }

  //build DOM elements of this class
  init() {
    this._boxesContainer = document.createElement('div');
    this._boxesContainer.classList.add('boxes-container');
    this._boxesContainer.className += boxesContainerClass;

    this._parentNode.appendChild(this._boxesContainer);
    this.generateBoxes(this._boxesContainer);
    this.bindEventToBoxes();
  }
}