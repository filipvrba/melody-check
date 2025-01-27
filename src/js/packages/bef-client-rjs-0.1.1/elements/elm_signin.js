import CInputs from "../components/elm-signin/inputs";
import CDatabase from "../components/elm-signin/database";
import CProtect from "../components/elm-signin/protect";
import CSpinner from "../../template-rjs-0.1.1/components/spinner";

export default class ElmSignin extends HTMLElement {
  constructor() {
    super();

    this._hBtnClick0 = e => (
      this.btnClickValuesAreValid(
        e.detail.value.email,
        e.detail.value.password
      )
    );

    this._language = Language.relevant.elmSignin;
    this.initElm();
    this._cInputs = new CInputs(this);
    this._cProtect = new CProtect();
    this._cSpinner = new CSpinner(this);
    this._cSpinner.setDisplay(false);
    this._cDatabase = new CDatabase(this._cSpinner)
  };

  connectedCallback() {
    Events.connect("#app", CInputs.ENVS.btnClick0, this._hBtnClick0);
    return this._cInputs.connectedCallback()
  };

  disconnectedCallback() {
    Events.disconnect("#app", CInputs.ENVS.btnClick0, this._hBtnClick0);
    return this._cInputs.disconnectedCallback()
  };

  signinUpdate(isConnected) {
    return Bootstrap.changeDisableElement(
      this._cInputs.inputLogin,
      !isConnected
    )
  };

  btnClickValuesAreValid(email, password) {
    return this._cDatabase.signin({email, password}, (userId) => {
      let token, date;

      if (userId) {
        let [token, date] = this._cProtect.writeNewToken();

        return this._cDatabase.addToken(
          {id: userId, token, date},
          () => location.hash = "dashboard"
        )
      } else {
        return this._cInputs.removeValuesFromInputs()
      }
    })
  };

  initElm() {
    return this.innerHTML = `${`
<elm-spinner class='spinner-overlay'></elm-spinner>

<div class='container d-flex justify-content-center align-items-center vh-100'>
  <div class='card shadow p-4' style='width: 100%; max-width: 400px;'>
    <div class='card-body'>
      <h2 class='card-title text-center mb-4'>${this._language[0]}</h2>
      <!-- email -->
      <div class='mb-3'>
        <label for='emailSignin' class='form-label'>${this._language[1]}</label>
        <div class='input-group'>
          <span class='input-group-text'><i class='bi bi-person-fill'></i></span>
          <input type='email' id='emailSignin' class='form-control' placeholder='${this._language[2]}' required>
          <div id='emailSigninFeedback' class='invalid-feedback'>
            ${this._language[3]}
          </div>
        </div>
      </div>
      <!-- Heslo -->
      <div class='mb-3'>
        <label for='passwordSignin' class='form-label'>${this._language[4]}</label>
        <div class='input-group'>
          <span class='input-group-text'><i class='bi bi-lock-fill'></i></span>
          <input type='password' id='passwordSignin' class='form-control' placeholder='${this._language[5]}' required>
          <div id='passwordSigninFeedback' class='invalid-feedback'>
            ${this._language[6]}
          </div>
        </div>
      </div>
      <!-- Tlačítko Přihlásit se -->
      <div class='d-grid mb-3'>
        <button id='loginSigninBtn' class='btn btn-primary' onclick='btnSignInClick()'>${this._language[7]}</button>
      </div>
      <!-- Odkaz na registraci -->
      <div class='text-center'>
        <p class='mb-0'>${this._language[8]} <a href='#signup' class='text-primary'>${this._language[9]}</a></p>
      </div>
    </div>
  </div>
</div>
    `}`
  }
}