export default class CListInputs {
  constructor(parent) {
    this._parent = parent;

    this._hInputFullNameKeypress = () => {
      return this.inputFullNameKeypress()
    };

    this._hInputEmailKeypress = () => {
      return this.inputEmailKeypress()
    };

    this._hInputFileChange = e => this.inputFileChange(e);
    this._inputFullName = this._parent.querySelector("#eventSettingsListInputFullname");
    this._inputEmail = this._parent.querySelector("#eventSettingsListInputEmail");
    this._inputFile = this._parent.querySelector("#eventSettingsListCandidatesFileInput");
    this._parent.cSpinner.setDisplayWithId(false, "#spinnerTwo");
    window.eventSettingsListAddBtnClick = this.addBtnClick.bind(this);
    window.eventSettingsListRemoveBtnClick = this.removeBtnClick.bind(this);
    window.eventSettingsListBtnFormClick = this.btnFormClick.bind(this);
    window.eventSettingsListBtnShareClick = this.btnShareClick.bind(this);
    window.eventSettingsListBtnImportClick = this.btnImportClick.bind(this);
    window.eventSettingsListBtnExportClick = this.btnExportClick.bind(this)
  };

  connectedCallback() {
    this._inputFullName.addEventListener(
      "keypress",
      this._hInputFullNameKeypress
    );

    this._inputEmail.addEventListener(
      "keypress",
      this._hInputEmailKeypress
    );

    return this._inputFile.addEventListener(
      "change",
      this._hInputFileChange
    )
  };

  disconnectedCallback() {
    this._inputFullName.removeEventListener(
      "keypress",
      this._hInputFullNameKeypress
    );

    this._inputEmail.removeEventListener(
      "keypress",
      this._hInputEmailKeypress
    );

    return this._inputFile.removeEventListener(
      "change",
      this._hInputFileChange
    )
  };

  changeValidEmail(isValid) {
    return Bootstrap.changeValidElement(this._inputEmail, isValid)
  };

  addBtnClick() {
    let isFullName = this.haveFullName();
    let isEmail = this.haveEmail();
    Bootstrap.changeValidElement(this._inputFullName, isFullName);
    Bootstrap.changeValidElement(this._inputEmail, isEmail);
    if (!isFullName || !isEmail) return;

    return Events.emit(
      "#app",
      CListInputs.ENVS.btnClick1,
      {fullName: this._inputFullName.value, email: this._inputEmail.value}
    )
  };

  removeBtnClick(candidateId) {
    return this._parent.cDatabase.removeCandidate(
      candidateId,

      (message) => {
        if (message) return this._parent.cContents.updateListContainer()
      }
    )
  };

  btnFormClick() {
    return window.open(
      `/?event_id=${this._parent.eventId}#event-signup`,
      "_blank"
    )
  };

  btnShareClick() {
    return window.open(
      `/?event_id=${this._parent.eventId}#event-candidates`,
      "_blank"
    )
  };

  btnImportClick() {
    return this._inputFile.click()
  };

  btnExportClick() {
    return this._parent.cDatabase.getCandidates((candidates) => {
      let data = [{fullName: "", email: ""}];

      if (candidates.length > 0) {
        data = candidates.map(h => ({fullName: h.fullName, email: h.email}))
      };

      let eventTitle = this._parent.cEventInputs.inputTitle.value.toLowerCase().replaceAll(
        /[-. ]/g,
        "_"
      );

      let fileName = `${eventTitle}_candidates.csv`;
      return CSVParser.downloadCsv(data, fileName)
    })
  };

  inputFullNameKeypress() {
    if (event.key !== "Enter") return;
    return this._inputEmail.focus()
  };

  inputEmailKeypress() {
    if (event.key !== "Enter") return;
    return this.addBtnClick()
  };

  inputFileChange(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
      let csvText = e.target.result;
      let data = CSVParser.csvToObject(csvText);
      this._inputFile.value = "";
      return this._parent.sendDbCandidates(data)
    };

    return reader.readAsText(file)
  };

  haveFullName() {
    return this._inputFullName.value.length > 0
  };

  haveEmail() {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/m;
    return this._inputEmail.value.length > 0 && emailRegex.test(this._inputEmail.value)
  };

  clean() {
    this._inputFullName.value = "";
    return this._inputEmail.value = ""
  }
};

CListInputs.ENVS = {btnClick1: "ees-cli-btn-click-1"}