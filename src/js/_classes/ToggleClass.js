import ActiveClass from "./ActiveClass.js";

export default class ToggleClass extends ActiveClass {
  constructor ({element, active = true, className = 'active', eventElement}) {
    super({element, active, className});
    if (eventElement) {
      if (eventElement.nodeType == 1) {
        this._eventElement = eventElement;      
      } else {
        this._eventElement = this._element.querySelector(eventElement);
      }
    }
    if (this._eventElement) {
      this._eventElement.addEventListener("click", this._toggleActive.bind(this))      
    } else {
      this._element.addEventListener("click", this._toggleActive.bind(this))
    }
  }

  _toggleActive() {
    this._active = !this._active;
    super._setClass();
  }
}