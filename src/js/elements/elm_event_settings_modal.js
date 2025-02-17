export default class ElmEventSettingsModal extends HTMLElement {
  constructor() {
    super();
    this._hView = e => this.view(e.detail.value);
    this._lPopstate = e => this.popstate(e);
    this.initElm();
    let candidateImportsModal = this.querySelector("#eventSettingsCandidateImportsModal");
    this._containerCandidates = this.querySelector("#eventSettingsCandidateImportsModalContainer");
    this._bootstrapCandidateImportsModal = new bootstrap.Modal(candidateImportsModal)
  };

  connectedCallback() {
    Events.connect("#app", ElmEventSettingsModal.ENVS.view, this._hView);
    return window.addEventListener("popstate", this._lPopstate)
  };

  disconnectedCallback() {
    Events.disconnect(
      "#app",
      ElmEventSettingsModal.ENVS.view,
      this._hView
    );

    return window.removeEventListener("popstate", this._lPopstate)
  };

  popstate(event) {
    return Events.emit(
      "#eventSettingsCandidateImportsModal",
      "modal.hide"
    )
  };

  view(data) {
    if (data.length === 0) return;
    let elementCandidates = [];
    let candidates = data.map(h => h.data);

    for (let candidate of candidates) {
      let template = `${`
      <li class='list-group-item'>
        <strong>${candidate.fullName}</strong><br><small>${candidate.email}</small>
      </li>
      `}`;
      elementCandidates.push(template)
    };

    this._containerCandidates.innerHTML = elementCandidates.join("");
    return this._bootstrapCandidateImportsModal.show()
  };

  initElm() {
    let template = `${`
<div class='modal fade' id='eventSettingsCandidateImportsModal' tabindex='-1' aria-labelledby='eventSettingsCandidateImportsModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='eventSettingsCandidateImportsModalLabel'>
          <i class='bi bi-exclamation-triangle-fill text-danger'></i> Neimportovaní kandidáti
        </h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Zavřít'></button>
      </div>
      <div class='modal-body'>
        <ul id='eventSettingsCandidateImportsModalContainer' class='list-group'>
            <!-- Dynamicky generovaný seznam -->
        </ul>
      </div>
      <div class='modal-footer'>
        <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Zavřít</button>
      </div>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
};

ElmEventSettingsModal.ENVS = {view: "eesm-view-0"}