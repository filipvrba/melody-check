export default class CContents {
  constructor(parent) {
    this._parent = parent;
    this._listContainer = this._parent.querySelector("#emailsSettingsListContainer")
  };

  updateListContainer() {
    return this._parent.cDatabase.getEventDetails((eventDetails) => {
      if (!eventDetails) return;
      let elements = [];

      for (let event of eventDetails) {
        let date = (new Date(event.date)).toLocaleDateString("cs-CZ");
        let template = `${`
        <li class='list-group-item d-flex justify-content-between align-items-center'>
          <span style='cursor: pointer;' onclick='emailsSettingsListInputEditBtnClick(${event.id})'>
            <h5 class='card-title mb-0'><ins>${event.name}</ins></h5>
            <small class='text-muted'>Datum: ${date}</small>
          </span>
        </li>
        `}`;
        elements.push(template)
      };

      return this._listContainer.innerHTML = elements.join("")
    })
  }
}