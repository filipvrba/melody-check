import ElmDashboard from "./elm_dashboard";
import CDatabaseUserType from "../components/elm-user-type-dashboard/database";
import CContentsUserType from "../components/elm-user-type-dashboard/contents";
import CSpinner from "../packages/template-rjs-0.1.1/components/spinner";

export default class ElmUserTypeDashboard extends ElmDashboard {
  constructor() {
    super();
    this._cDatabaseUserType = new CDatabaseUserType(this)
  };

  connectedCallback() {
    return super.connectedCallback()
  };

  disconnectedCallback() {
    return super.disconnectedCallback()
  };

  protectedCallback() {
    this.initElm();
    this._cSpinner = new CSpinner(this);

    return this._cDatabaseUserType.getUserType((userType) => {
      switch (userType.id) {
      case 1:
        return super.protectedCallback();

      case 2:
        this._cContentsUserType = new CContentsUserType(this);
        this.fetchAndUpdateEvents()
      }
    })
  };

  fetchAndUpdateEvents() {
    return this._cDatabaseUserType.getEventDetails((eventDetails) => {
      this._cSpinner.setDisplay(false);

      if (!eventDetails) {
        this._cContentsUserType.initElmInformations();
        return
      };

      return this._cContentsUserType.initElmEvents(eventDetails)
    })
  };

  initElm() {
    return super.initElm()
  }
}