import CInputs from "../components/elm-event-signup/inputs";
import CContents from "../components/elm-event-signup/contents";
import CDatabase from "../components/elm-event-signup/database";
import CDatabaseEventSettings from "../components/elm-event-settings/database";
import CSpinner from "../packages/template-rjs-0.1.1/components/spinner";

export default class ElmEventSignup extends HTMLElement {
  get eventId() {
    return this._eventId
  };

  get cSpinner() {
    return this._cSpinner
  };

  constructor() {
    super();
    this._eventId = URLParams.getIndex("event_id") || null;
    this._haveParams = this._eventId && this._eventId !== 0;
    this._hBtnClick0 = e => this.btnClick0(e.detail.value);
    this._cDatabase = new CDatabase(this);
    this._cDatabaseEventSettings = new CDatabaseEventSettings(this);
    this._cContents = new CContents(this);
    this.initElm()
  };

  initializeEvent(event) {
    this.innerHTML = this._cContents.getRegistrationForm();
    this._cSpinner = new CSpinner(this);
    this._cSpinner.setDisplay(false);
    this._cInputs = new CInputs(this);
    this._cInputs.connectedCallback();
    return this._cInputs.setEventName(event.name)
  };

  connectedCallback() {
    return Events.connect(
      "#app",
      CInputs.ENVS.btnClick0,
      this._hBtnClick0
    )
  };

  disconnectedCallback() {
    if (this._cInputs) this._cInputs.disconnectedCallback();

    return Events.disconnect(
      "#app",
      CInputs.ENVS.btnClick0,
      this._hBtnClick0
    )
  };

  btnClick0(options) {
    return this._cDatabaseEventSettings.addCandidate(
      options.fullName,
      options.email,

      (fnToken) => {
        switch (fnToken) {
        case "tADDED":
          this._cInputs.disconnectedCallback();
          this.innerHTML = this._cContents.getRegistrationSuccessful(this._cInputs.getEventName());
          break;

        case "tNOADDED":
          return this._cInputs.changeValidEmail(false)
        }
      }
    )
  };

  initElm() {
    return this._haveParams ? this._cDatabase.getEvent(event => (
      event ? this.initializeEvent(event) : this.innerHTML = this._cContents.getNoevent()
    )) : this.innerHTML = this._cContents.getNoparams()
  }
}