export default class CContents {
  get listContainer() {
    return this._listContainer
  };

  constructor(parent) {
    this._parent = parent;
    this._listCandidates = this._parent.querySelector("#eventSettingsListCandidates");
    this._listContainer = this._parent.querySelector("#eventSettingsListContainer");
    this._candidates = [];
    this.changeVisibility(false)
  };

  getCandidate(index) {
    return this._candidates[index]
  };

  updateListContainer() {
    return this._parent.cDatabase.getCandidates((candidates) => {
      this._candidates = candidates;
      let elmLis = [];

      this._candidates.forEach((candidate, i) => {
        let template = `${`
<li class='list-group-item d-flex justify-content-between align-items-center'>
  <div class='form-check'>
    <input class='form-check-input' type='checkbox' value='' id='eventSettingsListItemCheck-${candidate.id}'>
    <span>${candidate.fullName} (${candidate.email})</span>
  </div>
  <div class='d-flex gap-2'>
    <button type='button' class='btn btn-secondary btn-sm' onclick='eventSettingsListEditBtnClick(${i})'>
      <i class='bi bi-pen'></i>
    </button>
  </div>
</li>
        `}`;
        return elmLis.push(template)
      });

      return this._listContainer.innerHTML = elmLis.join("")
    })
  };

  changeVisibility(isVisible) {
    return Bootstrap.changeVisibleElement(
      this._listCandidates,
      isVisible
    )
  }
}