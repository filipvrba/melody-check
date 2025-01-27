import Net from "../../../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getEmail(callback) {
    return Net.bef(
      `SELECT email FROM users WHERE id = ${this._parent.userId}`,

      (rows) => {
        let email;

        if (rows.length > 0) {
          email = rows[0].email.decodeBase64();
          if (callback) return callback(email)
        }
      }
    )
  }
}