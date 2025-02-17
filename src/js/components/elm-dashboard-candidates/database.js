import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getCandidates(callback) {
    // query = "SELECT id, full_name, email, confirmed_attendance " +
    //         "FROM candidates WHERE event_id = #{@parent.event_id};"
    let query = `SELECT c.id, 
       c.full_name, 
       c.email, 
       c.confirmed_attendance, 
       GROUP_CONCAT(STRFTIME('%d.%m - %H:%M', cat.arrival_date || ' ' || cat.arrival_time), ',') AS arrival_times
FROM candidates c
LEFT JOIN candidate_arrival_times cat
  ON c.id = cat.candidate_id
WHERE c.event_id = ${this._parent.eventId}
GROUP BY c.id, c.full_name, c.email, c.confirmed_attendance;
`;

    return Net.bef(query, (rows) => {
      let decodeCandidates = rows.map(h => ({
        id: h.id,
        fullName: h.full_name.decodeBase64(),
        email: h.email.decodeBase64(),
        confirmedAttendance: h.confirmed_attendance,
        arrivalTimes: h.arrival_times.split(",")
      }));

      if (callback) return callback(decodeCandidates)
    })
  }
}