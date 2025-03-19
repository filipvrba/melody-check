import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  updateCandidate(candidate, callback) {
    let encodeFullName = candidate.fullName.encodeBase64();
    let encodeEmail = candidate.email.encodeBase64();
    let query = `UPDATE candidates SET full_name = '${encodeFullName}', email = '${encodeEmail}' WHERE id = ${this._parent.candidateId};`;

    return Net.bef(query, (message) => {
      if (callback) return callback(message)
    })
  }
}