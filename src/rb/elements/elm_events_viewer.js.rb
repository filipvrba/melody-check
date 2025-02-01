import 'CInputsEventsSettings', '../components/elm-events-settings/inputs'
import 'ElmHeader',   '../packages/bef-client-rjs-0.1.1/elements/elm_header'
import 'ElmSettings', '../packages/bef-client-rjs-0.1.1/elements/elm_settings'

export default class ElmEventsViewer < HTMLElement
  ENVS = {
    go_back: 'eesv-gb-0'
  }

  def initialize
    super

    @h_events_settings_btn_click_1 = lambda {|e| events_settings_btn_click_1(e.detail.value) }
    @h_category_click              = lambda { category_click() }

    @user_id = self.get_attribute('user-id')
    
    init_elm()
  end

  def connected_callback()
    Events.connect('#app', CInputsEventsSettings::ENVS.btn_click_1, @h_events_settings_btn_click_1)
    Events.connect('#app', ElmSettings::ENVS.category_click, @h_category_click)
  end

  def disconnected_callback()
    Events.disconnect('#app', CInputsEventsSettings::ENVS.btn_click_1, @h_events_settings_btn_click_1)
    Events.disconnect('#app', ElmSettings::ENVS.category_click, @h_category_click)
  end

  def events_settings_btn_click_1(event_id)
    @is_switched = true

    self.innerHTML = """
    <elm-event-settings user-id='#{@user_id}' event-id='#{event_id}'></elm-event-settings>
    """
  end

  def category_click()
    if URLParams.get_index('sc-index') == 0
      init_elm()
    else
      @is_switched = false
    end
  end

  def init_elm()
    @is_switched = false

    template = """
    <elm-events-settings user-id='#{@user_id}'></elm-events-settings>
    """

    self.innerHTML = template
  end
end