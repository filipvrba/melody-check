import 'CDatabaseEventSettings', '../elm-event-settings/database'

export default class CDatabase
  def initialize(parent)
    @parent = parent

    @c_database_event_settings = CDatabaseEventSettings.new(@parent)
  end

  def get_event_details(&callback)
    @c_database_event_settings.get_event_details() do |rows|
      callback(rows) if callback
    end
  end
end