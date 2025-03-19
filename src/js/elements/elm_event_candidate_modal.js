import CInputs from "../components/elm-event-candidate-modal/inputs";
import CContents from "../components/elm-event-candidate-modal/contents";
import CDatabase from "../components/elm-event-candidate-modal/database";
import CSpinner from "../packages/template-rjs-0.1.1/components/spinner";

export default class ElmEventCandidateModal extends HTMLElement {
  get candidateId() {
    return this._candidate.id
  };

  constructor() {
    super();

    this._lPopstate = () => {
      return this.popstate()
    };

    this._hShow = e => this.show(e.detail.value);
    this._candidate = null;
    this._callback = null;
    this.initElm();
    let modalCandidate = this.querySelector("#eventCandidateModal");
    this._bsModalCandidate = new bootstrap.Modal(modalCandidate);
    this._cSpinner = new CSpinner(this);
    this._cInputs = new CInputs(this);
    this._cContents = new CContents(this);
    this._cDatabase = new CDatabase(this);
    this._cSpinner.setDisplay(false)
  };

  connectedCallback() {
    window.addEventListener("popstate", this._lPopstate);
    Events.connect("#app", ElmEventCandidateModal.ENVS.show, this._hShow);
    return this._cInputs.connectedCallback()
  };

  disconnectedCallback() {
    window.removeEventListener("popstate", this._lPopstate);

    Events.disconnect(
      "#app",
      ElmEventCandidateModal.ENVS.show,
      this._hShow
    );

    return this._cInputs.disconnectedCallback()
  };

  popstate() {
    return this._bsModalCandidate.hide()
  };

  show(candidate) {
    if (this._bsModalCandidate._isShown) return;
    this._candidate = candidate.params;
    this._callback = candidate.callback;
    this._cContents.setInputs(this._candidate);
    return this._bsModalCandidate.show()
  };

  btnSaveClick(params) {
    this._cSpinner.setDisplay(true);

    return this._cDatabase.updateCandidate(params, (message) => {
      this._cSpinner.setDisplay(false);

      if (message) {
        if (this._callback) this._callback();
        return this._bsModalCandidate.hide()
      }
    })
  };

  initElm() {
    let template = `${`
<div class='modal fade' id='eventCandidateModal' tabindex='-1' aria-labelledby='eventCandidateModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <elm-spinner class='spinner-overlay'></elm-spinner>

      <div class='modal-header'>
        <h5 class='modal-title' id='eventCandidateModalLabel'>Upravit uživatele</h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Zavřít'></button>
      </div>
      <div class='modal-body'>
        <div class='mb-3'>
          <label for='eventCandidateModaFullName' class='form-label'>Plné jméno</label>
          <input type='text' class='form-control' id='eventCandidateModaFullName' placeholder='Zadejte plné jméno' data-button-id='eventCandidateModaBtnSave'>
          <div id='eventCandidateModaFullNameFeedback' class='invalid-feedback'>
            Zadané plné jméno je nesprávné.
          </div>
        </div>
        <div class='mb-3'>
          <label for='eventCandidateModaEmail' class='form-label'>E-mail</label>
          <input type='email' class='form-control' id='eventCandidateModaEmail' placeholder='Zadejte e-mail' data-button-id='eventCandidateModaBtnSave'>
          <div id='eventCandidateModaEmailFeedback' class='invalid-feedback'>
            Zadaný email je nesprávný.
          </div>
        </div>
      </div>
      <div class='modal-footer'>
        <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Zavřít</button>
        <button id='eventCandidateModaBtnSave' type='button' class='btn btn-success' onclick='eventCandidateModalBtnSaveClick()'>Uložit</button>
      </div>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
};

ElmEventCandidateModal.ENVS = {show: "ecanm-show-0"}