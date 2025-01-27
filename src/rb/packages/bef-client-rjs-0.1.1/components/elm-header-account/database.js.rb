import 'Net', '../../../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_email(&callback)
    Net.bef("SELECT email FROM users WHERE id = #{@parent.user_id}") do |rows|
      if rows.length > 0
        email = rows[0].email.decode_base64()
        callback(email) if callback
      end
    end
  end
end