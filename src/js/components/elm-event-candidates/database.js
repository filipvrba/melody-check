import CDatabaseEventSignup from "../elm-event-signup/database";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent;
    this._cDatabaseEventSignup = new CDatabaseEventSignup(this._parent)
  };

  getEvent(callback) {
    return this._cDatabaseEventSignup.getEvent((rows) => {
      if (callback) return callback(rows)
    })
  }
}