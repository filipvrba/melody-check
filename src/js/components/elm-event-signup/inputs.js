export default class CInputs {
  constructor(parent) {
    this._parent = parent;

    this._hInputFullNameKeypress = () => {
      return this.inputFullNameKeypress()
    };

    this._hInputEmailKeypress = () => {
      return this.inputEmailKeypress()
    };

    this._inputEventName = this._parent.querySelector("#eventSignupEventName");
    this._inputFullName = this._parent.querySelector("#eventSignupFullName");
    this._inputEmail = this._parent.querySelector("#eventSignupEmail");
    this._inputBtnSignup = this._parent.querySelector("#eventSignupBtnSignup");
    window.eventSignupBtnSignupClick = this.btnSignupClick.bind(this)
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

  btnSignupClick() {
    let isFullName = this.haveFullName();
    let isEmail = this.haveEmail();
    Bootstrap.changeValidElement(this._inputFullName, isFullName);
    this.changeValidEmail(isEmail);
    if (!isFullName || !isEmail) return;

    return Events.emit(
      "#app",
      CInputs.ENVS.btnClick0,
      {fullName: this._inputFullName.value, email: this._inputEmail.value}
    )
  };

  inputFullNameKeypress() {
    if (event.key !== "Enter") return;
    return this._inputEmail.focus()
  };

  inputEmailKeypress() {
    if (event.key !== "Enter") return;
    return this._inputBtnSignup.click()
  };

  setEventName(name) {
    return this._inputEventName.value = name
  };

  changeValidEmail(isEmail) {
    return Bootstrap.changeValidElement(this._inputEmail, isEmail)
  };

  getEventName() {
    return this._inputEventName.value
  };

  // Private
  haveFullName() {
    return this._inputFullName.value.length > 0
  };

  haveEmail() {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/m;
    return this._inputEmail.value.length > 0 && emailRegex.test(this._inputEmail.value)
  }
};

CInputs.ENVS = {btnClick0: "eesu-btn-click-0"}