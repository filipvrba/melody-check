import ['ENV'], '../env'

export default class Net
  def self.curl(url, &callback)
    fetch(url)
    .then(lambda do |response|
      response.text()
    end)
    .then(lambda do |text|
      callback(text) if callback
    end)
    .catch(lambda do
      callback(nil) if callback
    end)
  end

  def self.bef(query, &callback)
    db_name = ENV::VITE_DATABASE

    encode_query = encodeURIComponent(query)
    Net.curl("/api/bef?db=#{db_name}&query=#{encode_query}") do |response|

      if response
        data = JSON.parse(response)
        if data['status_code'] == 403 || data['status_code'] == 405 ||
          data.status == 'SQL Error'
          
          console.warn(data)
          callback(nil) if callback
        else
          callback(data) if callback
        end
      else
        callback(nil) if callback
      end

    end
  end

  def self.check_internet(&callback)
    health_url = 'https://bef.fly.dev/health'

    fetch(health_url, { method: 'GET' })
    .then(lambda do |response|
      callback(true) if callback
    end)
    .catch(lambda do
      callback(false) if callback
    end)
  end
end