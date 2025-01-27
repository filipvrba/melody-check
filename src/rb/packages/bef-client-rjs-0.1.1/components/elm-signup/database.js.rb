import 'Net', '../../../../core/net'

export default class CDatabase
  def initialize(c_spinner)
    @c_spinner = c_spinner
  end

  def add_new_user(options, &callback)
    @c_spinner.set_display(true)

    query = "INSERT INTO users (email, hash_password) " +
            "VALUES ('#{options.email.encode_base64()}', '#{options.password.encode_sha256()}');"
    Net.bef(query) do |is_added|
      @c_spinner.set_display(false)

      callback(is_added) if callback
    end
  end
end