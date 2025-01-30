export default class CInputs {
  constructor(parent) {
    this._parent = parent;
    this._registeredSubject = this._parent.querySelector("#mailSettingsRegisteredSubject");
    this._unconfirmedSubject = this._parent.querySelector("#mailSettingsUnconfirmedSubject");
    this._registeredTemplate = this._parent.querySelector("#mailSettingsRegisteredTemplate");
    this._unconfirmedTemplate = this._parent.querySelector("#mailSettingsUnconfirmedTemplate");
    this._saveBtn = this._parent.querySelector("#emailSettingsSaveBtn");
    this.setDisable(false);
    this.setDisableBtn(true);
    window.emailSettingsSaveBtnClick = this.saveBtnClick.bind(this)
  };

  saveBtnClick() {
    return Events.emit("#app", CInputs.ENVS.btnClick0, {
      registered: {
        subject: this._registeredSubject.value,
        html: this._registeredTemplate.value
      },

      unconfirmed: {
        subject: this._unconfirmedSubject.value,
        html: this._unconfirmedTemplate.value
      }
    })
  };

  setDisable(isDisabled) {
    this._parent.cSpinner.setDisplayWithId(isDisabled, "#spinnerOne");
    this._parent.cSpinner.setDisplayWithId(isDisabled, "#spinnerTwo");
    return this.setDisableBtn(isDisabled)
  };

  setDisableBtn(isDisabled) {
    return Bootstrap.changeDisableElement(this._saveBtn, isDisabled)
  };

  setValueInputs(templates) {
    this._registeredSubject.value = templates.registered.subject;
    this._unconfirmedSubject.value = templates.unconfirmed.subject;
    this._registeredTemplate.value = templates.registered.html;
    return this._unconfirmedTemplate.value = templates.unconfirmed.html
  }
};

CInputs.ENVS = {btnClick0: "ees-ci-btn-click-3"}