export default class CEventInputs {
  get inputTitle() {
    return this._inputTitle
  };

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
    let fnTrue = () => {
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

    return Modals.confirm({fnTrue})
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
      let relevantEventDetail;

      if (eventDetails) {
        if (this._parent.eventId) {
          relevantEventDetail = eventDetails.find(e => e.id === this._parent.eventId);
          this._parent.eventCallback(relevantEventDetail.id);
          this._inputTitle.value = relevantEventDetail.name;
          return this._inputDate.value = relevantEventDetail.date
        } else {
          this._parent.eventCallback(eventDetails[0].id);
          this._inputTitle.value = eventDetails[0].name;
          return this._inputDate.value = eventDetails[0].date
        }
      }
    })
  }
};

CEventInputs.ENVS = {btnClick0: "ees-cei-btn-click-0"}