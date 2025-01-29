export default class CInputs
  ENVS = {
    btn_click_0: 'ees-ci-btn-click-3'
  }

  def initialize(parent)
    @parent = parent

    @registered_template  = @parent.query_selector('#mailSettingsRegisteredTemplate')
    @unconfirmed_template = @parent.query_selector('#mailSettingsUnconfirmedTemplate')

    window.email_settings_save_btn_click = save_btn_click
  end

  def save_btn_click()
    Events.emit('#app', ENVS.btn_click_0, {
      html_registered:  @registered_template.value,
      html_unconfirmed: @unconfirmed_template.value
    })
  end
end