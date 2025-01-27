export default class CInputsChangePassword {
  constructor(parent) {
    this._parent = parent;

    this._hCurrentPasswordKeypress = () => {
      return this.currentPasswordKeypress()
    };

    this._hAccountNewPasswordKeypress = () => {
      return this.accountNewPasswordKeypress()
    };

    this._hConfirmNewPasswordKeypress = () => {
      return this.confirmNewPasswordKeypress()
    };

    this._elmCurrentPassword = this._parent.querySelector("#profileEditingCurrentPassword");
    this._elmAccountNewPassword = this._parent.querySelector("#profileEditingNewPassword");
    this._elmConfirmNewPassword = this._parent.querySelector("#profileEditingConfirmNewPassword");
    this._elmChangePasswordBtn = this._parent.querySelector("#profileEditingChangePasswordBtn");
    this._parent.cSpinner.setDisplay(false);
    window.profileEditingChangePasswordBtnClick = this.changePasswordBtnClick.bind(this)
  };

  connectedCallback() {
    this._elmCurrentPassword.addEventListener(
      "keypress",
      this._hCurrentPasswordKeypress
    );

    this._elmAccountNewPassword.addEventListener(
      "keypress",
      this._hAccountNewPasswordKeypress
    );

    return this._elmConfirmNewPassword.addEventListener(
      "keypress",
      this._hConfirmNewPasswordKeypress
    )
  };

  disconnectedCallback() {
    this._elmCurrentPassword.removeEventListener(
      "keypress",
      this._hCurrentPasswordKeypress
    );

    this._elmAccountNewPassword.removeEventListener(
      "keypress",
      this._hAccountNewPasswordKeypress
    );

    return this._elmConfirmNewPassword.removeEventListener(
      "keypress",
      this._hConfirmNewPasswordKeypress
    )
  };

  disableUpdate(isConnected) {
    return Bootstrap.changeDisableElement(
      this._elmChangePasswordBtn,
      !isConnected
    )
  };

  changePasswordBtnClick() {
    let isCurrentPassword = this.haveCurrentPassword();
    let isAccountNewPassword = this.haveAccountNewPassword();
    let isConfirmNewPassword = this.haveConfirmNewPassword();

    Bootstrap.changeValidElement(
      this._elmCurrentPassword,
      isCurrentPassword
    );

    Bootstrap.changeValidElement(
      this._elmAccountNewPassword,
      isAccountNewPassword
    );

    Bootstrap.changeValidElement(
      this._elmConfirmNewPassword,
      isConfirmNewPassword
    );

    Bootstrap.changeValidGreenElement(this._elmConfirmNewPassword, true);

    if (!isCurrentPassword || !isAccountNewPassword || !isConfirmNewPassword) {
      return
    };

    this._parent.cSpinner.setDisplay(true);

    return this._parent.cDatabase.compareCurrentPassword(
      this._elmCurrentPassword.value,

      (isSame) => {
        if (isSame) {
          return this._parent.cDatabase.setAccountNewPassword(
            this._elmAccountNewPassword.value,

            (message) => {
              if (message) {
                Bootstrap.changeValidGreenElement(this._elmConfirmNewPassword, false)
              } else {
                Bootstrap.changeValidElement(this._elmAccountNewPassword, false)
              };

              return this._parent.cSpinner.setDisplay(false)
            }
          )
        } else {
          Bootstrap.changeValidElement(this._elmCurrentPassword, false);
          return this._parent.cSpinner.setDisplay(false)
        }
      }
    )
  };

  currentPasswordKeypress() {
    if (event.key !== "Enter") return;
    return this._elmAccountNewPassword.focus()
  };

  accountNewPasswordKeypress() {
    if (event.key !== "Enter") return;
    return this._elmConfirmNewPassword.focus()
  };

  confirmNewPasswordKeypress() {
    if (event.key !== "Enter") return;
    return this._elmChangePasswordBtn.click()
  };

  haveCurrentPassword() {
    return this._elmCurrentPassword.value.length > 0
  };

  haveAccountNewPassword() {
    return this._elmAccountNewPassword.value.length > 0
  };

  haveConfirmNewPassword() {
    return this._elmAccountNewPassword.value === this._elmConfirmNewPassword.value
  }
}