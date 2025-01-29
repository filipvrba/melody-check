import CInputs from "../components/elm-email-settings/inputs";

export default class ElmEmailSettings extends HTMLElement {
  constructor() {
    super();
    this.initElm();
    this._cInputs = new CInputs(this)
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`
<div class='container my-5'>
  <!-- Aplikační kód -->
  <div class='mb-4'>
    <h2>Aplikační Kód</h2>
    <p class='text-muted'>Pro automatizaci odesílání e-mailů zadejte 16místný aplikační kód od Google.</p>
    <input type='text' class='form-control' id='mailSettingsGoogleAppCode' placeholder='Zadejte 16místný aplikační kód' maxlength='16'>
    <div class='form-text'>Tento kód se použije pro přístup k vašemu e-mailovému účtu.</div>
  </div>

  <!-- Šablona pro registrované účastníky -->
  <div class='mb-5'>
    <h2>Šablona pro Registrované Účastníky</h2>
    <p class='text-muted'>Tento e-mail se odesílá účastníkům, kteří byli přidáni do události.</p>
    <textarea class='form-control' id='mailSettingsRegisteredTemplate' rows='10' placeholder='Vložte HTML šablonu pro registrované účastníky'></textarea>
    <div class='form-text'>Použijte HTML kód pro vytvoření e-mailu. Můžete využít značky jako <code>{FULLNAME}</code> pro vložení jména účastníka a <code>{EVENTNAME}</code> pro název události.</div>
  </div>

  <!-- Šablona pro nepotvrzené účastníky -->
  <div>
    <h2>Šablona pro Nepotvrzené Účastníky</h2>
    <p class='text-muted'>Tento e-mail se odesílá účastníkům, kteří ještě nepotvrdili účast, týden před koncertem.</p>
    <textarea class='form-control' id='mailSettingsUnconfirmedTemplate' rows='10' placeholder='Vložte HTML šablonu pro nepotvrzené účastníky'></textarea>
    <div class='form-text'>Použijte HTML kód pro vytvoření e-mailu. Můžete využít značky jako <code>{FULLNAME}</code>, <code>{EVENTNAME}</code> a <code>{EVENTDATE}</code>.</div>
  </div>

  <!-- Tlačítka pro uložení -->
  <div class='mt-4 d-flex justify-content-end'>
    <button type='button' class='btn btn-primary' onclick='emailSettingsSaveBtnClick()'>
      <i class='bi bi-save'></i> Uložit Změny
    </button>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}