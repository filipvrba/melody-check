export default class ElmChatHeader < HTMLElement
  def initialize
    super

    @endpoint = location.hash.sub('#', '')
    @title    = Language.relevant.elm_routes.titles[@endpoint]
    
    @user_id = self.get_attribute('user-id')

    init_elm()
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
<nav class='navbar navbar-light bg-light'>
  <div class='container-fluid mx-auto'>
    <div class='col-4'>
      #{subinit_elm(@endpoint)}
    </div>
    <div class='col-4 text-center'>
      <h3 class='m-0 text-truncate'>#{@title}</h3>
    </div>
    <div class='col-4 d-flex'>
      <div class='ms-auto'>
        <elm-header-account user-id='#{@user_id}'></elm-header-account>
      </div>
    </div>
  </div>
</nav>
    """

    self.innerHTML = template
  end

  def subinit_elm(endpoint)
    case endpoint
    when 'settings'
      return """
      <a class='btn navbar-brand' href='#dashboard'>
        <i class='bi bi-arrow-left'></i>
      </a>
      """
    else
      return ''
    end
  end
end