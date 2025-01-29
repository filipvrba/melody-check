import CDatabase from "../components/elm-confirm/database";
import CContents from "../components/elm-confirm/contents";

export default class ElmConfirm extends HTMLElement {
  get candidateId() {
    return this._candidateId
  };

  get eventId() {
    return this._eventId
  };

  get haveParams() {
    return this._haveParams
  };

  constructor() {
    super();
    this._candidateId = URLParams.getIndex("candidate_id");
    this._eventId = URLParams.getIndex("event_id");
    this._haveParams = this._candidateId !== 0 && this._eventId !== 0;
    this._cDatabase = new CDatabase(this);
    this._cContents = new CContents(this);

    if (this._haveParams) {
      this._cDatabase.getInformations((informations) => {
        if (informations) {
          return informations.confirmedAttendance ? this.innerHTML = this._cContents.confirmAgainContent(
            informations.fullName,
            informations.eventName
          ) : this._cDatabase.updateConfirmedAttendance(() => (
            this.innerHTML = this._cContents.confirmContent(
              informations.fullName,
              informations.eventName
            )
          ))
        } else {
          return this.innerHTML = this._cContents.noInformationsContent()
        }
      })
    } else {
      this.innerHTML = this._cContents.errorContent()
    }
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  }
}