import 'CInputsEventsSettings', '../components/elm-events-settings/inputs'
import 'ElmContentSwitcher', './elm_content_switcher'

export default class ElmEventsViewer < ElmContentSwitcher
  def initialize
    super

    @h_events_settings_btn_click_1 = lambda {|e| button_click(e.detail.value) }
  end

  def connected_callback()
    super

    Events.connect('#app', CInputsEventsSettings::ENVS.btn_click_1, @h_events_settings_btn_click_1)
  end

  def disconnected_callback()
    super

    Events.disconnect('#app', CInputsEventsSettings::ENVS.btn_click_1, @h_events_settings_btn_click_1)
  end

  def button_click(event_id)
    super

    self.innerHTML = """
    <elm-event-settings user-id='#{@user_id}' event-id='#{event_id}'></elm-event-settings>
    """
  end

  def init_elm()
    super

    template = """
    <elm-events-settings user-id='#{@user_id}'></elm-events-settings>
    """

    self.innerHTML = template
  end
end