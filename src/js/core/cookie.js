class Cookie {
  static get(name) {
    let nameEQ = `${name}=`;
    let ca = document.cookie.split(";");

    for (let c of ca) {
      let cIndex = c.indexOf(nameEQ);
      if (cIndex > -1) return c.replace(nameEQ, "").trim()
    };

    return null
  };

  static set(name, value, minutes) {
    let expires = "";

    if (minutes) {
      let date = new Date;
      date.setTime(date.getTime() + (minutes * 60 * 1_000));
      expires = "; expires=" + date.toUTCString()
    };

    return document.cookie = `${name}=${value || ""}${expires}; path=/; Secure; SameSite=Strict`
  };

  static erase(name) {
    return document.cookie = `${name}=; Max-Age=-99999999; path=/; Secure; SameSite=Strict`
  }
};

window.Cookie = Cookie