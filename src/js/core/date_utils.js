export default class DateUtils {
  static convertToCzechDate(utcDate) {
    let date = new Date(utcDate + "Z");

    return date.toLocaleTimeString("cs-CZ", {
      timeZone: "Europe/Prague",
      weekday: "long",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }
};

window.DateUtils = DateUtils