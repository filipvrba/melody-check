export default class CContents {
  constructor(parent) {
    this._parent = parent
  };

  getRegistrationForm() {
    return `${`
<div class='container mt-5'>
  <div class='card col-lg-8 mx-auto'>
    <elm-spinner id='spinnerTwo' class='spinner-overlay'></elm-spinner>

    <div class='card-header bg-primary text-white'>
      <h3><i class='bi bi-calendar-check'></i> Registrace na událost</h3>
    </div>
    <div class='card-body'>
      <div class='mb-3'>
        <label for='eventSignupEventName' class='form-label'>Událost</label>
        <input type='text' id='eventSignupEventName' class='form-control' readonly>
      </div>
      <div class='mb-3'>
        <label for='eventSignupFullName' class='form-label'>Celé jméno</label>
        <div class='input-group'>
          <span class='input-group-text'><i class='bi bi-person'></i></span>
          <input type='text' class='form-control' id='eventSignupFullName' placeholder='Zadejte své jméno' required>
          <div id='eventSignupFullNameFeedback' class='invalid-feedback'>
            Zadané celé jméno je nesprávné.
          </div>
        </div>
      </div>
      <div class='mb-3'>
        <label for='eventSignupEmail' class='form-label'>Email</label>
        <div class='input-group'>
          <span class='input-group-text'><i class='bi bi-envelope'></i></span>
          <input type='email' class='form-control' id='eventSignupEmail' placeholder='Zadejte svůj email' required>
          <div id='eventSignupEmailFeedback' class='invalid-feedback'>
            Zadaný email je nesprávný.
          </div>
        </div>
      </div>
      <button id='eventSignupBtnSignup' class='btn btn-success w-100' onclick='eventSignupBtnSignupClick()'>
        <i class='bi bi-check-circle'></i> Registrovat se
      </button>
    </div>
  </div>
</div>
    `}`
  };

  getNoevent() {
    return `${`
<div class='container d-flex justify-content-center align-items-center vh-100'>
  <div class='text-center'>
    <i class='bi bi-exclamation-triangle display-1 text-danger'></i>
    <h1 class='mt-3'>Událost nenalezena</h1>
    <p class='lead'>Omlouváme se, ale událost, kterou hledáte, neexistuje nebo byla odstraněna.</p>
  </div>
</div>
    `}`
  };

  getNoparams() {
    return `${`
<div class='container d-flex justify-content-center align-items-center vh-100'>
  <div class='text-center'>
    <i class='bi bi-slash-circle display-1 text-warning'></i>
    <h1 class='mt-3'>Chybějící parametr</h1>
    <p class='lead'>Omlouváme se, ale v URL chybí požadovaný parametr. Zkontrolujte adresu a zkuste to znovu.</p>
  </div>
</div>
    `}`
  };

  getRegistrationSuccessful(eventName) {
    return `${`
<div class='container d-flex justify-content-center align-items-center vh-100'>
  <div class='text-center'>
    <i class='bi bi-check-circle display-1 text-success'></i>
    <h1 class='mt-3'>Registrace úspěšná!</h1>
    <p class='lead'>Byli jste úspěšně registrováni na událost <strong>'${eventName}'</strong>.</p>
    <p>Na váš <strong>e-mail</strong> jsme odeslali <strong>potvrzení</strong>. Prosím, otevřete ho a <strong>potvrďte svou účast</strong>.</p>
  </div>
</div>
  `}`
  }
}