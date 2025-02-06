import CContentsEventSignup from "../elm-event-signup/contents";

export default class CContents {
  constructor(parent) {
    this._parent = parent;
    this._cContents = new CContentsEventSignup(this._parent)
  };

  getNoevent() {
    return this._cContents.getNoevent()
  };

  getNoparams() {
    return this._cContents.getNoparams()
  };

  getPageCandidates(eventName) {
    return `${`
<div class='container col-lg-8 my-5'>
  <h1 class='text-center mb-4'>${eventName}</h1>
  <h2 class='text-center mb-3'>Účastnící</h2>
  <elm-dashboard-candidates event-id='${this._parent.eventId}' no-emails></elm-dashboard-candidates>
</div>
    `}`
  }
}