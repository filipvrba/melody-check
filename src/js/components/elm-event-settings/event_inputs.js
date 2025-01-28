export default class CEventInputs {
  constructor(parent) {
    this._parent = parent;

    this._hInputTitleKeypress = () => {
      return this.inputTitleKeypress()
    };

    this._hInputDateKeypress = () => {
      return this.inputDateKeypress()
    };

    this._inputTitle = this._parent.querySelector("#eventSettingsEventTitle");
    this._inputDate = this._parent.querySelector("#eventSettingsEventDate");
    this.updateEventDetails();
    window.eventSettingsEventSaveDetailsBtnClick = this.saveDetailsBtnClick.bind(this)
  };

  connectedCallback() {
    this._inputTitle.addEventListener(
      "keypress",
      this._hInputTitleKeypress
    );

    return this._inputDate.addEventListener(
      "keypress",
      this._hInputDateKeypress
    )
  };

  disconnectedCallback() {
    this._inputTitle.removeEventListener(
      "keypress",
      this._hInputTitleKeypress
    );

    return this._inputDate.removeEventListener(
      "keypress",
      this._hInputDateKeypress
    )
  };

  saveDetailsBtnClick() {
    let isTitle = this.haveTitle();
    let isDate = this.haveDate();
    Bootstrap.changeValidElement(this._inputTitle, isTitle);
    Bootstrap.changeValidElement(this._inputDate, isDate);
    if (!isTitle || !isDate) return;

    return Events.emit(
      "#app",
      CEventInputs.ENVS.btnClick0,
      {title: this._inputTitle.value, date: this._inputDate.value}
    )
  };

  inputTitleKeypress() {
    if (event.key !== "Enter") return;
    return this._inputDate.focus()
  };

  inputDateKeypress() {
    if (event.key !== "Enter") return;
    return this.saveDetailsBtnClick()
  };

  haveTitle() {
    return this._inputTitle.value.length > 0
  };

  haveDate() {
    return this._inputDate.value !== ""
  };

  updateEventDetails() {
    return this._parent.cDatabase.getEventDetails((eventDetails) => {
      if (eventDetails) {
        this._parent.eventCallback(eventDetails.id);
        this._inputTitle.value = eventDetails.title;
        return this._inputDate.value = eventDetails.date
      }
    })
  }
};

CEventInputs.ENVS = {btnClick0: "ees-cei-btn-click-0"}