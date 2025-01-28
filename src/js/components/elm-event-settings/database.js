import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getEventDetails(callback) {
    let query = `SELECT id, event_name, event_date FROM events WHERE user_id = ${this._parent.userId};`;
    this._parent.cSpinner.setDisplayWithId(true, "#spinnerOne");

    return Net.bef(query, (rows) => {
      let eventName, eventDate, result;
      this._parent.cSpinner.setDisplayWithId(false, "#spinnerOne");
      let haveEvent = rows.length > 0;

      if (haveEvent) {
        eventName = rows[0].event_name.decodeBase64();
        eventDate = rows[0].event_date.decodeBase64();
        result = {id: rows[0].id, title: eventName, date: eventDate};
        if (callback) return callback(result)
      } else if (callback) {
        return callback(null)
      }
    })
  };

  setEventDetails(title, date, callback) {
    let eventName = title.encodeBase64();
    let eventDate = date.encodeBase64();
    let query = `INSERT INTO events (user_id, event_name, event_date) VALUES (${this._parent.userId}, '${eventName}', '${eventDate}') ON CONFLICT(user_id) DO UPDATE SET event_name = excluded.event_name, event_date = excluded.event_date;`;
    this._parent.cSpinner.setDisplayWithId(true, "#spinnerOne");

    return Net.bef(query, (message) => {
      this._parent.cSpinner.setDisplayWithId(false, "#spinnerOne");
      if (callback) return callback(message)
    })
  };

  addCandidate(fullName, email, callback) {
    this._parent.cSpinner.setDisplayWithId(true, "#spinnerTwo");
    let encodeFullName = fullName.encodeBase64();
    let encodeEmail = email.encodeBase64();
    let queryAddCandidate = `INSERT INTO candidates (full_name, email, event_id) VALUES ('${encodeFullName}', '${encodeEmail}', ${this._parent.eventId});`;

    return Net.bef(queryAddCandidate, (message) => {
      this._parent.cSpinner.setDisplayWithId(false, "#spinnerTwo");

      if (message) {
        if (callback) return callback("tADDED")
      } else if (callback) {
        return callback("tNOADDED")
      }
    })
  };

  getCandidates(callback) {
    this._parent.cSpinner.setDisplayWithId(true, "#spinnerTwo");
    let query = `SELECT id, full_name, email FROM candidates WHERE event_id = ${this._parent.eventId};`;

    return Net.bef(query, (rows) => {
      let decodeRows;
      this._parent.cSpinner.setDisplayWithId(false, "#spinnerTwo");
      let haveCandidates = rows.length > 0;

      if (haveCandidates) {
        decodeRows = rows.map(h => ({
          id: h.id,
          fullName: h.full_name.decodeBase64(),
          email: h.email.decodeBase64()
        }));

        if (callback) return callback(decodeRows)
      } else if (callback) {
        return callback([])
      }
    })
  };

  removeCandidate(candidateId, callback) {
    let query = `DELETE FROM candidates WHERE id = ${candidateId};`;
    this._parent.cSpinner.setDisplayWithId(true, "#spinnerTwo");

    return Net.bef(query, (message) => {
      this._parent.cSpinner.setDisplayWithId(false, "#spinnerTwo");
      if (callback) return callback(message)
    })
  }
}