import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getUserType(callback) {
    let query = `SELECT u.user_type_id, ut.type_name \nFROM users u\nJOIN user_types ut ON u.user_type_id = ut.id\nWHERE u.id = ${this._parent.userId};`;

    return Net.bef(query, (rows) => {
      let options;

      if (rows.length > 0) {
        options = {
          id: parseInt(rows[0].user_type_id),
          name: rows[0].type_name
        };

        if (callback) return callback(options)
      } else if (callback) {
        return callback(null)
      }
    })
  }
}