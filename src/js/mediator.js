import { resetAll } from '../index';

export class Mediator {
  constructor({ timer, lifes, game, points }) {
    this._timer = timer;
    this._timer.setMediator(this);
    this._lifes = lifes;
    this._lifes.setMediator(this);
    this._game = game;
    this._game.setMediator(this);
    this._points = points;
    this._points.setMediator(this);
  }

  decreaseLife() {
    this._lifes.decreaseLifes();
  }

  gameOver() {
    const { _timer, _points, _lifes, _game } = this
    alert(`koniec gry! zdobyłeś ${this._points._points} punktów`);
    resetAll({
      Time: _timer,
      Points: _points,
      Lifes: _lifes,
      Game: _game
    });
  }
}