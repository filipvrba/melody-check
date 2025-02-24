import CInputs from "../components/elm-confirm-modal/inputs";

export default class ElmConfirmModal extends HTMLElement {
  get defaultOptions() {
    return this._defaultOptions
  };

  get bsModalConfirm() {
    return this._bsModalConfirm
  };

  get options() {
    return this._options
  };

  set options(options) {
    this._options = options
  };

  constructor() {
    super();

    this._lPopstate = () => {
      return this.popstate()
    };

    this._defaultOptions = {
      title: "<i class='bi bi-question-circle'></i> Potvrzení",
      message: "<p>Opravdu chcete provést tuto akci?</p>",
      fnTrue: null,
      fnFalse: null
    };

    this._options = structuredClone(this._defaultOptions);
    this.initElm();
    let modalConfirm = this.querySelector("#confirmModal");
    this._bsModalConfirm = new bootstrap.Modal(modalConfirm);
    this._cInputs = new CInputs(this)
  };

  connectedCallback() {
    this._cInputs.connectedCallback();
    return window.addEventListener("popstate", this._lPopstate)
  };

  disconnectedCallback() {
    this._cInputs.disconnectedCallback();
    return window.removeEventListener("popstate", this._lPopstate)
  };

  popstate() {
    return this._bsModalConfirm.hide()
  };

  initElm() {
    let template = `${`
<div class='modal fade' id='confirmModal' tabindex='-1' aria-labelledby='confirmModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='confirmModalLabel'></h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Zavřít'></button>
      </div>
      <div id='confirmModalMessage' class='modal-body'></div>
      <div class='modal-footer'>
        <button type='button' class='btn btn-secondary' data-bs-dismiss='modal' onclick='confirmModalNoBtnClick()'>Ne</button>
        <button type='button' class='btn btn-danger' data-bs-dismiss='modal' onclick='confirmModalYesBtnClick()'>Ano</button>
      </div>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}