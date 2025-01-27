import 'Net', '../../../../core/net'

export default class CDatabase
  def initialize(c_spinner)
    @c_spinner = c_spinner
  end

  def signin(options, &callback)
    @c_spinner.set_display(true)

    email         = options.email.encode_base64()
    hash_password = options.password.encode_sha256()

    query = "SELECT id FROM users WHERE email='#{email}' " +
            "AND hash_password='#{hash_password}';"

    Net.bef(query) do |rows|
      @c_spinner.set_display(false)
      is_signin = rows.length > 0 if rows

      if is_signin
        user_id = rows[0].id
        callback(user_id) if callback
      else
        callback(nil) if callback
      end
    end
  end

  def add_token(options, &callback)
    @c_spinner.set_display(true)
    query = "INSERT INTO tokens (user_id, token, expires_at) " +
            "VALUES (#{options.id}, '#{options.token}', '#{options.date}');"

    Net.bef(query) do |is_write|
      @c_spinner.set_display(false)
      if is_write
        callback.call() if callback
      end
    end
  end
end