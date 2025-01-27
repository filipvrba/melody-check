import 'CryptoJS', 'crypto-js'

export default class CProtect
  def generate_token()
    random_value = Math.random().to_string()
    token = CryptoJS.SHA256(random_value).to_string(CryptoJS.enc.Hex)
    return token
  end

  def write_new_token()
    token = generate_token()

    minutes = 60
    Cookie.set('l-token', token, minutes)

    date = Date.new(Date.now() + (minutes * 60 * 1_000)).toISO_string()
    return [ token, date ]
  end
end