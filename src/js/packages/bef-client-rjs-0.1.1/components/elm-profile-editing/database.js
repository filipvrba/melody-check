import Net from "../../../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  accountDeletion(callback) {
    let query = `DELETE FROM users WHERE id = ${this._parent.userId};`;

    return Net.bef(query, (isDeleted) => {
      if (isDeleted) return callback.call()
    })
  };

  compareCurrentPassword(password, callback) {
    let hashPassword = password.encodeSha256();
    let query = `SELECT id FROM users WHERE id=${this._parent.userId} AND hash_password='${hashPassword}';`;

    return Net.bef(query, (rows) => {
      if (rows) {
        if (callback) return callback(rows.length > 0)
      } else if (callback) {
        return callback(false)
      }
    })
  };

  setAccountNewPassword(password, callback) {
    let hashPassword = password.encodeSha256();
    let query = `UPDATE users SET hash_password='${hashPassword}' WHERE id=${this._parent.userId}`;

    return Net.bef(query, (message) => {
      if (callback) return callback(message)
    })
  }
}