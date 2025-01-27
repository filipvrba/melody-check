export default class CInputs {
  get registerSignupBtn() {
    return this._registerSignupBtn
  };

  constructor(parent) {
    this._parent = parent;

    this._hInputEmailKeypress = () => {
      return this.inputEmailKeypress()
    };

    this._hInputPasswordKeypress = () => {
      return this.inputPasswordKeypress()
    };

    this._hConfirmPasswordKeypress = () => {
      return this.confirmPasswordKeypress()
    };

    this._emailSignup = this._parent.querySelector("#emailSignup");
    this._passwordSignup = this._parent.querySelector("#passwordSignup");
    this._confirmPasswordSignup = this._parent.querySelector("#confirmPasswordSignup");
    this._registerSignupBtn = this._parent.querySelector("#registerSignupBtn");
    window.btnSignUpClick = this.btnSignUpClick.bind(this)
  };

  connectedCallback() {
    this._emailSignup.addEventListener(
      "keypress",
      this._hInputEmailKeypress
    );

    this._passwordSignup.addEventListener(
      "keypress",
      this._hInputPasswordKeypress
    );

    return this._confirmPasswordSignup.addEventListener(
      "keypress",
      this._hConfirmPasswordKeypress
    )
  };

  disconnectedCallback() {
    this._emailSignup.removeEventListener(
      "keypress",
      this._hInputEmailKeypress
    );

    this._passwordSignup.removeEventListener(
      "keypress",
      this._hInputPasswordKeypress
    );

    return this._confirmPasswordSignup.removeEventListener(
      "keypress",
      this._hConfirmPasswordKeypress
    )
  };

  btnSignUpClick() {
    let isEmail = this.haveEmail();
    let isPassword = this.havePassword();
    let isSamePassword = this.haveSamePasswords();
    Bootstrap.changeValidElement(this._emailSignup, isEmail);
    Bootstrap.changeValidElement(this._passwordSignup, isPassword);

    Bootstrap.changeValidElement(
      this._confirmPasswordSignup,
      isSamePassword
    );

    if (!isEmail || !isPassword || !isSamePassword) return;

    return Events.emit("#app", CInputs.ENVS.btnClick0, {
      email: this._emailSignup.value,
      password: this._passwordSignup.value
    })
  };

  inputEmailKeypress() {
    if (event.key !== "Enter") return;
    return this._passwordSignup.focus()
  };

  inputPasswordKeypress() {
    if (event.key !== "Enter") return;
    return this._confirmPasswordSignup.focus()
  };

  confirmPasswordKeypress() {
    if (event.key !== "Enter") return;
    return this._registerSignupBtn.click()
  };

  haveEmail() {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/m;
    return this._emailSignup.value.length > 0 && emailRegex.test(this._emailSignup.value)
  };

  havePassword() {
    return this._passwordSignup.value.length > 0
  };

  haveSamePasswords() {
    return this._passwordSignup.value === this._confirmPasswordSignup.value
  };

  removeValuesFromInputs(confirmButton=true) {
    this._emailSignup.value = "";

    if (this._emailSignup.value === "") {
      if (confirmButton) return this._registerSignupBtn.click()
    }
  }
};

CInputs.ENVS = {btnClick0: "ci-signup-btn-click-0"}