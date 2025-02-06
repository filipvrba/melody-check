import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getCandidates(callback) {
    let query = `SELECT id, full_name, email, confirmed_attendance FROM candidates WHERE event_id = ${this._parent.eventId};`;

    return Net.bef(query, (rows) => {
      let decodeCandidates = rows.map(h => ({
        id: h.id,
        fullName: h.full_name.decodeBase64(),
        email: h.email.decodeBase64(),
        confirmedAttendance: h.confirmed_attendance
      }));

      if (callback) return callback(decodeCandidates)
    })
  }
}