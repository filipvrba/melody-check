import CInputs from "../components/elm-confirm-date/inputs";
import CDatabase from "../components/elm-confirm-date/database";
import CContents from "../components/elm-confirm-date/contents";
import CSpinner from "../packages/template-rjs-0.1.1/components/spinner";

export default class ElmConfirmDate extends HTMLElement {
  get candidateId() {
    return this._candidateId
  };

  get eventId() {
    return this._eventId
  };

  get cDatabase() {
    return this._cDatabase
  };

  get cSpinner() {
    return this._cSpinner
  };

  constructor() {
    super();
    this._candidateId = URLParams.getIndex("candidate_id");
    this._eventId = URLParams.getIndex("event_id");
    this.initElm();
    this._cInputs = new CInputs(this);
    this._cDatabase = new CDatabase(this);
    this._cContents = new CContents(this);
    this._cSpinner = new CSpinner(this)
  };

  connectedCallback() {
    this._cInputs.connectedCallback();
    return this._cContents.updateListContainer()
  };

  disconnectedCallback() {
    return this._cInputs.disconnectedCallback()
  };

  inputAddBtnClick(options) {
    return this._cDatabase.addDateWithTime(options, (message) => {
      if (message) {
        this._cInputs.clearInputs();
        return this._cContents.updateListContainer()
      }
    })
  };

  inputRemoveBtnClick(arrivalId) {
    return this._cDatabase.removeRow(arrivalId, (message) => {
      if (message) return this._cContents.updateListContainer()
    })
  };

  setVisibleSpinner(isVisible) {
    return this._cSpinner.setDisplayWithId(isVisible, "#spinnerOne")
  };

  initElm() {
    let template = `${`
<div class='card'>
  <elm-spinner id='spinnerOne' class='spinner-overlay'></elm-spinner>

  <div class='card-body'>
    <div class='d-flex justify-content-between align-items-center'>
      <h5 class='card-title'>Čas příchodu</h5>
    </div>

    <div class='row g-3'>
      <div class='col-md-5'>
        <label for='elmConfirmDateInputDate' class='form-label'>Datum</label>
        <input type='date' class='form-control' id='elmConfirmDateInputDate' data-button-id='elmConfirmDateInputAddBtn'>
        <div id='elmConfirmDateInputDateFeedback' class='invalid-feedback'>
          Zadaný datum je nesprávný.
        </div>
      </div>
      <div class='col-md-5'>
        <label for='elmConfirmDateInputTime' class='form-label'>Čas</label>
        <input type='time' class='form-control' id='elmConfirmDateInputTime' data-button-id='elmConfirmDateInputAddBtn'>
        <div id='elmConfirmDateInputTimeFeedback' class='invalid-feedback'>
          Zadaný čas je nesprávný.
        </div>
      </div>
      <div class='col-md-2 mt-md-5'>
        <button id='elmConfirmDateInputAddBtn' type='button' class='btn btn-primary w-100' onclick='elmConfirmDateInputAddBtnClick()'>
          <i class='bi bi-plus-lg'></i> Přidat
        </button>
      </div>
    </div>

    <ul id='eventSettingsListContainer' class='list-group mt-4'>
      <!-- Místo pro seznam účastníků -->
    </ul>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}