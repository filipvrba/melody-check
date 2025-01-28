import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_event_id(&callback)
    query = "SELECT id FROM events WHERE user_id = #{@parent.user_id};"

    Net.bef(query) do |rows|
      have_event = rows.length > 0
      if have_event
        event_id = rows[0].id
        callback(event_id) if callback
      else
        callback(nil) if callback
      end
    end
  end
end