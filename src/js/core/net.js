export default class Net {
  static curl(url, callback) {
    return fetch(url).then(response => response.text()).then((text) => {
      if (callback) return callback(text)
    })
  }
};

window.Net = Net