import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  addDateWithTime(options, callback) {
    let query = `INSERT INTO candidate_arrival_times (candidate_id, event_id, arrival_date, arrival_time) VALUES (${this._parent.candidateId}, ${this._parent.eventId}, '${options.date}', '${options.time}');`;
    if (this._parent.setVisibleSpinner) this._parent.setVisibleSpinner(true);

    return Net.bef(query, (message) => {
      if (this._parent.setVisibleSpinner) this._parent.setVisibleSpinner(false);
      if (callback) return callback(message)
    })
  };

  getDateWithTime(callback) {
    let query = `SELECT id, arrival_date, arrival_time FROM candidate_arrival_times WHERE candidate_id = ${this._parent.candidateId} AND event_id = ${this._parent.eventId} ORDER BY arrival_date DESC, arrival_time DESC;`;
    if (this._parent.setVisibleSpinner) this._parent.setVisibleSpinner(true);

    return Net.bef(query, (rows) => {
      if (this._parent.setVisibleSpinner) this._parent.setVisibleSpinner(false);
      if (rows) if (callback) return callback(rows)
    })
  };

  removeRow(id, callback) {
    let query = `DELETE FROM candidate_arrival_times WHERE id = ${id};`;
    if (this._parent.setVisibleSpinner) this._parent.setVisibleSpinner(true);

    return Net.bef(query, (message) => {
      if (this._parent.setVisibleSpinner) this._parent.setVisibleSpinner(false);
      if (message) return callback(message)
    })
  }
}