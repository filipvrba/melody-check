export default class CContents {
  constructor(parent) {
    this._parent = parent;
    this._listContainer = this._parent.querySelector("#eventsSettingsListContainer")
  };

  updateListContainer() {
    return this._parent.cDatabase.getEventDetails((eventDetails) => {
      let elmLis = [];

      for (let event of eventDetails) {
        let date = (new Date(event.date)).toLocaleDateString("cs-CZ");
        let template = `${`
<li class='list-group-item d-flex justify-content-between align-items-center'>
  <span style='cursor: pointer;' onclick='eventsSettingsListInputEditBtnClick(${event.id})'>
    <h5 class='card-title mb-0'><ins>${event.name}</ins></h5>
    <small class='text-muted'>Datum: ${date}</small>
  </span>
  <button type='button' class='btn btn-danger btn-sm' onclick='eventsSettingsListInputRemoveBtnClick(${event.id})'>
    <i class='bi bi-trash'></i>
  </button>
</li>
        `}`;
        elmLis.push(template)
      };

      return this._listContainer.innerHTML = elmLis.join("")
    })
  }
}