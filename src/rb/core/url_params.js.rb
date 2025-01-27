class URLParams
  def self.get_urls()
    url = URL.new(window.location.href)
    url_params = URLSearchParams.new(url.search)
    [url, url_params]
  end

  def self.get(parameter)
    _, url_params = URLParams.get_urls()
    url_params.get(parameter)
  end

  def self.set(parameter, value)
    url, url_params = URLParams.get_urls()

    url_params.set(parameter, value)
    url.search = url_params.to_string()
    window.history.push_state({}, '', url)
  end

  def self.get_index(parameter)
    param = URLParams.get(parameter)
    param == nil ? 0 : param.to_i
  end
end
window.URLParams = URLParams