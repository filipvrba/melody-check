export default def handler(req, res)
  sql_query = req.query.query
  database  = process.env.VITE_DATABASE

  options = {
    db: database,
    query: sql_query,
    tokens: get_tokens()
  }

  query(options) do |response|
    res.status(200).json(response)
  end
end

def query(options, &callback)
  is_set = set(options) do |data|
    callback(data) if callback
  end
  unless is_set
    get(options) do |data|
      callback(data) if callback
    end
  end
end

def get(options, &callback)
  query_encode = encodeURIComponent(options.query)
  uri = "#{process.env.URL_API}?token=#{options.tokens.client}" +
      "&database=#{options.db}&query=#{query_encode}"

  fetch(uri)
  .then(lambda do |response|
    response.json()
  end)
  .then(lambda do |data|
    if data.status_code
      console.error("GET: #{data.status_code} #{data.status}")
      callback([]) if callback
    else
      callback(data) if callback
    end
  end)
end

def set(options, &callback)
  is_active = false
  low_query = options.query.downcase()

  if low_query.indexOf('insert into') > -1 ||
     low_query.indexOf('create table') > -1
    
    is_active = true
    send('post', options) do |data|
      callback(data) if callback
    end
  elsif low_query.indexOf('delete') > -1

    is_active = true
    send('delete', options) do |data|
      callback(data) if callback
    end
  elsif low_query.indexOf('update') > -1

    is_active = true
    send('patch', options) do |data|
      callback(data) if callback
    end
  end

  return is_active
end

def send(method, options, &callback)
  method = method.upcase()
  
  fetch(process.env.URL_API, {
    method: method,
    headers: {
      'Token': options.tokens.server,
      'Database': options.db,
      'Query': options.query,
    }
  })
  .then(lambda do |response|
    response.json()
  end)
  .then(lambda do |data|
    callback(data) if callback
  end)
end

def get_tokens()
  tokens = {
    client: process.env.BEF_KEY_CLIENT,
    server: process.env.BEF_KEY_SERVER
  }

  return tokens
end