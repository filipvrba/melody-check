export default class ElmRoutes < HTMLElement
  def initialize
    super

    @l_hashchange = lambda { change_page() }
    @h_language_change = lambda { change_page() }

    language_change()

    change_page()
  end

  def connectedCallback()
    window.add_event_listener('hashchange', @l_hashchange)
    Events.connect('#app', Language::ENVS.language_change, @h_language_change)
  end

  def disconnectedCallback()
    window.remove_event_listener('hashchange', @l_hashchange)
    Events.disconnect('#app', Language::ENVS.language_change, @h_language_change)
  end

  def language_change()
    @language = Language.relevant.elm_routes
  end

  def change_page()
    language_change()

    current_page = find_current_page()
    init_page(current_page) if current_page
  end

  def find_current_page()
    ROUTES_JSON.pages.each do |page|
      unless page.endpoint == location.hash.sub('#', '')
                              .gsub('-', '/')
        next
      end

      return page
    end

    return nil
  end

  def init_page(page)
    init_meta(page)
    
    page_name = page.endpoint.gsub('-', '_')
    content = PAGES[page_name]
    init_elm(content, page)
  end

  def init_elm(content, page = nil)
    template = """
    #{content.sub('TITLE', @language.titles[page.endpoint]) if page}
    """

    self.innerHTML = template
  end

  def init_meta(page)
    title = "#{@language.titles[page.endpoint]} | #{@language.meta[0]}"

    # Title
    document.title = title
  end
end
