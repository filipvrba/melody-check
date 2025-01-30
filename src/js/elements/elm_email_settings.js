import CInputs from "../components/elm-email-settings/inputs";
import CDatabase from "../components/elm-email-settings/database";
import CSpinner from "../packages/template-rjs-0.1.1/components/spinner";
import ElmEventSettings from "./elm_event_settings";

export default class ElmEmailSettings extends HTMLElement {
  get eventId() {
    return this._eventId
  };

  get cSpinner() {
    return this._cSpinner
  };

  get cInputs() {
    return this._cInputs
  };

  constructor() {
    super();
    this._hBtnClick0 = e => this.btnClick0(e.detail.value);
    this._hEventCallback = e => this.eventCallback(e.detail.value);
    this._eventId = null;
    this.initElm();
    this._cSpinner = new CSpinner(this);
    this._cInputs = new CInputs(this);
    this._cDatabase = new CDatabase(this)
  };

  connectedCallback() {
    Events.connect("#app", CInputs.ENVS.btnClick0, this._hBtnClick0);

    return Events.connect(
      "#app",
      ElmEventSettings.ENVS.eventCallback,
      this._hEventCallback
    )
  };

  disconnectedCallback() {
    Events.disconnect("#app", CInputs.ENVS.btnClick0, this._hBtnClick0);

    return Events.disconnect(
      "#app",
      ElmEventSettings.ENVS.eventCallback,
      this._hEventCallback
    )
  };

  eventCallback(eventId) {
    this._eventId = eventId;

    if (this._eventId) {
      this._cInputs.setDisableBtn(false);

      return this._cDatabase.getEmailTemplates((templates) => {
        if (templates) return this._cInputs.setValueInputs(templates)
      })
    }
  };

  btnClick0(templates) {
    return this._cDatabase.setEmailTemplates(templates)
  };

  initElm() {
    let template = `${`
<div class='container col-lg-8 my-5'>
  <!-- Šablona pro registrované účastníky -->
  <div class='card mb-4'>
    <elm-spinner id='spinnerOne' class='spinner-overlay'></elm-spinner>

    <div class='card-body'>
      <h5 class='card-title'><i class='bi bi-person-check-fill'></i> Šablona pro Registrované Účastníky</h5>
      <p class='text-muted'>Tento e-mail se odesílá účastníkům, kteří byli přidáni do události.</p>
      
      <!-- Předmět e-mailu -->
      <div class='mb-3'>
        <label for='mailSettingsRegisteredSubject' class='form-label'>Předmět e-mailu</label>
        <input type='text' class='form-control' id='mailSettingsRegisteredSubject' placeholder='Zadejte předmět e-mailu'>
      </div>

      <!-- Obsah e-mailu -->
      <textarea class='form-control' id='mailSettingsRegisteredTemplate' rows='10' placeholder='Vložte HTML šablonu pro registrované účastníky'></textarea>
      <div class='form-text'>Použijte HTML kód pro vytvoření e-mailu. Můžete využít značky jako <code>FULLNAME</code>, <code>EVENTNAME</code> a <code>EVENTDATE</code>.</div>
    </div>
  </div>

  <!-- Šablona pro nepotvrzené účastníky -->
  <div class='card mb-4'>
    <elm-spinner id='spinnerTwo' class='spinner-overlay'></elm-spinner>

    <div class='card-body'>
      <h5 class='card-title'><i class='bi bi-person-x-fill'></i> Šablona pro Nepotvrzené Účastníky</h5>
      <p class='text-muted'>Tento e-mail se odesílá účastníkům, kteří ještě nepotvrdili účast, týden před koncertem.</p>
      
      <!-- Předmět e-mailu -->
      <div class='mb-3'>
        <label for='mailSettingsUnconfirmedSubject' class='form-label'>Předmět e-mailu</label>
        <input type='text' class='form-control' id='mailSettingsUnconfirmedSubject' placeholder='Zadejte předmět e-mailu'>
      </div>

      <!-- Obsah e-mailu -->
      <textarea class='form-control' id='mailSettingsUnconfirmedTemplate' rows='10' placeholder='Vložte HTML šablonu pro nepotvrzené účastníky'></textarea>
      <div class='form-text'>Použijte HTML kód pro vytvoření e-mailu. Můžete využít značky jako <code>FULLNAME</code>, <code>EVENTNAME</code> a <code>EVENTDATE</code>.</div>
    </div>
  </div>

  <!-- Tlačítka pro uložení -->
  <div class='row justify-content-center mt-4'>
    <div class='col-sm-12 col-md-3 d-flex align-item-end'>
      <button id='emailSettingsSaveBtn' type='button' class='btn btn-success w-100' onclick='emailSettingsSaveBtnClick()'>
        <i class='bi bi-save'></i> Uložit Změny
      </button>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}