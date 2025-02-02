import 'CDatabaseUserType', '../elm-user-type-settings/database'
import 'CDatabaseEventSettings', '../elm-event-settings/database'

export default class CDatabase
  def initialize(parent)
    @parent = parent

    @c_database_user_type      = CDatabaseUserType.new(@parent)
    @c_database_event_settings = CDatabaseEventSettings.new(@parent)
  end

  def get_user_type(&callback)
    @c_database_user_type.get_user_type() do |user_type|
      callback(user_type) if callback
    end
  end

  def get_event_details(&callback)
    @c_database_event_settings.get_event_details() do |event_details|
      callback(event_details) if callback
    end
  end
end