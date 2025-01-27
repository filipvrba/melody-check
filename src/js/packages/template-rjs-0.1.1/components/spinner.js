export default class CSpinner {
  constructor(parent) {
    this._elementSpinner = parent.querySelector("elm-spinner")
  };

  setDisplay(isDisabled) {
    return this._elementSpinner.style.display = isDisabled ? "" : "none"
  }
}