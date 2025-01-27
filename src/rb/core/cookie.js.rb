class Cookie
  def self.get(name)
    nameEQ = "#{name}="
    ca     = document.cookie.split(';')

    ca.each do |c|
      c_index = c.index(nameEQ)
      if c_index > -1
        return c.sub(nameEQ, '').strip
      end
    end

    return nil
  end

  def self.set(name, value, minutes)
    expires = ""

    if minutes
      date = Date.new
      date.set_time(date.get_time() + (minutes * 60 * 1_000))
      expires = "; expires=" + date.toUTC_string()
    end

    document.cookie = "#{name}=#{(value || "")}#{expires}; path=/; Secure; SameSite=Strict"
  end

  def self.erase(name)
    document.cookie = "#{name}=; Max-Age=-99999999; path=/; Secure; SameSite=Strict"
  end
end
window.Cookie = Cookie