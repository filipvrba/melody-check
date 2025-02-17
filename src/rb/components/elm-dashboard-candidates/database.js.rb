import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_candidates(&callback)
    # query = "SELECT id, full_name, email, confirmed_attendance " +
    #         "FROM candidates WHERE event_id = #{@parent.event_id};"

    query = "SELECT c.id, 
       c.full_name, 
       c.email, 
       c.confirmed_attendance, 
       GROUP_CONCAT(STRFTIME('%d.%m - %H:%M', cat.arrival_date || ' ' || cat.arrival_time), ',') AS arrival_times
FROM candidates c
LEFT JOIN candidate_arrival_times cat
  ON c.id = cat.candidate_id
WHERE c.event_id = #{@parent.event_id}
GROUP BY c.id, c.full_name, c.email, c.confirmed_attendance;
"

    Net.bef(query) do |rows|
      decode_candidates = rows.map do |h|
        return {
          id:                   h.id,
          full_name:            h['full_name'].decode_base64(),
          email:                h.email.decode_base64(),
          confirmed_attendance: h['confirmed_attendance'],
          arrival_times:        h['arrival_times'].split(',')
        }
      end
      callback(decode_candidates) if callback
    end
  end
end