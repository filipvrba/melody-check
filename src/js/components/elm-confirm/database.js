import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getInformations(callback) {
    let query = `SELECT 
    e.event_name,
    c.full_name,
    c.confirmed_attendance
FROM 
    events e
JOIN 
    candidates c ON e.id = c.event_id
WHERE 
    c.id = ${this._parent.candidateId} AND e.id = ${this._parent.eventId};
`;

    return Net.bef(query, (rows) => {
      let decodeInformations = rows.map(h => ({
        eventName: h.event_name.decodeBase64(),
        fullName: h.full_name.decodeBase64(),
        confirmedAttendance: h.confirmed_attendance === "1"
      }));

      let haveInformations = decodeInformations.length > 0;

      if (haveInformations) {
        if (callback) return callback(decodeInformations[0])
      } else if (callback) {
        return callback(null)
      }
    })
  };

  updateConfirmedAttendance(callback) {
    let query = `UPDATE candidates SET confirmed_attendance = 1 WHERE id = ${this._parent.candidateId} AND event_id = ${this._parent.eventId};`;

    return Net.bef(query, (message) => {
      if (callback) return callback(message)
    })
  }
}