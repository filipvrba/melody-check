export default class CInputs {
  constructor(parent) {
    this._parent = parent;
    window.emailsSettingsListInputEditBtnClick = this.inputEditBtnClick.bind(this)
  };

  inputEditBtnClick(eventId) {
    return Events.emit("#app", CInputs.ENVS.btnClick0, eventId)
  }
};

CInputs.ENVS = {btnClick0: "eesss-ci-btnc-0"}