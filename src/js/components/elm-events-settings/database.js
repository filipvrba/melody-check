import Net from "../../core/net";
import CDatabaseEventSettings from "../elm-event-settings/database";

export default class CDatabase {
  get userId() {
    return this._parent.userId
  };

  get eventId() {
    return this._parent.cInputs.eventIdHistory
  };

  get cSpinner() {
    return this._parent.cSpinner
  };

  constructor(parent) {
    this._parent = parent;
    this._cDatabaseEventSettings = new CDatabaseEventSettings(this)
  };

  getEventDetails(callback) {
    return this._cDatabaseEventSettings.getEventDetails((rows) => {
      if (callback) return callback(rows)
    })
  };

  setEventDetails(eventName, eventDate, callback) {
    return this._cDatabaseEventSettings.setEventDetails(
      eventName,
      eventDate,

      (message) => {
        if (callback) return callback(message)
      }
    )
  };

  removeEvent(callback) {
    let query = `DELETE FROM events WHERE id = ${this.eventId};`;
    this.cSpinner.setDisplayWithId(true, "#spinnerOne");

    return Net.bef(query, (message) => {
      this.cSpinner.setDisplayWithId(false, "#spinnerOne");
      if (callback) return callback(message)
    })
  }
}