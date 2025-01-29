import CInputs from "../components/elm-email-settings/inputs";
import CDatabase from "../components/elm-email-settings/database";

export default class ElmEmailSettings extends HTMLElement {
  constructor() {
    super();
    this._hBtnClick0 = e => this.btnClick0(e.detail.value);
    this.initElm();
    this._cInputs = new CInputs(this);
    this._cDatabase = new CDatabase(this)
  };

  connectedCallback() {
    return Events.connect(
      "#app",
      CInputs.ENVS.btnClick0,
      this._hBtnClick0
    )
  };

  disconnectedCallback() {
    return Events.disconnect(
      "#app",
      CInputs.ENVS.btnClick0,
      this._hBtnClick0
    )
  };

  // @c_database.set_email_templates(templates) do
  // end
  btnClick0(templates) {
    return null
  };

  initElm() {
    let template = `${`
<div class='container col-lg-8 my-5'>
  <!-- Šablona pro registrované účastníky -->
  <div class='card mb-4'>
    <div class='card-body'>
      <h5 class='card-title'><i class='bi bi-person-check-fill'></i> Šablona pro Registrované Účastníky</h5>
      <p class='text-muted'>Tento e-mail se odesílá účastníkům, kteří byli přidáni do události.</p>
      <textarea class='form-control' id='mailSettingsRegisteredTemplate' rows='10' placeholder='Vložte HTML šablonu pro registrované účastníky'></textarea>
      <div class='form-text'>Použijte HTML kód pro vytvoření e-mailu. Můžete využít značky jako <code>{FULLNAME}</code> pro vložení jména účastníka a <code>{EVENTNAME}</code> pro název události.</div>
    </div>
  </div>

  <!-- Šablona pro nepotvrzené účastníky -->
  <div class='card mb-4'>
    <div class='card-body'>
      <h5 class='card-title'><i class='bi bi-person-x-fill'></i> Šablona pro Nepotvrzené Účastníky</h5>
      <p class='text-muted'>Tento e-mail se odesílá účastníkům, kteří ještě nepotvrdili účast, týden před koncertem.</p>
      <textarea class='form-control' id='mailSettingsUnconfirmedTemplate' rows='10' placeholder='Vložte HTML šablonu pro nepotvrzené účastníky'></textarea>
      <div class='form-text'>Použijte HTML kód pro vytvoření e-mailu. Můžete využít značky jako <code>{FULLNAME}</code>, <code>{EVENTNAME}</code> a <code>{EVENTDATE}</code>.</div>
    </div>
  </div>

  <!-- Tlačítka pro uložení -->
  <div class='row justify-content-center mt-4'>
    <div class='col-sm-12 col-md-3 d-flex align-item-end'>
      <button type='button' class='btn btn-success w-100' onclick='emailSettingsSaveBtnClick()'>
        <i class='bi bi-save'></i> Uložit Změny
      </button>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}