export default class CInputs
  def initialize(parent)
    @parent = parent

    @google_app_code      = @parent.query_selector('#mailSettingsGoogleAppCode')
    @registered_template  = @parent.query_selector('#mailSettingsRegisteredTemplate')
    @unconfirmed_template = @parent.query_selector('#mailSettingsUnconfirmedTemplate')

    window.email_settings_save_btn_click = save_btn_click
  end

  def save_btn_click()
    
  end
end