import Net from "../../../../core/net";

export default class CDatabase {
  constructor(cSpinner) {
    this._cSpinner = cSpinner
  };

  signin(options, callback) {
    this._cSpinner.setDisplay(true);
    let email = options.email.encodeBase64();
    let hashPassword = options.password.encodeSha256();
    let query = `SELECT id FROM users WHERE email='${email}' AND hash_password='${hashPassword}';`;

    return Net.bef(query, (rows) => {
      let isSignin, userId;
      this._cSpinner.setDisplay(false);
      if (rows) isSignin = rows.length > 0;

      if (isSignin) {
        userId = rows[0].id;
        if (callback) return callback(userId)
      } else if (callback) {
        return callback(null)
      }
    })
  };

  addToken(options, callback) {
    this._cSpinner.setDisplay(true);
    let query = `INSERT INTO tokens (user_id, token, expires_at) VALUES (${options.id}, '${options.token}', '${options.date}');`;

    return Net.bef(query, (isWrite) => {
      this._cSpinner.setDisplay(false);
      if (isWrite) if (callback) return callback.call()
    })
  }
}