import CDatabase from "../../components/elm-dashboard-candidates/database";

export default class ElmDashboardCandidates extends HTMLElement {
  get eventId() {
    return this._eventId
  };

  constructor() {
    super();
    this._hUpdateDelay = e => this.updateDelay(e.detail.value);
    this._eventId = this.getAttribute("event-id");
    this._noEmails = this.getAttribute("no-emails") === "";
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

  getConfirmIconElement(confirmedAttendance) {
    switch (parseInt(confirmedAttendance)) {
    case 0:
      return "<i class='bi bi-hourglass-split text-warning'></i>";

    case 1:
      return "<i class='bi bi-check-circle-fill text-success'></i>";

    case 2:
      return "<i class='bi bi-x-circle-fill text-danger'></i>"
    }
  };

  updateListBody() {
    return this._cDatabase.getCandidates((candidates) => {
      let elements = [];
      let haveCandidates = candidates.length > 0;

      if (haveCandidates) {
        for (let candidate of candidates) {
          let icon = this.getConfirmIconElement(candidate.confirmedAttendance);
          let tdEmail = this._noEmails ? "<td></td>" : `<td>${candidate.email}</td>`;
          let template = `${`
          <tr>
            <th scope='row'>${candidate.id}</th>
            <td>${candidate.fullName}</td>
            ${tdEmail}
            <td class='text-center'>
              ${icon}
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
    let thEmail = this._noEmails ? "<th scope='col'></th>" : "<th scope='col'>Email</th>";
    let template = `${`
<!-- Tabulka kandidátů -->
<div class='table-responsive rounded shadow'>
  <table class='table table-striped table-hover align-middle mb-0'>
    <thead class='table-dark'>
      <tr>
        <th scope='col'>#</th>
        <th scope='col'>Celé Jméno</th>
        ${thEmail}
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
    `}`;
    return this.innerHTML = template
  }
}