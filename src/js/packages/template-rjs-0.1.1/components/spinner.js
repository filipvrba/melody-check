export default class CSpinner {
  constructor(parent) {
    this._parent = parent;
    this._elementSpinner = this._parent.querySelector("elm-spinner")
  };

  setDisplay(isDisabled) {
    return this._elementSpinner.style.display = isDisabled ? "" : "none"
  };

  setDisplayWithId(isDisabled, id) {
    let elmSpinner = this._parent.querySelector(id);
    return elmSpinner.style.display = isDisabled ? "" : "none"
  }
}