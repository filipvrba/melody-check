import CDatabase from "../components/elm-emails-settings/database";
import CSpinner from "../packages/template-rjs-0.1.1/components/spinner";
import CContents from "../components/elm-emails-settings/contents";
import CInputs from "../components/elm-emails-settings/inputs";

export default class ElmEmailsSettings extends HTMLElement {
  get userId() {
    return this._userId
  };

  get cSpinner() {
    return this._cSpinner
  };

  get cDatabase() {
    return this._cDatabase
  };

  constructor() {
    super();
    this._userId = this.getAttribute("user-id");
    this.initElm();
    this._cSpinner = new CSpinner(this);
    this._cDatabase = new CDatabase(this);
    this._cContents = new CContents(this);
    this._cInputs = new CInputs(this)
  };

  connectedCallback() {
    return this._cContents.updateListContainer()
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`
<div class='container my-5'>
  <div id='emailsSettingsListEmails' class='card'>
    <elm-spinner id='spinnerOne' class='spinner-overlay'></elm-spinner>

    <div class='card-body'>
      <div class='d-flex justify-content-between align-items-center'>
        <h5 class='card-title'>Emailové šablony</h5>
      </div>

      <ul id='emailsSettingsListContainer' class='list-group mt-4'></ul>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}