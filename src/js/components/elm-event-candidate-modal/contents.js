export default class CContents {
  constructor(parent) {
    this._parent = parent;
    this._inputFullName = this._parent.querySelector("#eventCandidateModaFullName");
    this._inputEmail = this._parent.querySelector("#eventCandidateModaEmail")
  };

  setInputs(candidate) {
    this._inputFullName.value = candidate.fullName;
    return this._inputEmail.value = candidate.email
  }
}