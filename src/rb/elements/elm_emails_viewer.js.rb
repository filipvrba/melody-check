import 'ElmContentSwitcher', './elm_content_switcher'
import 'CInputsEmailsSettings', '../components/elm-emails-settings/inputs'

export default class ElmEmailsViewer < ElmContentSwitcher
  def category_index
    return 1
  end

  def initialize
    super

    @h_emails_settings_btn_click_0 = lambda {|e| button_click(e.detail.value)}
  end

  def connected_callback()
    super

    Events.connect('#app', CInputsEmailsSettings::ENVS.btn_click_0, @h_emails_settings_btn_click_0)
  end

  def disconnected_callback()
    super

    Events.disconnect('#app', CInputsEmailsSettings::ENVS.btn_click_0, @h_emails_settings_btn_click_0)
  end

  def button_click(event_id)
    super

    self.innerHTML = """
    <elm-email-settings user-id='#{@user_id}' event-id='#{event_id}' no-fetch></elm-email-settings>
    """
  end

  def init_elm()
    super

    template = """
    <elm-emails-settings user-id='#{@user_id}'></elm-emails-settings>
    """

    self.innerHTML = template
  end
end