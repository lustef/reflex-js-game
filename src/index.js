import { GameBoard } from './js/gameBoard';
import { LifeCounter } from './js/lifeCounter';
import { TimeCounter } from './js/timeCounter';
import { PointsCounter } from './js/pointsCounter';
import { Mediator } from './js/mediator';

import { startClass, resetClass, buttonsContainerClass } from './js/classes';

const container = document.querySelector('.game-container');
const gameInfo = document.querySelector('.game-info');

const Lifes = new LifeCounter(gameInfo);
Lifes.setLifes(5);

const Points = new PointsCounter(gameInfo);

const Time = new TimeCounter(gameInfo);

const Game = new GameBoard(container);
Game.attachObserver(Points);

new Mediator(
  {
    timer: Time,
    lifes: Lifes,
    game: Game,
    points: Points
  }
)

const initObjects = (arrayOfObjects) => {
  for (const object of arrayOfObjects) {
    object.init();
  }
}

initObjects([Lifes, Points, Time, Game]);

//buttons///////////////
const startbutton = document.createElement('button');
startbutton.innerText = 'START';
startbutton.className = startClass

const resbutton = document.createElement('button');
resbutton.innerText = 'RESET';
resbutton.className = resetClass;

const buttonsCointainer = document.createElement('div');
buttonsCointainer.classList.add('buttons-container');
buttonsCointainer.className += buttonsContainerClass;

buttonsCointainer.appendChild(startbutton);
buttonsCointainer.appendChild(resbutton);

container.appendChild(buttonsCointainer);
////////////////////////

startbutton.addEventListener('click', () => {
  Game.addEventsForBoxes();
  Game.setRandomActive();
  Game.enableBoxes();
  Time.startTimer();
})

resbutton.addEventListener('click', () => {
  resetAll({ Time, Points, Lifes, Game });
});

export const resetAll = ({ Time, Points, Lifes, Game }) => {
  Game.clearBoard();
  Game.clearEventsForBoxes();
  Game.disableBoxes();
  Time.resetTimer();
  Points.clearPoints();
  Lifes.resetLifes();
}
