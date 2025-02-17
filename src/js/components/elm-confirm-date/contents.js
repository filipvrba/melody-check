export default class CContents {
  constructor(parent) {
    this._parent = parent;
    this._listContainer = this._parent.querySelector("#eventSettingsListContainer")
  };

  updateListContainer() {
    return this._parent.cDatabase.getDateWithTime((rows) => {
      let elmLis = [];

      for (let row of rows) {
        let date = row.arrival_date.split("-").reverse().join(". ");
        let time = row.arrival_time;
        let template = `${`
<li class='list-group-item d-flex justify-content-between align-items-center'>
  <span>
    <p class='card-title mb-0'>Čas: <strong>${time}</strong></p>
    <small>Datum: <strong>${date}</strong></small>
  </span>
  <button type='button' class='btn btn-danger btn-sm' onclick='elmConfirmDateInputRemoveBtnClick(${row.id})'>
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