import 'Net', '../../../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def account_deletion(&callback)
    query = "DELETE FROM users WHERE id = #{@parent.user_id};"

    Net.bef(query) do |is_deleted|
      callback.call() if is_deleted
    end
  end

  def compare_current_password(password, &callback)
    hash_password = password.encode_sha256()

    query = "SELECT id FROM users WHERE id=#{@parent.user_id} " +
            "AND hash_password='#{hash_password}';"

    Net.bef(query) do |rows|
      if rows
        callback(rows.length > 0) if callback
      else
        callback(false) if callback
      end
    end
  end

  def set_account_new_password(password, &callback)
    hash_password = password.encode_sha256()

    query = "UPDATE users SET hash_password='#{hash_password}' " +
            "WHERE id=#{@parent.user_id}"

    Net.bef(query) do |message|
      callback(message) if callback
    end
  end
end