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

    // query = "SELECT id, full_name, email FROM candidates WHERE event_id = #{@parent.event_id};"
    let query = `SELECT 
    c.id, 
    c.full_name, 
    c.email, 
    CASE 
        WHEN el.id IS NOT NULL THEN 1 
        ELSE 0 
    END AS email_sent,
    el.sent_at
FROM candidates c
LEFT JOIN email_logs el 
    ON c.id = el.candidate_id 
    AND el.email_type = 'informational'
WHERE c.event_id = ${this._parent.eventId};
`;

    return Net.bef(query, (rows) => {
      let decodeRows;
      this._parent.cSpinner.setDisplayWithId(false, "#spinnerTwo");
      let haveCandidates = rows.length > 0;

      if (haveCandidates) {
        decodeRows = rows.map(h => ({
          id: h.id,
          fullName: h.full_name.decodeBase64(),
          email: h.email.decodeBase64(),
          emailSent: parseInt(h.email_sent) === 1,
          sentAt: h.sent_at
        }));

        if (callback) return callback(decodeRows)
      } else if (callback) {
        return callback([])
      }
    })
  };

  removeCandidates(idCandidates, callback) {
    if (idCandidates.length <= 0) return;
    let query = `DELETE FROM candidates WHERE id IN (${idCandidates.join(", ")});`;
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
  };

  addEmailLogs(idCandidates, callback) {
    if (idCandidates.length <= 0) return;
    let insertCandidates = idCandidates.map(id => `(${id}, 'informational')`);
    let query = `INSERT OR REPLACE INTO email_logs (candidate_id, email_type) VALUES ${insertCandidates.join(", ")};`;

    return Net.bef(query, (message) => {
      if (callback) return callback(message)
    })
  };

  emailCandidates(idCandidates, callback) {
    if (idCandidates.length <= 0) return;
    let query = `SELECT 
  c.id AS candidate_id, 
  c.email, 
  c.full_name, 
  e.id AS event_id, 
  e.event_name, 
  e.event_date,
  et.registered_subject,
  et.registered_body
FROM candidates c
JOIN events e 
  ON c.event_id = e.id
LEFT JOIN email_templates et 
  ON e.id = et.event_id 
WHERE c.id IN (${idCandidates.join(", ")});`;

    return Net.bef(query, (rows) => {
      let result;
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        result = rows.map(h => ({
          candidateId: parseInt(h.candidate_id),
          email: h.email.decodeBase64(),
          fullName: h.full_name.decodeBase64(),
          eventId: parseInt(h.event_id),
          eventName: h.event_name.decodeBase64(),
          eventDate: h.event_date.decodeBase64(),
          registeredSubject: h.registered_subject.decodeBase64(),
          registeredBody: h.registered_body.decodeBase64()
        }));

        if (callback) return callback(result)
      } else if (callback) {
        return callback(null)
      }
    })
  }
}