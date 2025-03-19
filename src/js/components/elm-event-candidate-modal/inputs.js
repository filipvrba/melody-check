export default class CInputs {
  constructor(parent) {
    this._parent = parent;

    this._hEventCandidateModaFullNameKeypress = () => {
      return this.eventCandidateModaFullNameKeypress()
    };

    this._hEventCandidateModaEmailKeypress = () => {
      return this.eventCandidateModaEmailKeypress()
    };

    this._eventCandidateModaFullName = this._parent.querySelector("#eventCandidateModaFullName");
    this._eventCandidateModaEmail = this._parent.querySelector("#eventCandidateModaEmail");
    this._eventCandidateModaBtnSave = this._parent.querySelector("#eventCandidateModaBtnSave");
    window.eventCandidateModalBtnSaveClick = this.eventCandidateModalBtnSaveClick.bind(this)
  };

  connectedCallback() {
    this._eventCandidateModaFullName.addEventListener(
      "keypress",
      this._hEventCandidateModaFullNameKeypress
    );

    return this._eventCandidateModaEmail.addEventListener(
      "keypress",
      this._hEventCandidateModaEmailKeypress
    )
  };

  disconnectedCallback() {
    this._eventCandidateModaFullName.removeEventListener(
      "keypress",
      this._hEventCandidateModaFullNameKeypress
    );

    return this._eventCandidateModaEmail.removeEventListener(
      "keypress",
      this._hEventCandidateModaEmailKeypress
    )
  };

  eventCandidateModalBtnSaveClick() {
    let isEventCandidateModaFullName = this.haveEventCandidateModaFullName();
    let isEventCandidateModaEmail = this.haveEventCandidateModaEmail();

    Bootstrap.changeValidElement(
      this._eventCandidateModaFullName,
      isEventCandidateModaFullName
    );

    Bootstrap.changeValidElement(
      this._eventCandidateModaEmail,
      isEventCandidateModaEmail
    );

    if (!isEventCandidateModaFullName || !isEventCandidateModaEmail) return;

    return this._parent.btnSaveClick({
      fullName: this._eventCandidateModaFullName.value,
      email: this._eventCandidateModaEmail.value
    })
  };

  eventCandidateModaFullNameKeypress() {
    if (event.key !== "Enter") return;
    return this._eventCandidateModaEmail.focus()
  };

  eventCandidateModaEmailKeypress() {
    if (event.key !== "Enter") return;
    return this._eventCandidateModaBtnSave.click()
  };

  haveEventCandidateModaFullName() {
    return this._eventCandidateModaFullName.value.length > 0
  };

  haveEventCandidateModaEmail() {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/m;
    return this._eventCandidateModaEmail.value.length > 0 && emailRegex.test(this._eventCandidateModaEmail.value)
  }
}