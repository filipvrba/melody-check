import Net from "../../../../core/net";

export default class CDatabase {
  constructor(cSpinner) {
    this._cSpinner = cSpinner
  };

  addNewUser(options, callback) {
    this._cSpinner.setDisplay(true);
    let query = `INSERT INTO users (email, hash_password) VALUES ('${options.email.encodeBase64()}', '${options.password.encodeSha256()}');`;

    return Net.bef(query, (isAdded) => {
      this._cSpinner.setDisplay(false);
      if (callback) return callback(isAdded)
    })
  }
}