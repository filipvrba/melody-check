import CDatabaseEventSettings from "../elm-event-settings/database";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent;
    this._cDatabaseEventSettings = new CDatabaseEventSettings(this._parent)
  };

  getEventDetails(callback) {
    return this._cDatabaseEventSettings.getEventDetails((rows) => {
      if (callback) return callback(rows)
    })
  }
}