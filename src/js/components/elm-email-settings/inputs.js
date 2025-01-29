export default class CInputs {
  constructor(parent) {
    this._parent = parent;
    this._googleAppCode = this._parent.querySelector("#mailSettingsGoogleAppCode");
    this._registeredTemplate = this._parent.querySelector("#mailSettingsRegisteredTemplate");
    this._unconfirmedTemplate = this._parent.querySelector("#mailSettingsUnconfirmedTemplate");
    window.emailSettingsSaveBtnClick = this.saveBtnClick.bind(this)
  };

  saveBtnClick() {
    return null
  }
}