import CryptoJS from "crypto-js";

export default class CProtect {
  generateToken() {
    let randomValue = Math.random().toString();
    let token = CryptoJS.SHA256(randomValue).toString(CryptoJS.enc.Hex);
    return token
  };

  writeNewToken() {
    let token = this.generateToken();
    let minutes = 60;
    Cookie.set("l-token", token, minutes);
    let date = new Date(Date.now() + (minutes * 60 * 1_000)).toISOString();
    return [token, date]
  }
}