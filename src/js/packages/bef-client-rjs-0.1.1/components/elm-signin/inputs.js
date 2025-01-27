export default class CInputs {
  get inputLogin() {
    return this._inputLogin
  };

  constructor(parent) {
    this._parent = parent;
    this._inputEmail = this._parent.querySelector("#emailSignin");
    this._inputPassword = this._parent.querySelector("#passwordSignin");
    this._inputLogin = this._parent.querySelector("#loginSigninBtn");

    this._hInputEmailKeypress = () => {
      return this.inputEmailKeypress()
    };

    this._hInputPasswordKeypress = () => {
      return this.inputPasswordKeypress()
    };

    window.btnSignInClick = this.btnSignInClick.bind(this)
  };

  connectedCallback() {
    this._inputEmail.addEventListener(
      "keypress",
      this._hInputEmailKeypress
    );

    return this._inputPassword.addEventListener(
      "keypress",
      this._hInputPasswordKeypress
    )
  };

  disconnectedCallback() {
    this._inputEmail.removeEventListener(
      "keypress",
      this._hInputEmailKeypress
    );

    return this._inputPassword.removeEventListener(
      "keypress",
      this._hInputPasswordKeypress
    )
  };

  btnSignInClick() {
    let isEmail = this.haveEmail();
    let isPassword = this.havePassword();
    Bootstrap.changeValidElement(this._inputEmail, isEmail);
    Bootstrap.changeValidElement(this._inputPassword, isPassword);
    if (!isEmail || !isPassword) return;

    return Events.emit(
      "#app",
      CInputs.ENVS.btnClick0,
      {email: this._inputEmail.value, password: this._inputPassword.value}
    )
  };

  haveEmail() {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/m;
    return this._inputEmail.value.length > 0 && emailRegex.test(this._inputEmail.value)
  };

  havePassword() {
    return this._inputPassword.value.length > 0
  };

  inputEmailKeypress() {
    if (event.key !== "Enter") return;
    return this._inputPassword.focus()
  };

  inputPasswordKeypress() {
    if (event.key !== "Enter") return;
    return this._inputLogin.click()
  };

  removeValuesFromInputs(confirmButton=true) {
    this._inputEmail.value = "";
    this._inputPassword.value = "";

    if (this._inputEmail.value === "" && this._inputPassword.value === "") {
      if (confirmButton) return this._inputLogin.click()
    }
  }
};

CInputs.ENVS = {btnClick0: "ci-btn-click-0"}