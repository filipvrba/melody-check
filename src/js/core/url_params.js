class URLParams {
  static getUrls() {
    let url = new URL(window.location.href);
    let urlParams = new URLSearchParams(url.search);
    return [url, urlParams]
  };

  static get(parameter) {
    let [_, urlParams] = URLParams.getUrls();
    return urlParams.get(parameter)
  };

  static set(parameter, value) {
    let [url, urlParams] = URLParams.getUrls();
    urlParams.set(parameter, value);
    url.search = urlParams.toString();
    return window.history.pushState({}, "", url)
  };

  static getIndex(parameter) {
    let param = URLParams.get(parameter);
    return param === null ? 0 : parseInt(param)
  }
};

window.URLParams = URLParams