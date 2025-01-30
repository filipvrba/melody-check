export default class CInputs
  ENVS = {
    btn_click_0: 'ees-ci-btn-click-3'
  }

  def initialize(parent)
    @parent = parent

    @registered_subject   = @parent.query_selector('#mailSettingsRegisteredSubject')
    @unconfirmed_subject  = @parent.query_selector('#mailSettingsUnconfirmedSubject')

    @registered_template  = @parent.query_selector('#mailSettingsRegisteredTemplate')
    @unconfirmed_template = @parent.query_selector('#mailSettingsUnconfirmedTemplate')

    @save_btn             = @parent.query_selector('#emailSettingsSaveBtn')

    set_disable(false)
    set_disable_btn(true)

    window.email_settings_save_btn_click = save_btn_click
  end

  def save_btn_click()
    Events.emit('#app', ENVS.btn_click_0, {
      registered: {
        subject: @registered_subject.value,
        html:    @registered_template.value,
      },
      unconfirmed: {
        subject: @unconfirmed_subject.value,
        html:    @unconfirmed_template.value,
      }
    })
  end

  def set_disable(is_disabled)
    @parent.c_spinner.set_display_with_id(is_disabled, '#spinnerOne')
    @parent.c_spinner.set_display_with_id(is_disabled, '#spinnerTwo')

    set_disable_btn(is_disabled)
  end

  def set_disable_btn(is_disabled)
    Bootstrap.change_disable_element(@save_btn, is_disabled)
  end

  def set_value_inputs(templates)
    @registered_subject.value   = templates.registered.subject
    @unconfirmed_subject.value  = templates.unconfirmed.subject

    @registered_template.value  = templates.registered.html
    @unconfirmed_template.value = templates.unconfirmed.html
  end
end