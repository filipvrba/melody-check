export default class ElmNointernet < HTMLElement
  def initialize
    super

    @language = Language.relevant.elm_nointernet

    init_elm()

    window.nointernet_btn_reload_click = button_reload_click
  end

  def nointernet_update(is_connected)
    button_reload_click() if is_connected
  end

  def button_reload_click()
    location_hash_history = local_storage.get_item('hashHistory')
    unless location_hash_history
      location.hash = 'dashboard'
    else
      location.hash = location_hash_history
    end
  end

  def init_elm()
    template = """
<div class='d-flex justify-content-center align-items-center vh-100'>
  <div class='text-center'>
    <i class='bi bi-wifi-off display-1 text-danger'></i>
    <h1 class='mt-3'>#{@language[0]}</h1>
    <p class='text-muted'>#{@language[1]}</p>
    <button class='btn btn-primary' onclick='nointernetBtnReloadClick()'>
      <i class='bi bi-arrow-clockwise'></i> #{@language[2]}
    </button>
  </div>
</div>
    """

    self.innerHTML = template
  end
end