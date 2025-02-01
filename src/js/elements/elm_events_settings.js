import CInputs from "../components/elm-events-settings/inputs";
import CDatabase from "../components/elm-events-settings/database";
import CSpinner from "../packages/template-rjs-0.1.1/components/spinner";
import CContents from "../components/elm-events-settings/contents";

export default class ElmEventsSettings extends HTMLElement {
  get userId() {
    return this._userId
  };

  get cInputs() {
    return this._cInputs
  };

  get cSpinner() {
    return this._cSpinner
  };

  get cDatabase() {
    return this._cDatabase
  };

  get cContents() {
    return this._cContents
  };

  constructor() {
    super();
    this._hAddBtnClick = e => this.addBtnClick(e.detail.value);
    this._userId = this.getAttribute("user-id");
    this.initElm();
    this._cInputs = new CInputs(this);
    this._cSpinner = new CSpinner(this);
    this._cDatabase = new CDatabase(this);
    this._cContents = new CContents(this);
    this._cSpinner.setDisplayWithId(false, "#spinnerOne");
    this._cContents.updateListContainer()
  };

  connectedCallback() {
    this._cInputs.connectedCallback();

    return Events.connect(
      "#app",
      CInputs.ENVS.btnClick0,
      this._hAddBtnClick
    )
  };

  disconnectedCallback() {
    this._cInputs.disconnectedCallback();

    return Events.disconnect(
      "#app",
      CInputs.ENVS.btnClick0,
      this._hAddBtnClick
    )
  };

  addBtnClick(event) {
    return this._cDatabase.setEventDetails(
      event.name,
      event.date,

      (message) => {
        if (message) {
          this._cInputs.clearInputValues();
          return this._cContents.updateListContainer()
        }
      }
    )
  };

  initElm() {
    let template = `${`
<div class='container my-5'>
  <div id='eventsSettingsListEvents' class='card'>
    <elm-spinner id='spinnerOne' class='spinner-overlay'></elm-spinner>

    <div class='card-body'>
      <div class='d-flex justify-content-between align-items-center'>
        <h5 class='card-title'>Události</h5>
      </div>
      

      <div class='row g-3'>
        <div class='col-md-5'>
          <label for='eventsSettingsListInputEventName' class='form-label'>Název události</label>
          <input type='text' class='form-control' id='eventsSettingsListInputEventName' placeholder='Zadejte název události'>
          <div id='eventsSettingsListInputEventNameFeedback' class='invalid-feedback'>
            Zadaný název události je nesprávný.
          </div>
        </div>
        <div class='col-md-5'>
          <label for='eventsSettingsListInputDate' class='form-label'>Datum</label>
          <input type='date' class='form-control' id='eventsSettingsListInputDate' placeholder='Zadejte datum'>
          <div id='eventsSettingsListInputDateFeedback' class='invalid-feedback'>
            Zadaný datum je nesprávný.
          </div>
        </div>
        <div class='col-md-2 mt-md-5'>
          <button type='button' class='btn btn-primary w-100' onclick='eventsSettingsListAddBtnClick()'>
            <i class='bi bi-plus-lg'></i> Přidat
          </button>
        </div>
      </div>

      <ul id='eventsSettingsListContainer' class='list-group mt-4'>
      </ul>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}