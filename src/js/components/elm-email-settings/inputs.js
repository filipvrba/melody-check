export default class CInputs {
  constructor(parent) {
    this._parent = parent;
    this._registeredTemplate = this._parent.querySelector("#mailSettingsRegisteredTemplate");
    this._unconfirmedTemplate = this._parent.querySelector("#mailSettingsUnconfirmedTemplate");
    window.emailSettingsSaveBtnClick = this.saveBtnClick.bind(this)
  };

  saveBtnClick() {
    return Events.emit("#app", CInputs.ENVS.btnClick0, {
      htmlRegistered: this._registeredTemplate.value,
      htmlUnconfirmed: this._unconfirmedTemplate.value
    })
  }
};

CInputs.ENVS = {btnClick0: "ees-ci-btn-click-3"}