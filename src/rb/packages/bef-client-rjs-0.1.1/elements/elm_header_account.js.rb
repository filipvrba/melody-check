import 'CDatabase', '../components/elm-header-account/database'

export default class ElmHeaderAccount < HTMLElement
  attr_reader :user_id

  def initialize
    super

    endpoint      = location.hash.sub('#', '')

    @settings_off = endpoint == 'settings' 
    @language     = Language.relevant.elm_dashboard_header_account
    @user_id      = self.get_attribute('user-id')
    @c_database   = CDatabase.new(self)
    
    init_elm()

    @c_database.get_email do |email|
      init_email(email)
    end

    window.dropdown_item_signout_click = dropdown_item_signout_click
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def dropdown_item_signout_click()
    Cookie.erase('l-token')
    Events.emit('#app', 'signout')
  end

  def init_elm()
    template = """
<ul class='navbar-nav d-flex flex-row'>
  <li class='nav-item dropdown'>
    <a class='nav-link dropdown-toggle' href='#' id='accountDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
      <i class='bi bi-person-circle'></i> <span class='d-none d-sm-inline'>#{@language[0]}</span>
    </a>
    <ul class='dropdown-menu text-small shadow' aria-labelledby='accountDropdown' style='position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 34px);' data-popper-placement='bottom-end'>
      <li class='dropdown-header'>
        #{@language[1]}<br><strong id='dropdownHeaderEmail'></strong>
      </li>
      <li><hr class='dropdown-divider'></li>
      <li><a id='dashboard-header-settings-link' class='dropdown-item #{'disabled' if @settings_off}' href='#settings'>#{@language[2]}</a></li>
      <li><a class='dropdown-item'onclick='dropdownItemSignoutClick()' href='#'>#{@language[3]}</a></li>
    </ul>
  </li>
</ul>
    """

    self.innerHTML = template
  end

  def init_email(email)
    self.query_selector('#dropdownHeaderEmail').innerHTML = email
  end
end