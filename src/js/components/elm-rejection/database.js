import Net from "../../core/net";
import CDatabaseConfirm from "../elm-confirm/database";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent;
    this._cDatabaseConfirm = new CDatabaseConfirm(this._parent)
  };

  getInformations(callback) {
    return this._cDatabaseConfirm.getInformations((rows) => {
      if (callback) return callback(rows)
    })
  };

  updateConfirmedAttendance(callback) {
    return this._cDatabaseConfirm.updateConfirmedAttendance(
      2,

      (message) => {
        if (callback) return callback(message)
      }
    )
  }
}