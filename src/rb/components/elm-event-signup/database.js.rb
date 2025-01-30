import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_event(&callback)
    query = "SELECT event_name FROM events WHERE id = #{@parent.event_id};"

    Net.bef(query) do |rows|
      decode_events = rows.map do |h|
        {
          name: h['event_name'].decode_base64(),
        }
      end

      have_events = decode_events.length > 0
      if have_events
        callback(decode_events[0]) if callback
      else
        callback(nil) if callback
      end
    end
  end
end