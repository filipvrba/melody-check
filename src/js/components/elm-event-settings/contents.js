export default class CContents {
  constructor(parent) {
    this._parent = parent;
    this._listCandidates = this._parent.querySelector("#eventSettingsListCandidates");
    this._listContainer = this._parent.querySelector("#eventSettingsListContainer");
    this.changeVisibility(false)
  };

  updateListContainer() {
    return this._parent.cDatabase.getCandidates((candidates) => {
      let elmLis = [];

      for (let candidate of candidates) {
        let template = `${`
<li class='list-group-item d-flex justify-content-between align-items-center'>
  <span>${candidate.fullName} (${candidate.email})</span>
  <button type='button' class='btn btn-danger btn-sm' onclick='eventSettingsListRemoveBtnClick(${candidate.id})'>
    <i class='bi bi-trash'></i>
  </button>
</li>
        `}`;
        elmLis.push(template)
      };

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