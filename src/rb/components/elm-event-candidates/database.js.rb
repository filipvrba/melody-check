import 'CDatabaseEventSignup', '../elm-event-signup/database'

export default class CDatabase
  def initialize(parent)
    @parent = parent

    @c_database_event_signup = CDatabaseEventSignup.new(@parent)
  end

  def get_event(&callback)
    @c_database_event_signup.get_event() do |rows|
      callback(rows) if callback
    end
  end
end