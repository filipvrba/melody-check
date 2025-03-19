import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def update_candidate(candidate, &callback)
    encode_full_name = candidate.full_name.encode_base64()
    encode_email     = candidate.email.encode_base64()

    query = "UPDATE candidates " +
      "SET full_name = '#{encode_full_name}', email = '#{encode_email}' " +
      "WHERE id = #{@parent.candidate_id};"

    Net.bef(query) do |message|
      callback(message) if callback
    end
  end
end