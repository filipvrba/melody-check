import CContents from "../components/elm-event-candidates/contents";
import CDatabase from "../components/elm-event-candidates/database";

export default class ElmEventCandidates extends HTMLElement {
  get eventId() {
    return this._eventId
  };

  constructor() {
    super();
    this._eventId = URLParams.getIndex("event_id") || null;
    this._haveParams = this._eventId && this._eventId !== 0;
    this._cContents = new CContents(this);
    this._cDatabase = new CDatabase(this);
    this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    return this._haveParams ? this._cDatabase.getEvent(event => (
      event ? this.initializeEvent(event.name) : this.innerHTML = this._cContents.getNoevent()
    )) : this.innerHTML = this._cContents.getNoparams()
  };

  initializeEvent(eventName) {
    return this.innerHTML = this._cContents.getPageCandidates(eventName)
  }
}