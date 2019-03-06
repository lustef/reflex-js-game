import { boxContainerClass, activeClass, disabledClass, enabledClass } from './classes';

export class Box {
  constructor(parentNode, id) {
    this._active = false;
    this._id = id;

    //DOM
    this._parentNode = parentNode;
    this._boxContainer = null;
    this._box = null;
  }

  setActive() {
    this._active = true;
    this._box.classList.toggle(enabledClass);
    this._box.classList.toggle(activeClass);
  }

  setInactive() {
    this._active = false;
    this._box.classList.toggle(activeClass);
    this._box.classList.toggle(enabledClass);
  }

  setDisabled() {
    this._active = false;
    this._box.classList.remove(enabledClass);
    this._box.classList.add(disabledClass);

  }

  setEnabled() {
    this._active = false;
    this._box.classList.remove(disabledClass);
    this._box.classList.add(enabledClass);

  }

  init() {
    this._boxContainer = document.createElement('div');
    this._box = document.createElement('div');

    this._boxContainer.classList.add('box-container');
    this._boxContainer.className += boxContainerClass;

    this._box.classList.add('box');

    this._box.dataset.id = this._id;
    this._boxContainer.appendChild(this._box);
    this._parentNode.appendChild(this._boxContainer);
  }
}