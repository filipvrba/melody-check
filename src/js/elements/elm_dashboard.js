import AProtected from "../packages/bef-client-rjs-0.1.1/elements/abstracts/protected";
import CTimer from "../packages/bef-client-rjs-0.1.1/components/timer";
import CDatabase from "../components/elm-dashboard/database";
import CSpinner from "../packages/template-rjs-0.1.1/components/spinner";

export default class ElmDashboard extends AProtected {
  get userId() {
    return this._userId
  };

  get cDatabase() {
    return this._cDatabase
  };

  constructor() {
    super();
    this._eventId = null;
    this._contents = null;
    this._cDatabase = new CDatabase(this);
    this._cTimer = new CTimer(60)
  };

  protectedCallback() {
    this.initElm();
    this._dashboardContainer = this.querySelector("#dashboardContainer");
    this._cSpinner = new CSpinner(this);
    return this.fetchAndUpdateEvent()
  };

  fetchAndUpdateEvent() {
    return this._cDatabase.getEventId((eventId) => {
      this._cSpinner.setDisplay(false);
      this._eventId = eventId;
      return this.updateContentContainer()
    })
  };

  connectedCallback() {
    return this._cTimer.connectedCallback()
  };

  disconnectedCallback() {
    return this._cTimer.disconnectedCallback()
  };

  updateContentContainer() {
    let template = null;

    if (this._eventId) {
      template = `${`
      <div class='container my-5'>
        <h1 class='text-center mb-4'>Účastníci</h1>
        <elm-dashboard-candidates event-id='${this._eventId}'></elm-dashboard-candidates>
      </div>
      `}`
    } else {
      template = "<elm-dashboard-information></elm-dashboard-information>"
    };

    return this._dashboardContainer.innerHTML = template
  };

  initElm() {
    let template = `${`
    <elm-spinner id='spinnerOne' class='spinner-overlay'></elm-spinner>
    <elm-header user-id='${this._userId}'></elm-header>
    <div id='dashboardContainer'></div>
    `}`;
    return this.innerHTML = template
  }
}