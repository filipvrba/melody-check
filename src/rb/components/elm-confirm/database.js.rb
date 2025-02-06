import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_informations(&callback)
    query = "SELECT 
    e.event_name,
    c.full_name,
    c.confirmed_attendance
FROM 
    events e
JOIN 
    candidates c ON e.id = c.event_id
WHERE 
    c.id = #{@parent.candidate_id} AND e.id = #{@parent.event_id};
"
    Net.bef(query) do |rows|
      decode_informations = rows.map do |h|
        return {
          event_name:           h['event_name'].decode_base64(),
          full_name:            h['full_name'].decode_base64(),
          confirmed_attendance: h['confirmed_attendance'].to_i,
        }
      end

      have_informations = decode_informations.length > 0
      if have_informations
        callback(decode_informations[0]) if callback
      else
        callback(nil) if callback
      end
    end
  end

  def update_confirmed_attendance(confirmed_attendance, &callback)
    query = "UPDATE candidates SET confirmed_attendance = #{confirmed_attendance} " +
            "WHERE id = #{@parent.candidate_id} AND event_id = #{@parent.event_id};"

    Net.bef(query) do |message|
      callback(message) if callback
    end
  end
end