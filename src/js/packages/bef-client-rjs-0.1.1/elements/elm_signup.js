import CSpinner from "../../template-rjs-0.1.1/components/spinner";
import CInputs from "../components/elm-signup/inputs";
import CDatabase from "../components/elm-signup/database";
import CDatabaseSignin from "../components/elm-signin/database";
import CProtectSignin from "../components/elm-signin/protect";

export default class ElmSignup extends HTMLElement {
  constructor() {
    super();

    this._hBtnClick0 = e => (
      this.btnClickValuesAreValid(
        e.detail.value.email,
        e.detail.value.password
      )
    );

    this._language = Language.relevant.elmSignup;
    this.initElm();
    this._cInputs = new CInputs(this);
    this._cSpinner = new CSpinner(this);
    this._cSpinner.setDisplay(false);
    this._cDatabase = new CDatabase(this._cSpinner);
    this._cDatabaseSignin = new CDatabaseSignin(this._cSpinner);
    this._cProtectSignin = new CProtectSignin()
  };

  connectedCallback() {
    this._cInputs.connectedCallback();

    return Events.connect(
      "#app",
      CInputs.ENVS.btnClick0,
      this._hBtnClick0
    )
  };

  disconnectedCallback() {
    this._cInputs.disconnectedCallback();

    return Events.disconnect(
      "#app",
      CInputs.ENVS.btnClick0,
      this._hBtnClick0
    )
  };

  signupUpdate(isConnected) {
    return Bootstrap.changeDisableElement(
      this._cInputs.registerSignupBtn,
      !isConnected
    )
  };

  btnClickValuesAreValid(email, password) {
    let options = {email, password};

    return this._cDatabase.addNewUser(options, isAdded => (
      isAdded ? this.signin(options) : this._cInputs.removeValuesFromInputs()
    ))
  };

  signin(options) {
    return this._cDatabaseSignin.signin(options, (userId) => {
      let token, date;

      if (userId) {
        let [token, date] = this._cProtectSignin.writeNewToken();

        return this._cDatabaseSignin.addToken(
          {id: userId, token, date},
          () => location.hash = "dashboard"
        )
      } else {
        return location.hash = "signin"
      }
    })
  };

  initElm() {
    let template = `${`
<elm-spinner class='spinner-overlay'></elm-spinner>

<div class='container d-flex justify-content-center align-items-center vh-100'>
  <div class='card shadow p-4' style='width: 100%; max-width: 400px;'>
    <div class='card-body'>
      <h2 class='card-title text-center mb-4'>${this._language[0]}</h2>
      <!-- Email -->
      <div class='mb-3'>
        <label for='emailSignup' class='form-label'>${this._language[1]}</label>
        <div class='input-group'>
          <span class='input-group-text'><i class='bi bi-person-fill'></i></span>
          <input type='email' id='emailSignup' class='form-control' placeholder='${this._language[2]}' required='' autocomplete='off'>
          <div id='emailSignupFeedback' class='invalid-feedback'>
            ${this._language[3]}
          </div>
        </div>
      </div>
      <!-- Heslo -->
      <div class='mb-3'>
        <label for='passwordSignup' class='form-label'>${this._language[4]}</label>
        <div class='input-group'>
          <span class='input-group-text'><i class='bi bi-lock-fill'></i></span>
          <input type='password' id='passwordSignup' class='form-control' placeholder='${this._language[5]}' required='' autocomplete='new-password'>
          <div id='passwordSignupFeedback' class='invalid-feedback'>
            ${this._language[6]}
          </div>
        </div>
      </div>
      <!-- Ověření hesla -->
      <div class='mb-3'>
        <label for='confirmPasswordSignup' class='form-label'>${this._language[7]}</label>
        <div class='input-group'>
          <span class='input-group-text'><i class='bi bi-lock-fill'></i></span>
          <input type='password' id='confirmPasswordSignup' class='form-control' placeholder='${this._language[8]}' required='' autocomplete='new-password'>
          <div id='confirmPasswordSignupFeedback' class='invalid-feedback'>
            ${this._language[9]}
          </div>
        </div>
      </div>
      <!-- Tlačítko Registrovat -->
      <div class='d-grid mb-3'>
        <button id='registerSignupBtn' class='btn btn-primary' onclick='btnSignUpClick()'>${this._language[10]}</button>
      </div>
      <!-- Odkaz na přihlášení -->
      <div class='text-center'>
        <p class='mb-0'>${this._language[11]} <a href='#signin' class='text-primary'>${this._language[12]}</a></p>
      </div>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}