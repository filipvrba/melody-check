import 'Net',                    '../../core/net'
import 'CDatabaseEventSettings', '../elm-event-settings/database'

export default class CDatabase
  def user_id
    @parent.user_id
  end

  def event_id
    @parent.c_inputs.event_id_history
  end

  def c_spinner
    @parent.c_spinner
  end

  def initialize(parent)
    @parent = parent

    @c_database_event_settings = CDatabaseEventSettings.new(self)
  end

  def get_event_details(&callback)
    @c_database_event_settings.get_event_details() do |rows|
      callback(rows) if callback
    end
  end

  def set_event_details(event_name, event_date, &callback)
    @c_database_event_settings.set_event_details(event_name, event_date) do |message|
      callback(message) if callback
    end
  end

  def remove_event(&callback)
    query = "DELETE FROM events WHERE id = #{event_id};"

    c_spinner.set_display_with_id(true, '#spinnerOne')
    Net.bef(query) do |message|
      c_spinner.set_display_with_id(false, '#spinnerOne')

      callback(message) if callback
    end
  end
end