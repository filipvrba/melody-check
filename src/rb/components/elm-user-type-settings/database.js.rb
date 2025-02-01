import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_user_type(&callback)
    query = "SELECT u.user_type_id, ut.type_name 
FROM users u
JOIN user_types ut ON u.user_type_id = ut.id
WHERE u.id = #{@parent.user_id};"

    Net.bef(query) do |rows|
      if rows.length > 0
        options = {
          id:   rows[0]['user_type_id'].to_i,
          name: rows[0]['type_name'],
        }
        callback(options) if callback
      else
        callback(nil) if callback
      end
    end
  end
end