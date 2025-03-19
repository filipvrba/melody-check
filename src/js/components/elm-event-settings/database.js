import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getEventDetails(callback) {
    let query = `SELECT id, event_name, event_date FROM events WHERE user_id = ${this._parent.userId} ORDER BY created_at ASC;`;

    if (this._parent.cSpinner) {
      this._parent.cSpinner.setDisplayWithId(true, "#spinnerOne")
    };

    return Net.bef(query, (rows) => {
      let decodeRows;

      if (this._parent.cSpinner) {
        this._parent.cSpinner.setDisplayWithId(false, "#spinnerOne")
      };

      let haveEvent = rows.length > 0;

      if (haveEvent) {
        decodeRows = rows.map(h => ({
          id: h.id,
          name: h.event_name.decodeBase64(),
          date: h.event_date.decodeBase64()
        }));

        if (callback) return callback(decodeRows)
      } else if (callback) {
        return callback(null)
      }
    })
  };

  setEventDetails(title, date, callback) {
    let eventName = title.encodeBase64();
    let eventDate = date.encodeBase64();
    let eventId = this._parent.eventId || "NULL";
    let query = `INSERT INTO events (id, user_id, event_name, event_date) VALUES (${eventId}, ${this._parent.userId}, '${eventName}', '${eventDate}') ON CONFLICT(id) DO UPDATE SET event_name = excluded.event_name, event_date = excluded.event_date;`;
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
  };

  removeEmailLogs(idCandidates, callback) {
    if (idCandidates.length <= 0) return;
    let query = `DELETE FROM email_logs WHERE candidate_id IN (${idCandidates.join(", ")});`;
    this._parent.cSpinner.setDisplayWithId(true, "#spinnerTwo");

    return Net.bef(query, (message) => {
      this._parent.cSpinner.setDisplayWithId(false, "#spinnerTwo");
      if (callback) return callback(message)
    })
  }
}