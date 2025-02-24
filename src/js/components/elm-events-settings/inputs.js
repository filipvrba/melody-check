export default class CInputs {
  get eventIdHistory() {
    return this._eventIdHistory
  };

  constructor(parent) {
    this._parent = parent;

    this._hInputEventNameKeypress = () => {
      return this.inputEventNameKeypress()
    };

    this._hInputDateKeypress = () => {
      return this.inputDateKeypress()
    };

    this._eventIdHistory = null;
    this._inputEventName = this._parent.querySelector("#eventsSettingsListInputEventName");
    this._inputDate = this._parent.querySelector("#eventsSettingsListInputDate");
    window.eventsSettingsListAddBtnClick = this.addBtnClick.bind(this);
    window.eventsSettingsListInputEditBtnClick = this.editBtnClick.bind(this);
    window.eventsSettingsListInputRemoveBtnClick = this.removeBtnClick.bind(this)
  };

  connectedCallback() {
    this._inputEventName.addEventListener(
      "keypress",
      this._hInputEventNameKeypress
    );

    return this._inputDate.addEventListener(
      "keypress",
      this._hInputDateKeypress
    )
  };

  disconnectedCallback() {
    this._inputEventName.removeEventListener(
      "keypress",
      this._hInputEventNameKeypress
    );

    return this._inputDate.removeEventListener(
      "keypress",
      this._hInputDateKeypress
    )
  };

  addBtnClick() {
    this._eventIdHistory = null;
    let isEventName = this.haveEventName();
    let isDate = this.haveDate();
    Bootstrap.changeValidElement(this._inputEventName, isEventName);
    Bootstrap.changeValidElement(this._inputDate, isDate);
    if (!isEventName || !isDate) return;

    return Events.emit(
      "#app",
      CInputs.ENVS.btnClick0,
      {name: this._inputEventName.value, date: this._inputDate.value}
    )
  };

  editBtnClick(eventId) {
    this._eventIdHistory = eventId;

    return Events.emit(
      "#app",
      CInputs.ENVS.btnClick1,
      this._eventIdHistory
    )
  };

  removeBtnClick(eventId) {
    let fnTrue = () => {
      this._eventIdHistory = eventId;

      return this._parent.cDatabase.removeEvent((message) => {
        if (message) return this._parent.cContents.updateListContainer()
      })
    };

    let confirmOptions = {fnTrue};
    return Modals.confirm(confirmOptions)
  };

  inputEventNameKeypress() {
    if (event.key !== "Enter") return;
    return this._inputDate.focus()
  };

  inputDateKeypress() {
    if (event.key !== "Enter") return;
    return this.addBtnClick()
  };

  clearInputValues() {
    this._inputEventName.value = "";
    return this._inputDate.value = ""
  };

  // Private
  haveEventName() {
    return this._inputEventName.value.length > 0
  };

  haveDate() {
    return this._inputDate.value !== ""
  }
};

CInputs.ENVS = {
  btnClick0: "eess-ci-btn-click-0",
  btnClick1: "eess-ci-btn-click-1"
}