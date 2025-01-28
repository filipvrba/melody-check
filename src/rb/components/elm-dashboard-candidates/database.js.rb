import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_candidates(&callback)
    query = "SELECT id, full_name, email, confirmed_attendance " +
            "FROM candidates WHERE event_id = #{@parent.event_id};"

    Net.bef(query) do |rows|
      decode_candidates = rows.map do |h|
        return {
          id:                   h.id,
          full_name:            h['full_name'].decode_base64(),
          email:                h.email.decode_base64(),
          confirmed_attendance: h['confirmed_attendance'] == '1',
        }
      end
      callback(decode_candidates) if callback
    end
  end
end