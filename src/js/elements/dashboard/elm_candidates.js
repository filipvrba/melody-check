import CDatabase from "../../components/elm-dashboard-candidates/database";

export default class ElmDashboardCandidates extends HTMLElement {
  get eventId() {
    return this._eventId
  };

  constructor() {
    super();
    this._hUpdateDelay = e => this.updateDelay(e.detail.value);
    this._eventId = this.getAttribute("event-id");
    this.initElm();
    this._listBody = this.querySelector("#dashboardCandidatesListBody");
    this._cDatabase = new CDatabase(this)
  };

  connectedCallback() {
    Events.connect("#app", "updateDelay", this._hUpdateDelay);
    return this.updateListBody()
  };

  disconnectedCallback() {
    return Events.disconnect("#app", "updateDelay", this._hUpdateDelay)
  };

  updateDelay(isConnected) {
    if (isConnected) return this.updateListBody()
  };

  updateListBody() {
    return this._cDatabase.getCandidates((candidates) => {
      let elements = [];
      let haveCandidates = candidates.length > 0;

      if (haveCandidates) {
        for (let candidate of candidates) {
          let templateCheck = "<i class='bi bi-check-circle-fill text-success'></i>";
          let templateX = "<i class='bi bi-x-circle-fill text-danger'></i>";
          let template = `${`
          <tr>
            <th scope='row'>${candidate.id}</th>
            <td>${candidate.fullName}</td>
            <td>${candidate.email}</td>
            <td class='text-center'>
              ${candidate.confirmedAttendance ? templateCheck : templateX}
            </td>
          </tr>
          `}`;
          elements.push(template)
        };

        return this._listBody.innerHTML = elements.join("")
      } else {
        return this._listBody.innerHTML = `${`
        <tr>
          <th scope='row'></th>
          <td class='text-center'>---</td>
          <td class='text-center'>žádní účastníci</td>
          <td class='text-center'>---</td>
        </tr>
        `}`
      }
    })
  };

  initElm() {
    let template = `${`
<div class='container my-5'>
  <h1 class='text-center mb-4'>Účastníci</h1>

  <!-- Tabulka kandidátů -->
  <div class='table-responsive rounded shadow'>
    <table class='table table-striped table-hover align-middle mb-0'>
      <thead class='table-dark'>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Celé Jméno</th>
          <th scope='col'>Email</th>
          <th scope='col' class='text-center'>Potvrzená Účast</th>
        </tr>
      </thead>
      <tbody id='dashboardCandidatesListBody'>
        <tr>
          <th scope='row'></th>
          <td class='text-center'>---</td>
          <td class='text-center'>načítání</td>
          <td class='text-center'>---</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}