export default class CListInputs {
  constructor(parent) {
    this._parent = parent;

    this._hInputFullNameKeypress = () => {
      return this.inputFullNameKeypress()
    };

    this._hInputEmailKeypress = () => {
      return this.inputEmailKeypress()
    };

    this._inputFullName = this._parent.querySelector("#eventSettingsListInputFullname");
    this._inputEmail = this._parent.querySelector("#eventSettingsListInputEmail");
    this._parent.cSpinner.setDisplayWithId(false, "#spinnerTwo");
    window.eventSettingsListAddBtnClick = this.addBtnClick.bind(this);
    window.eventSettingsListRemoveBtnClick = this.removeBtnClick.bind(this)
  };

  connectedCallback() {
    this._inputFullName.addEventListener(
      "keypress",
      this._hInputFullNameKeypress
    );

    return this._inputEmail.addEventListener(
      "keypress",
      this._hInputEmailKeypress
    )
  };

  disconnectedCallback() {
    this._inputFullName.removeEventListener(
      "keypress",
      this._hInputFullNameKeypress
    );

    return this._inputEmail.removeEventListener(
      "keypress",
      this._hInputEmailKeypress
    )
  };

  changeValidEmail(isValid) {
    return Bootstrap.changeValidElement(this._inputEmail, isValid)
  };

  addBtnClick() {
    let isFullName = this.haveFullName();
    let isEmail = this.haveEmail();
    Bootstrap.changeValidElement(this._inputFullName, isFullName);
    Bootstrap.changeValidElement(this._inputEmail, isEmail);
    if (!isFullName || !isEmail) return;

    return Events.emit(
      "#app",
      CListInputs.ENVS.btnClick1,
      {fullName: this._inputFullName.value, email: this._inputEmail.value}
    )
  };

  removeBtnClick(candidateId) {
    return this._parent.cDatabase.removeCandidate(
      candidateId,

      (message) => {
        if (message) return this._parent.cContents.updateListContainer()
      }
    )
  };

  inputFullNameKeypress() {
    if (event.key !== "Enter") return;
    return this._inputEmail.focus()
  };

  inputEmailKeypress() {
    if (event.key !== "Enter") return;
    return this.addBtnClick()
  };

  haveFullName() {
    return this._inputFullName.value.length > 0
  };

  haveEmail() {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/m;
    return this._inputEmail.value.length > 0 && emailRegex.test(this._inputEmail.value)
  };

  clean() {
    this._inputFullName.value = "";
    return this._inputEmail.value = ""
  }
};

CListInputs.ENVS = {btnClick1: "ees-cli-btn-click-1"}