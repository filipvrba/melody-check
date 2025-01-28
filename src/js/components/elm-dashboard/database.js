import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getEventId(callback) {
    let query = `SELECT id FROM events WHERE user_id = ${this._parent.userId};`;

    return Net.bef(query, (rows) => {
      let eventId;
      let haveEvent = rows.length > 0;

      if (haveEvent) {
        eventId = rows[0].id;
        if (callback) return callback(eventId)
      } else if (callback) {
        return callback(null)
      }
    })
  }
}