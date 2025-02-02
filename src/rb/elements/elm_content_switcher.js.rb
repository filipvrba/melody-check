import 'ElmSettings', '../packages/bef-client-rjs-0.1.1/elements/elm_settings'

export default class ElmContentSwitcher < HTMLElement
  def category_index
    return 0
  end

  def initialize
    super

    @h_category_click = lambda { category_click() }

    @user_id = self.get_attribute('user-id')
    
    init_elm()
  end

  def connected_callback()
    Events.connect('#app', ElmSettings::ENVS.category_click, @h_category_click)
  end

  def disconnected_callback()
    Events.disconnect('#app', ElmSettings::ENVS.category_click, @h_category_click)
  end

  def button_click(event_id)
    @is_switched = true
  end

  def category_click()
    if URLParams.get_index('sc-index') == category_index
      init_elm()
    else
      @is_switched = false
    end
  end

  def init_elm()
    @is_switched = false
  end
end