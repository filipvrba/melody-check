import AProtected from "../packages/bef-client-rjs-0.1.1/elements/abstracts/protected";
import CTimer from "../packages/bef-client-rjs-0.1.1/components/timer";
import CDatabase from "../components/elm-dashboard/database";

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
    this._cDatabase.getEventId((eventId) => {
      this._eventId = eventId;
      return this.updateContentContainer()
    });

    this.initElm();
    this._dashboardContainer = this.querySelector("#dashboardContainer");
    return this._dashboardContainer
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
      template = `<elm-dashboard-candidates event-id='${this._eventId}'></elm-dashboard-candidates>`
    } else {
      template = "<elm-dashboard-information></elm-dashboard-information>"
    };

    return this._dashboardContainer.innerHTML = template
  };

  initElm() {
    let template = `${`\n    <elm-header user-id='${this._userId}'></elm-header>\n    <div id='dashboardContainer'></div>\n    `}`;
    return this.innerHTML = template
  }
}