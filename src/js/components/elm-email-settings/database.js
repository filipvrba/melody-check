import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  setEmailTemplates(options, callback) {
    let query = `INSERT OR REPLACE INTO email_templates (event_id, registered_subject, registered_body, unconfirmed_subject, unconfirmed_body) VALUES (${this._parent.eventId}, '${options.registered.subject.encodeBase64()}', '${options.registered.html.encodeBase64()}', '${options.unconfirmed.subject.encodeBase64()}', '${options.unconfirmed.html.encodeBase64()}');`;
    this._parent.cInputs.setDisable(true);

    return Net.bef(query, (message) => {
      this._parent.cInputs.setDisable(false);
      let isSet = Array.isArray(message);
      if (callback) return callback(isSet)
    })
  };

  getEmailTemplates(callback) {
    let query = `SELECT registered_subject, registered_body, unconfirmed_subject, unconfirmed_body FROM email_templates WHERE event_id = ${this._parent.eventId};`;
    this._parent.cInputs.setDisable(true);

    return Net.bef(query, (rows) => {
      let decodeTemplates;
      this._parent.cInputs.setDisable(false);

      if (rows.length > 0) {
        decodeTemplates = rows.map(h => ({
          registered: {
            subject: h.registered_subject.decodeBase64(),
            html: h.registered_body.decodeBase64()
          },

          unconfirmed: {
            subject: h.unconfirmed_subject.decodeBase64(),
            html: h.unconfirmed_body.decodeBase64()
          }
        }));

        if (callback) return callback(decodeTemplates[0])
      } else if (callback) {
        return callback(null)
      }
    })
  }
}