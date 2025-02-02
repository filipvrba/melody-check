import CDatabaseUserType from "../elm-user-type-settings/database";
import CDatabaseEventSettings from "../elm-event-settings/database";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent;
    this._cDatabaseUserType = new CDatabaseUserType(this._parent);
    this._cDatabaseEventSettings = new CDatabaseEventSettings(this._parent)
  };

  getUserType(callback) {
    return this._cDatabaseUserType.getUserType((userType) => {
      if (callback) return callback(userType)
    })
  };

  getEventDetails(callback) {
    return this._cDatabaseEventSettings.getEventDetails((eventDetails) => {
      if (callback) return callback(eventDetails)
    })
  }
}