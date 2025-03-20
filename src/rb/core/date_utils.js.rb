export default class DateUtils
  def self.convert_to_czech_date(utc_date)
    date = Date.new(utc_date + "Z")

    return date.to_locale_time_string("cs-CZ", { 
      time_zone: "Europe/Prague",
      weekday: "long",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  end
end
window.DateUtils = DateUtils