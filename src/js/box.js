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

  //set box into active view
  setActive() {
    this._active = true;
    this._box.classList.toggle(enabledClass);
    this._box.classList.toggle(activeClass);
  }
  
  //set box into standard view
  setInactive() {
    this._active = false;
    this._box.classList.toggle(activeClass);
    this._box.classList.toggle(enabledClass);
  }

  //set box into disable view
  setDisabled() {
    this._active = false;
    this._box.classList.remove(enabledClass);
    this._box.classList.add(disabledClass);

  }

  //set box into ensble view
  setEnabled() {
    this._active = false;
    this._box.classList.remove(disabledClass);
    this._box.classList.add(enabledClass);
  }

  setCSSWidth(_width) {
    this._boxContainer.style = `width: ${_width}%`
  }

  //build DOM elements of this class
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