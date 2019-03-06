import { GameBoard } from './js/gameBoard';
import { LifeCounter } from './js/lifeCounter';
import { TimeCounter } from './js/timeCounter';
import { PointsCounter } from './js/pointsCounter';
import { Mediator } from './js/mediator';

import { startClass, resetClass, buttonsContainerClass } from './js/classes';

//get existing DOM elements
const container = document.querySelector('.game-container');
const gameInfo = document.querySelector('.game-info');
const gameInfo_points = document.querySelector('.game-info__points');


//create classes
const Lifes = new LifeCounter(gameInfo);
//setting number of lifes
Lifes.setLifes(5);

const Points = new PointsCounter(gameInfo_points);

const Time = new TimeCounter(gameInfo);

const Game = new GameBoard(container);
Game.setSizeOfSide(6);
Game.attachObserver(Points);

//adding mediator
new Mediator(
  {
    timer: Time,
    lifes: Lifes,
    game: Game,
    points: Points
  }
)

//function to initialaze all DOM from classes
const initObjects = (arrayOfObjects) => {
  for (const object of arrayOfObjects) {
    object.init();
  }
}

//execute function and build DOM elements
initObjects([Lifes, Points, Time, Game]);

//creating buttons: START and RESET
//create start button
const startbutton = document.createElement('button');
startbutton.innerText = 'START';
startbutton.className = startClass

//create resset button
const resbutton = document.createElement('button');
resbutton.innerText = 'RESET';
resbutton.className = resetClass;

//create buttons continer and adding buttons to it
const buttonsCointainer = document.createElement('div');
buttonsCointainer.classList.add('buttons-container');
buttonsCointainer.className += buttonsContainerClass;

buttonsCointainer.appendChild(startbutton);
buttonsCointainer.appendChild(resbutton);

//adding buttons in continer to main container
container.appendChild(buttonsCointainer);

//add eventlistener for start button
startbutton.addEventListener('click', () => {
  Game.addEventsForBoxes();
  Game.setRandomActive();
  Game.enableBoxes();
  Time.startTimer();
})

//add eventlistener for reset button
resbutton.addEventListener('click', () => {
  resetAll({ Time, Points, Lifes, Game });
});


//function to reset game, used in mediator and reset button
export const resetAll = ({ Time, Points, Lifes, Game }) => {
  Game.clearBoard();
  Game.clearEventsForBoxes();
  Game.disableBoxes();
  Time.resetTimer();
  Points.clearPoints();
  Lifes.resetLifes();
}
