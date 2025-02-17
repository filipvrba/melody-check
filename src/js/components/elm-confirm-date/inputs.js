export default class CInputs {
  constructor(parent) {
    this._parent = parent;

    this._hElmConfirmDateInputDateKeypress = () => {
      return this.elmConfirmDateInputDateKeypress()
    };

    this._hElmConfirmDateInputTimeKeypress = () => {
      return this.elmConfirmDateInputTimeKeypress()
    };

    this._elmConfirmDateInputDate = this._parent.querySelector("#elmConfirmDateInputDate");
    this._elmConfirmDateInputTime = this._parent.querySelector("#elmConfirmDateInputTime");
    this._elmConfirmDateInputAddBtn = this._parent.querySelector("#elmConfirmDateInputAddBtn");
    window.elmConfirmDateInputAddBtnClick = this.elmConfirmDateInputAddBtnClick.bind(this);
    window.elmConfirmDateInputRemoveBtnClick = this.elmConfirmDateInputRemoveBtnClick.bind(this)
  };

  connectedCallback() {
    this._elmConfirmDateInputDate.addEventListener(
      "keypress",
      this._hElmConfirmDateInputDateKeypress
    );

    return this._elmConfirmDateInputTime.addEventListener(
      "keypress",
      this._hElmConfirmDateInputTimeKeypress
    )
  };

  disconnectedCallback() {
    this._elmConfirmDateInputDate.removeEventListener(
      "keypress",
      this._hElmConfirmDateInputDateKeypress
    );

    return this._elmConfirmDateInputTime.removeEventListener(
      "keypress",
      this._hElmConfirmDateInputTimeKeypress
    )
  };

  elmConfirmDateInputAddBtnClick() {
    let isElmConfirmDateInputDate = this.haveElmConfirmDateInputDate();
    let isElmConfirmDateInputTime = this.haveElmConfirmDateInputTime();

    Bootstrap.changeValidElement(
      this._elmConfirmDateInputDate,
      isElmConfirmDateInputDate
    );

    Bootstrap.changeValidElement(
      this._elmConfirmDateInputTime,
      isElmConfirmDateInputTime
    );

    if (!isElmConfirmDateInputDate || !isElmConfirmDateInputTime) return;

    return this._parent.inputAddBtnClick({
      date: this._elmConfirmDateInputDate.value,
      time: this._elmConfirmDateInputTime.value
    })
  };

  elmConfirmDateInputRemoveBtnClick(arrivalId) {
    return this._parent.inputRemoveBtnClick(arrivalId)
  };

  elmConfirmDateInputDateKeypress() {
    if (event.key !== "Enter") return;
    return this._elmConfirmDateInputTime.focus()
  };

  elmConfirmDateInputTimeKeypress() {
    if (event.key !== "Enter") return;
    return this._elmConfirmDateInputAddBtn.click()
  };

  haveElmConfirmDateInputDate() {
    return this._elmConfirmDateInputDate.value.length > 0
  };

  haveElmConfirmDateInputTime() {
    return this._elmConfirmDateInputTime.value.length > 0
  };

  clearInputs() {
    this._elmConfirmDateInputDate.value = "";
    return this._elmConfirmDateInputTime.value = ""
  }
}