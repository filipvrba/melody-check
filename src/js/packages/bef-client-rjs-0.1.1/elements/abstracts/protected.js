import Net from "../../../../core/net";

export default class AProtected extends HTMLElement {
  constructor() {
    super();
    this._userId = null;

    this.tokenCheck((userId) => {
      if (userId === "tNOINTERNET") {
        localStorage.setItem("hashHistory", location.hash);
        return location.hash = "nointernet"
      } else if (userId) {
        this._userId = parseInt(userId);
        return this.protectedCallback()
      } else {
        return this.gotoSignin()
      }
    });

    Net.tokenCheck = this.tokenCheck.bind(this)
  };

  tokenCheck(callback) {
    let sql;
    let loginToken = Cookie.get("l-token");

    if (loginToken) {
      sql = `SELECT user_id FROM tokens WHERE token='${loginToken}' AND expires_at > CURRENT_TIMESTAMP;`;

      return Net.bef(sql, (rows) => {
        let isActive;

        if (rows) {
          isActive = rows.length > 0;

          if (isActive) {
            if (callback) return callback(rows[0].user_id.toString())
          } else if (callback) {
            return callback(null)
          }
        } else if (callback) {
          return callback("tNOINTERNET")
        }
      })
    } else if (callback) {
      return callback(null)
    }
  };

  gotoSignin() {
    return location.hash = "signin"
  };

  protectedCallback() {
    throw new Error("The function is abstract.");
    return null
  }
}