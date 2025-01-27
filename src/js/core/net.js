import { ENV } from "../env";

export default class Net {
  static curl(url, callback) {
    return fetch(url).then(response => response.text()).then((text) => {
      if (callback) return callback(text)
    }).catch(() => {
      if (callback) return callback(null)
    })
  };

  static bef(query, callback) {
    let dbName = ENV.VITE_DATABASE;
    let encodeQuery = encodeURIComponent(query);

    return Net.curl(
      `/api/bef?db=${dbName}&query=${encodeQuery}`,

      (response) => {
        let data;

        if (response) {
          data = JSON.parse(response);

          if (data.status_code === 403 || data.status_code === 405 || data.status === "SQL Error") {
            console.warn(data);
            if (callback) return callback(null)
          } else if (callback) {
            return callback(data)
          }
        } else if (callback) {
          return callback(null)
        }
      }
    )
  };

  static checkInternet(callback) {
    let healthUrl = "https://bef.fly.dev/health";

    return fetch(healthUrl, {method: "GET"}).then((response) => {
      if (callback) return callback(true)
    }).catch(() => {
      if (callback) return callback(false)
    })
  }
}