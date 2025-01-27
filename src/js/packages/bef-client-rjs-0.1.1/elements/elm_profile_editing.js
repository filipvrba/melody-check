import CInput from "../components/elm-profile-editing/inputs";
import CInputChangePassword from "../components/elm-profile-editing/inputs_change_password";
import CDatabase from "../components/elm-profile-editing/database";
import CSpinner from "../../template-rjs-0.1.1/components/spinner";

export default class ElmProfileEditing extends HTMLElement {
  get userId() {
    return this._userId
  };

  get cDatabase() {
    return this._cDatabase
  };

  get language() {
    return this._language
  };

  get cSpinner() {
    return this._cSpinner
  };

  constructor() {
    super();
    this._language = Language.relevant.elmProfileEditing;
    this._userId = this.getAttribute("user-id");
    this.initElm();
    this._cSpinner = new CSpinner(this);
    this._cDatabase = new CDatabase(this);
    this._cInputs = new CInput(this);
    this._cInputChangePassword = new CInputChangePassword(this)
  };

  connectedCallback() {
    return this._cInputChangePassword.connectedCallback()
  };

  disconnectedCallback() {
    return this._cInputChangePassword.disconnectedCallback()
  };

  settingsUpdate(isConnected) {
    this._cInputs.disableUpdate(isConnected);
    return this._cInputChangePassword.disableUpdate(isConnected)
  };

  initElm() {
    let template = `${`
<div class='container col-lg-6 my-5'>
  <!-- Sekce pro změnu hesla -->
  <div class='card mb-4'>
    <elm-spinner class='spinner-overlay'></elm-spinner>

    <div class='card-header'>
      <h5><i class='bi bi-key-fill'></i> ${this._language[4]}</h5>
    </div>
    <div class='card-body'>
      <div class='mb-3'>
        <label for='profileEditingCurrentPassword' class='form-label'>${this._language[5]}</label>
        <input type='password' id='profileEditingCurrentPassword' class='form-control' required autocomplete='new-password'>
        <div id='profileEditingCurrentPasswordFeedback' class='invalid-feedback'>
          ${this._language[6]}
        </div>
      </div>
      <div class='mb-3'>
        <label for='profileEditingNewPassword' class='form-label'>${this._language[7]}</label>
        <input type='password' id='profileEditingNewPassword' class='form-control' required autocomplete='new-password'>
        <div id='profileEditingNewPasswordFeedback' class='invalid-feedback'>
          ${this._language[8]}
        </div>
      </div>
      <div class='mb-3'>
        <label for='profileEditingConfirmNewPassword' class='form-label'>${this._language[9]}</label>
        <input type='password' id='profileEditingConfirmNewPassword' class='form-control' required autocomplete='new-password'>
        <div id='profileEditingConfirmNewPasswordFeedback' class='invalid-feedback'>
          ${this._language[10]}
        </div>
        <div id='profileEditingConfirmNewPasswordValidFeedback' class='valid-feedback'>
          ${this._language[11]}
        </div>
      </div>
      <button id='profileEditingChangePasswordBtn' onclick='profileEditingChangePasswordBtnClick()' class='btn btn-primary'><i class='bi bi-save-fill'></i> ${this._language[12]}</button>
    </div>
  </div>

  <!-- Sekce pro vymazání účtu -->
  <div class='card'>
    <div class='card-header'>
      <h5><i class='bi bi-trash-fill'></i> ${this._language[0]}</h5>
    </div>
    <div class='card-body'>
      <p>${this._language[1]}</p>
      <button id='profileEditingAccountDeletionBtn' onclick='profileEditingAccountDeletion()' class='btn btn-danger'><i class='bi bi-exclamation-triangle-fill'></i> ${this._language[2]}</button>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}