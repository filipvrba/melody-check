import CEventInputs from "../components/elm-event-settings/event_inputs";
import CListInputs from "../components/elm-event-settings/list_inputs";
import CDatabase from "../components/elm-event-settings/database";
import CContents from "../components/elm-event-settings/contents";
import CSpinner from "../packages/template-rjs-0.1.1/components/spinner";

export default class ElmEventSettings extends HTMLElement {
  get userId() {
    return this._userId
  };

  get eventId() {
    return this._eventId
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

    this._hEventInputsBtnClick0 = e => (
      this.eventInputsBtnClick0(e.detail.value.title, e.detail.value.date)
    );

    this._hListInputsBtnClick1 = e => (
      this.listInputsBtnClick1(
        e.detail.value.fullName,
        e.detail.value.email
      )
    );

    this._userId = this.getAttribute("user-id");
    this._eventId = null;
    this.initElm();
    this._cSpinner = new CSpinner(this);
    this._cDatabase = new CDatabase(this);
    this._cEventInputs = new CEventInputs(this);
    this._cListInputs = new CListInputs(this);
    this._cContents = new CContents(this)
  };

  connectedCallback() {
    this._cEventInputs.connectedCallback();
    this._cListInputs.connectedCallback();

    Events.connect(
      "#app",
      CEventInputs.ENVS.btnClick0,
      this._hEventInputsBtnClick0
    );

    return Events.connect(
      "#app",
      CListInputs.ENVS.btnClick1,
      this._hListInputsBtnClick1
    )
  };

  disconnectedCallback() {
    this._cEventInputs.disconnectedCallback();
    this._cListInputs.disconnectedCallback();

    Events.disconnect(
      "#app",
      CEventInputs.ENVS.btnClick0,
      this._hEventInputsBtnClick0
    );

    return Events.disconnect(
      "#app",
      CListInputs.ENVS.btnClick1,
      this._hListInputsBtnClick1
    )
  };

  eventCallback(eventId) {
    this._eventId = eventId;

    Events.emit(
      "#app",
      ElmEventSettings.ENVS.eventCallback,
      this._eventId
    );

    this._cContents.changeVisibility(true);
    return this._cContents.updateListContainer()
  };

  eventInputsBtnClick0(title, date) {
    this._cContents.changeVisibility(false);

    return this._cDatabase.setEventDetails(
      title,
      date,
      () => this._cEventInputs.updateEventDetails()
    )
  };

  listInputsBtnClick1(fullName, email) {
    return this._cDatabase.addCandidate(fullName, email, (fnToken) => {
      switch (fnToken) {
      case "tADDED":
        this._cContents.updateListContainer();
        this._cListInputs.clean();
        break;

      case "tNOADDED":
        return this._cListInputs.changeValidEmail(false)
      }
    })
  };

  initElm() {
    let template = `${`
<div class='container col-lg-8 my-5'>
  <!-- Formulář pro nastavení události -->
  <div class='card mb-4'>
    <elm-spinner id='spinnerOne' class='spinner-overlay'></elm-spinner>

    <div class='card-body'>
      <h5 class='card-title'>Detaily Události</h5>
      <div class='mb-3'>
        <label for='eventSettingsEventTitle' class='form-label'>Název Události</label>
        <input type='text' class='form-control' id='eventSettingsEventTitle' placeholder='Zadejte název události'>
        <div id='eventSettingsEventTitleFeedback' class='invalid-feedback'>
          Zadaný název události je nesprávný.
        </div>
      </div>
      <div class='mb-3'>
        <label for='eventSettingsEventDate' class='form-label'>Datum Koncertu</label>
        <input type='date' class='form-control' id='eventSettingsEventDate'>
        <div id='eventSettingsEventDateFeedback' class='invalid-feedback'>
          Zadaný datum události je nesprávný.
        </div>
      </div>
      <div class='row justify-content-center'>
        <div class='col-sm-12 col-md-3 d-flex align-items-end'>
          <button type='button' class='btn btn-success w-100' onclick='eventSettingsEventSaveDetailsBtnClick()'>
            <i class='bi bi-save'></i> Uložit Detaily
          </button>
        </div>
      </div>
    </div>
  </div>
    
  <!-- Seznam účastníků -->
  <div id='eventSettingsListCandidates' class='card'>
    <elm-spinner id='spinnerTwo' class='spinner-overlay'></elm-spinner>

    <div class='card-body'>
      <h5 class='card-title'>Účastníci</h5>
      <div class='row g-3'>
        <div class='col-md-5'>
          <label for='eventSettingsListInputFullname' class='form-label'>Celé Jméno</label>
          <input type='text' class='form-control' id='eventSettingsListInputFullname' placeholder='Zadejte celé jméno'>
          <div id='eventSettingsListInputFullnameFeedback' class='invalid-feedback'>
            Zadané celé jméno je nesprávné.
          </div>
        </div>
        <div class='col-md-5'>
          <label for='eventSettingsListInputEmail' class='form-label'>Email</label>
          <input type='email' class='form-control' id='eventSettingsListInputEmail' placeholder='Zadejte email'>
          <div id='eventSettingsListInputEmailFeedback' class='invalid-feedback'>
            Zadaný email je nesprávný.
          </div>
        </div>
        <div class='col-md-2 mt-md-5'>
          <button type='button' class='btn btn-primary w-100' onclick='eventSettingsListAddBtnClick()'>
            <i class='bi bi-plus-lg'></i> Přidat
          </button>
        </div>
      </div>
      <ul id='eventSettingsListContainer' class='list-group mt-4'>
        <!-- Místo pro seznam účastníků -->
      </ul>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
};

ElmEventSettings.ENVS = {eventCallback: "ees-event-callback"}