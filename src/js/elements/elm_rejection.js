import CDatabase from "../components/elm-rejection/database";
import CContents from "../components/elm-rejection/contents";

export default class ElmRejection extends HTMLElement {
  get candidateId() {
    return this._candidateId
  };

  get eventId() {
    return this._eventId
  };

  constructor() {
    super();
    this._candidateId = URLParams.getIndex("candidate_id");
    this._eventId = URLParams.getIndex("event_id");
    this._haveParams = this._candidateId !== 0 && this._eventId !== 0;
    this._cDatabase = new CDatabase(this);
    this._cContents = new CContents(this);
    this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    return this._haveParams ? this._cDatabase.getInformations((informations) => {
      if (informations) {
        return informations.confirmedAttendance === 2 ? this.innerHTML = this._cContents.rejectionAgainContent(
          informations.fullName,
          informations.eventName
        ) : this._cDatabase.updateConfirmedAttendance(() => (
          this.innerHTML = this._cContents.rejectionContent(
            informations.fullName,
            informations.eventName
          )
        ))
      } else {
        return this.innerHTML = this._cContents.noInformationsContent()
      }
    }) : this.innerHTML = this._cContents.errorContent()
  }
}