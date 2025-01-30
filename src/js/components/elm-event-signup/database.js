import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getEvent(callback) {
    let query = `SELECT event_name FROM events WHERE id = ${this._parent.eventId};`;

    return Net.bef(query, (rows) => {
      let decodeEvents = rows.map(h => ({name: h.event_name.decodeBase64()}));
      let haveEvents = decodeEvents.length > 0;

      if (haveEvents) {
        if (callback) return callback(decodeEvents[0])
      } else if (callback) {
        return callback(null)
      }
    })
  }
}