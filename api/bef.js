export default function handler(req, res) {
  let sqlQuery = req.query.query;
  let database = process.env.VITE_DATABASE;
  let options = {db: database, query: sqlQuery, tokens: getTokens()};
  return query(options, response => res.status(200).json(response))
};

function query(options, callback) {
  let isSet = set(options, (data) => {
    if (callback) return callback(data)
  });

  if (!isSet) {
    return get(options, (data) => {if (callback) return callback(data)})
  }
};

function get(options, callback) {
  let queryEncode = encodeURIComponent(options.query);
  let uri = `${process.env.URL_API}?token=${options.tokens.client}&database=${options.db}&query=${queryEncode}`;

  return fetch(uri).then(response => response.json()).then((data) => {
    if (data.statusCode) {
      console.error(`GET: ${data.statusCode} ${data.status}`);
      if (callback) return callback([])
    } else if (callback) {
      return callback(data)
    }
  })
};

function set(options, callback) {
  let isActive = false;
  let lowQuery = options.query.toLowerCase();

  if (lowQuery.indexOf("insert into") > -1 || lowQuery.indexOf("create table") > -1) {
    isActive = true;

    send("post", options, (data) => {
      if (callback) return callback(data)
    })
  } else if (lowQuery.indexOf("delete") > -1) {
    isActive = true;

    send("delete", options, (data) => {
      if (callback) return callback(data)
    })
  } else if (lowQuery.indexOf("update") > -1) {
    isActive = true;

    send("patch", options, (data) => {
      if (callback) return callback(data)
    })
  };

  return isActive
};

function send(method, options, callback) {
  method = method.toUpperCase();

  return fetch(process.env.URL_API, {method, headers: {
    Token: options.tokens.server,
    Database: options.db,
    Query: options.query
  }}).then(response => response.json()).then((data) => {
    if (callback) return callback(data)
  })
};

function getTokens() {
  let tokens = {
    client: process.env.BEF_KEY_CLIENT,
    server: process.env.BEF_KEY_SERVER
  };

  return tokens
}